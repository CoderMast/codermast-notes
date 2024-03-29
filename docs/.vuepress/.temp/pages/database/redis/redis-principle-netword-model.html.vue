<template><div><h1 id="redis原理-redis网络模型" tabindex="-1"><a class="header-anchor" href="#redis原理-redis网络模型" aria-hidden="true">#</a> Redis原理 - Redis网络模型</h1>
<h2 id="思考" tabindex="-1"><a class="header-anchor" href="#思考" aria-hidden="true">#</a> 思考</h2>
<p><strong>Redis 到底是单线程还是多线程？</strong></p>
<ul>
<li>如果仅仅针对 Redis 的核心业务部分（命令处理部分），则是单线程</li>
<li>如果针对 Redis 整体，那么就是多线程</li>
</ul>
<p><strong>在 Redis 的版本迭代过程中，在两个重要的时间节点上引入了多线程的支持：</strong></p>
<ul>
<li>Redis v4.0：引入多线程异步处理一些耗时较长的任务，例如异步删除命令 unlike</li>
<li>Redis v6.0：在核心网络模型中引入多线程，进一步提高对多核 CPU 的利用率</li>
</ul>
<p><strong>为什么Redis要选择单线程?</strong></p>
<ul>
<li>抛开持久化不谈，Redis是纯内存操作，执行速度非常快，它的性能瓶颈是网络延迟而不是执行速度，因此多线程并不会带来巨大的性能提升。</li>
<li>多线程会导致过多的上下文切换，带来不必要的开销</li>
<li>引入多线程会面临线程安全问题，必然要引入线程锁这样的安全手段，实现复杂度增高，而且性能也会大打折扣</li>
</ul>
<h2 id="网络模型" tabindex="-1"><a class="header-anchor" href="#网络模型" aria-hidden="true">#</a> 网络模型</h2>
<p>Redis 通过 IO 多路复用来提高网络性能，并且支持各种不同的多路复用实现，并且将这些实现进行封装，提供了统一的高性能事件库 API 库 AE：</p>
<ul>
<li>ae_epoll</li>
<li>ae_evport</li>
<li>ae_kqueue</li>
<li>ae_select（通用）</li>
</ul>
<p>这是 Redis 中四种实现方式，根据不同的操作系统，选择不同的实现。</p>
<p>具体的 API 主要有以下几个：</p>
<ul>
<li>aeApiCreate：创建多路复用程序，比如 epoll_create</li>
<li>aeApiResize</li>
<li>aeApiFree</li>
<li>aeApiAddEvent：注册 FD ，比如 epoll_ctl</li>
<li>aeApiDelEvent：删除 FD</li>
<li>aeApiPoll：等待 FD 就绪，比如 epoll_wait</li>
<li>aeApiName：select、poll</li>
</ul>
<p>ae_evport 实现方式中独有的API</p>
<ul>
<li>aeApiLookupPending</li>
<li>aeApiAssociate</li>
</ul>
<p>在ae.c 文件中可以选择使用那种实现方式。</p>
<figure><img src="@source/../assets/redis-netword-model/2023-06-20-13-53-06.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="单线程网络模型" tabindex="-1"><a class="header-anchor" href="#单线程网络模型" aria-hidden="true">#</a> 单线程网络模型</h2>
<p>Redis 6 以前的网络模型都是单线程的，Redis 单线程网络模型的整个过程：</p>
<figure><img src="@source/../assets/redis-netword-model/2023-06-22-15-47-54.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>在 aeApiPoll 时，会判断是<strong>客户端</strong>可读还是<strong>服务端</strong>可读，调用不同的处理器</li>
<li>当客户端 Client Socket 发起连接请求时，服务端 Server Socket 可读，触发连接应答处理器 tcpAccepthandler</li>
<li>当客户端 Client Socket 发起命令时，客户端可读，触发命令请求处理器 readQueryFromClient</li>
<li>当客户端可写时，会由命令回复处理器进行处理。</li>
</ul>
<div class="hint-container warning">
<p class="hint-container-title">核心</p>
<p>本质上就是 <strong>IO 多路复用 + 事件派发</strong> 的应用。</p>
<p>server socket 不断接收 client socket 的响应，然后根据事件类型的不同，派发给对应的处理器进行处理。</p>
</div>
<h2 id="多线程网络模型" tabindex="-1"><a class="header-anchor" href="#多线程网络模型" aria-hidden="true">#</a> 多线程网络模型</h2>
<p>Redis 6.0 版本中引入了多线程，目的是为了提高 IO 读写效率。因此在 <strong>解析客户端命令</strong>、 <strong>写响应结果</strong> 时采用了多线程。核心的命令执行、IO 多路复用模块依然是由主线程执行。</p>
<p>通过对单线程网络模型的分析，主要的性能瓶颈在命令的读写处理和命令的响应输出两个方面。</p>
<figure><img src="@source/../assets/redis-netword-model/2023-06-22-16-00-10.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>故Redis 在命令读处理和命令的响应两个部分引入了多线程。</p>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>性能的瓶颈一般情况下都是 IO 的影响或者 网络请求 的影响。</p>
</div>
<h2 id="底层实现" tabindex="-1"><a class="header-anchor" href="#底层实现" aria-hidden="true">#</a> 底层实现</h2>
<ul>
<li>main</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">// server.c</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span>
    <span class="token keyword">int</span> argc<span class="token punctuation">,</span>
    <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv
<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token comment">// 初始化服务</span>
    <span class="token function">initServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
    <span class="token comment">// 开始监听事件循环</span>
    <span class="token function">aeMain</span><span class="token punctuation">(</span>server<span class="token punctuation">.</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>initServer</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">initServer</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token comment">// 内部会调用 aeApiCreate(eventLoop)，类似epoll_create</span>
    server<span class="token punctuation">.</span>el<span class="token operator">=</span> <span class="token function">aeCreateEventLoop</span><span class="token punctuation">(</span>server<span class="token punctuation">.</span>maxclients<span class="token operator">+</span>CONFIG_FDSET_INCR<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//...</span>

    <span class="token comment">// 监听TCP端口，创建ServerSocket，并得到FD</span>
    <span class="token function">listenToPort</span><span class="token punctuation">(</span>server<span class="token punctuation">.</span>port<span class="token punctuation">,</span><span class="token operator">&amp;</span>server<span class="token punctuation">.</span>ipfd<span class="token punctuation">)</span>
    <span class="token comment">// ...</span>

    <span class="token comment">// 注册 连接处理器，内部会调用 aeApiAddEvent(&amp;server.ipfd)监听FD</span>
    <span class="token function">createSocketAcceptHandler</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>server<span class="token punctuation">.</span>ipfd，acceptTcpHandler<span class="token punctuation">)</span>

    <span class="token comment">// 注册 ae_api_poll 前的处理器</span>
    <span class="token function">aeSetBeforeSleepProc</span><span class="token punctuation">(</span>server<span class="token punctuation">.</span>el<span class="token punctuation">,</span>beforeSleep<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>aeMain</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">aeMain</span><span class="token punctuation">(</span>aeEventloop<span class="token operator">*</span>eventloop<span class="token punctuation">)</span><span class="token punctuation">{</span>
    eventLoop<span class="token operator">-></span>stop <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token comment">// 循环监听事件</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>eventLoop<span class="token operator">-></span>stop<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">aeProcessEvents</span><span class="token punctuation">(</span>
            eventLoop，
            AE_ALL_EVENTS <span class="token operator">|</span> 
            AE_CALL_BEFORE_SLEEP <span class="token operator">|</span>
            AE_CALL_AFTER_SLEEP<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>aeProcessEvents</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">aeProcessEvents</span><span class="token punctuation">(</span>aeEventLoop <span class="token operator">*</span>eventLoop<span class="token punctuation">,</span><span class="token keyword">int</span> flags<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// ... 调用前置处理器 beforesleep</span>
    eventLoop<span class="token operator">-></span><span class="token function">beforesleep</span><span class="token punctuation">(</span>eventLoop<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 等待FD就绪，类似 epoll_wait</span>
    numevents <span class="token operator">=</span> <span class="token function">aeApiPoll</span><span class="token punctuation">(</span>eventLoop，tvp<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span>j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> numevents<span class="token punctuation">;</span> j <span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 遍历处理就绪的 FD，调用对应的处理器</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>acceptTcpHandler</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">acceptTcpHandler</span><span class="token punctuation">(</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token comment">// 接收 socket 连接，获取 FD </span>
    fd <span class="token operator">=</span> <span class="token function">accept</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span>sa<span class="token punctuation">,</span>len<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// ... </span>
    <span class="token comment">// 创建 connection ，关联 fd</span>
    connection <span class="token operator">*</span>conn <span class="token operator">=</span> <span class="token function">connCreateSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    conn<span class="token punctuation">.</span>fd <span class="token operator">=</span> fd<span class="token punctuation">;</span>

    <span class="token comment">// ...</span>
    <span class="token comment">// 内部调用 aeApiAddEvent(fd,READABLE)</span>
    <span class="token comment">// 监听 socket 的FD读事件，并绑定读处理器readQueryFromClient</span>
    <span class="token function">connSetReadHandler</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> readQueryFromClient<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>readQueryFromClient</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">readQueryFromClient</span><span class="token punctuation">(</span>connection <span class="token operator">*</span>conn<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 获取当前客户端，客户端中有缓冲区用来读和写</span>
    client <span class="token operator">*</span>c <span class="token operator">=</span> <span class="token function">connGetPrivateData</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 获取c->querybuf缓冲区大小</span>
    <span class="token keyword">long</span> <span class="token keyword">int</span> qblen <span class="token operator">=</span> <span class="token function">sdslen</span><span class="token punctuation">(</span>c<span class="token operator">-></span>querybuf<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 读取请求数据到 c->querybuf 缓冲区</span>
    <span class="token function">connRead</span><span class="token punctuation">(</span>c<span class="token operator">-></span>conn，c<span class="token operator">-></span>Guerybuf<span class="token operator">+</span>qblen，readlen<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 解析缓冲区字符串，转为Redis命令参数存入 c->argv 数组</span>
    <span class="token function">processInputBuffer</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
    <span class="token comment">// 处理 c->argv 中的命令</span>
    <span class="token function">processCommand</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>processCommand</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">processCommand</span><span class="token punctuation">(</span>client <span class="token operator">*</span>c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 根据命令名称，寻找命令对应的command，例如 setCommand</span>
    c<span class="token operator">-></span>cmd <span class="token operator">=</span> c<span class="token operator">-></span>lastcmd <span class="token operator">=</span> <span class="token function">lookupCommand</span><span class="token punctuation">(</span>c<span class="token operator">-></span>argv<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">-></span>ptr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
    <span class="token comment">// 执行command，得到响应结果，例如ping命令，对应pingCommand</span>
    c<span class="token operator">-></span>cmd<span class="token operator">-></span><span class="token function">proc</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 把执行结果写出，例如ping命令，就返回"pong"给cLient</span>
    <span class="token comment">// shared.pong是 字符串"pong"的SDS对象</span>
    <span class="token function">addReply</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> shared<span class="token punctuation">.</span>pong<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>addReply</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">addReply</span><span class="token punctuation">(</span>client <span class="token operator">*</span>c，robj <span class="token operator">*</span>obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 尝试把结果写到 c-buf 客户端写缓存区</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">_addReplyToBuffer</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span>obj<span class="token operator">-></span>ptr<span class="token punctuation">,</span><span class="token function">sdslen</span><span class="token punctuation">(</span>obj<span class="token operator">-></span>ptr<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> C_OK<span class="token punctuation">)</span>
    <span class="token comment">// 如果c->buf写不下，则写到 c->reply，这是一个链表，容量无上限</span>
    <span class="token function">_addReplyProtoToList</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span>obj<span class="token operator">-></span>ptr<span class="token punctuation">,</span><span class="token function">sdslen</span><span class="token punctuation">(</span>obj<span class="token operator">-></span>ptr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 将客户端添加到server.clients_pending_write这个队列，等待被写出</span>
    <span class="token function">listAddNodeHead</span><span class="token punctuation">(</span>server<span class="token punctuation">.</span>clients_pending_ write<span class="token punctuation">,</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>



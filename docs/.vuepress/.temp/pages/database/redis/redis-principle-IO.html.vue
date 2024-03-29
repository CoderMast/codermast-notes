<template><div><h1 id="redis原理-io详解" tabindex="-1"><a class="header-anchor" href="#redis原理-io详解" aria-hidden="true">#</a> Redis原理 - IO详解</h1>
<h2 id="用户空间与内核空间" tabindex="-1"><a class="header-anchor" href="#用户空间与内核空间" aria-hidden="true">#</a> 用户空间与内核空间</h2>
<p>任何Linux 系统的发行版，其系统内核都是 Linux 。我们的应用都需要通过 Linux 内核与硬件交互。</p>
<figure><img src="@source/../assets/redis-netword-model/2023-06-19-16-10-46.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>为了避免用户应用导致冲突甚至内核崩溃，用户应用与内核是分离的：</p>
<ul>
<li>内存的寻址空间划分为两部分：内核空间、用户空间</li>
</ul>
<blockquote>
<p>32 位的操作系统，寻址地址就为 0 ~ <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mn>32</mn></msup></mrow><annotation encoding="application/x-tex">2 ^ {32}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">32</span></span></span></span></span></span></span></span></span></span></span></span></p>
</blockquote>
<ul>
<li>用户空间内只能执行受限的指令（Ring3），而且不能直接调用系统资源，必须通过内核提供的接口访问</li>
<li>内核空间可以执行特权命令（Ring0），调用一切系统资源</li>
</ul>
<p>当进程运行在用户空间时称为用户态，运行在内核空间时称为内核态。</p>
<p>Linux 系统为了提高 IO 效率，会在用户空间和内核空间都加入缓冲区：</p>
<ul>
<li>写数据时，要把用户缓冲数据拷贝到内核缓冲区，然后写入设备</li>
<li>读数据是，要从设备读取数据到内核缓冲区，然后拷贝到用户缓冲区</li>
</ul>
<figure><img src="@source/../assets/redis-netword-model/2023-06-19-16-23-07.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="hint-container tip">
<p class="hint-container-title">5种IO模型</p>
<ol>
<li>阻塞 IO（Blocking IO）</li>
<li>非阻塞 IO（Nonblocking IO）</li>
<li>IO 多路复用（IO Multiplexing）</li>
<li>信号驱动 IO（Signal Driven IO）</li>
<li>异步 IO（Asynchronous IO）</li>
</ol>
</div>
<h2 id="阻塞io" tabindex="-1"><a class="header-anchor" href="#阻塞io" aria-hidden="true">#</a> 阻塞IO</h2>
<p>顾名思义，阻塞 IO 就是在<strong>等待数据</strong>和<strong>拷贝数据到用户空间</strong>两个阶段过程中都必须阻塞等待。</p>
<figure><img src="@source/../assets/redis-netword-model/2023-06-19-16-35-31.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol>
<li>用户线程发出 IO 请求</li>
<li>内核会去查看数据是否准备就绪，如果没有准备就绪那么就会一直等待，而用户线程就会处于阻塞状态，用户线程处于阻塞状态</li>
<li>当数据准备就绪以后，内核会将数据拷贝到用户线程，并返回结果给用户线程，用户线程才解除阻塞状态</li>
</ol>
<p>可以看到，阻塞IO模型中，用户进程在两个阶段都是阻塞状态。</p>
<h2 id="非阻塞io" tabindex="-1"><a class="header-anchor" href="#非阻塞io" aria-hidden="true">#</a> 非阻塞IO</h2>
<p>非阻塞 IO 的 recvfrom 操作会立即返回结果，而不是阻塞用户进程。</p>
<figure><img src="@source/../assets/redis-netword-model/2023-06-19-17-35-53.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol>
<li>等待数据阶段，如果数据没有就绪，则立刻返回 EWOULDBLOCK。这个过程用户进程是非阻塞的，但是用户进程会一直发起请求，忙轮训，直到内核处理才开始停止轮训。</li>
<li>数据就绪以后，再将数据从内核中拷贝至用户空间。这个阶段用户进程是阻塞的。</li>
</ol>
<p>可以看到，非阻塞 IO 模型中，用户进程在第一个阶段是非阻塞的，在第二个阶段是阻塞的。虽然是非阻塞的，但是性能并没有得到提高，而且忙等机制会导致 CPU 空转，CPU 使用率暴增。</p>
<h2 id="io多路复用" tabindex="-1"><a class="header-anchor" href="#io多路复用" aria-hidden="true">#</a> IO多路复用</h2>
<p>无论是阻塞 IO 还是非阻塞 IO，用户应用在一阶段都是需要调用 recvfrom 来获取数据，差别在于无数据时的处理方式：</p>
<ul>
<li>如果调用 recvfrom 时，恰好没有数据，阻塞 IO 会使进程阻塞，非阻塞 IO 会使CPU空转，均无法发挥 CPU 的作用。</li>
<li>如果调用 recvfrom 时，恰好有数据，则用户进程可以直接进入第二阶段，读取并处理数据</li>
</ul>
<p>比如服务端处理客户端Socket 请求时，在单线程情况下，只能依次处理每一个 Socket，如果正在处理 socket 恰好未就绪（数据不可读或者不可写），线程就会被阻塞，所有其它客户端 socket 都必须等待，性能自然很差。</p>
<p>文件描述符（File Descriptor）：简称FD，是一个从 0 开始递增的无符号整数，用来关联 Linux 中的一个文件。在 Linux 中一切皆文件，例如常规文件、视频、硬件设备等，当然也包括网络套接字（Socket）</p>
<p>IO多路复用：是利用单个线程来同时监听多个 FD ，并在某个 FD 可读、可写时得到通知，从而避免无效的等待，充分利用 CPU 资源。</p>
<figure><img src="@source/../assets/redis-netword-model/2023-06-19-17-58-33.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>实现 IO 多路复用的技术有三种方式：</p>
<ul>
<li>select</li>
<li>poll</li>
<li>epoll</li>
</ul>
<p><strong>差异：</strong></p>
<ul>
<li>select 和 poll 只会通知用户进程有FD就绪，但是不确定是那个 FD，需要用户进程逐个遍历 FD 来确认</li>
<li>epoll 会通知用户进程 FD 就绪的同时，把已就绪的 FD 写入用户空间，直接能定位到就绪的 FD</li>
</ul>
<h3 id="select" tabindex="-1"><a class="header-anchor" href="#select" aria-hidden="true">#</a> SELECT</h3>
<p>select 是 Linux 中最早的 I/O 多路复用的实现方案：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">// 定义类型别名 __fd_mask，本质是 long int</span>
<span class="token keyword">typedef</span> <span class="token keyword">long</span> <span class="token keyword">int</span> __fd_mask<span class="token punctuation">;</span>

<span class="token comment">/* fd_set 记录要监听的fd集合，及其对应状态 */</span>
<span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    <span class="token comment">// fds_bits是long类型数组，长度为 1024/32 = 32</span>
    <span class="token comment">// 共1024个bit位，每个bit位代表一个fd，0代表未就绪，1代表就绪</span>
    __fd_mask fds_bits<span class="token punctuation">[</span>__FD_SETSIZE <span class="token operator">/</span> __NFDBITS<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span> fd_set<span class="token punctuation">;</span>


<span class="token comment">// select函数，用于监听多个fd的集合</span>
<span class="token keyword">int</span> <span class="token function">select</span><span class="token punctuation">(</span>
    <span class="token keyword">int</span> nfds<span class="token punctuation">,</span><span class="token comment">// 要监视的fd_set的最大fd + 1</span>
    fd_set <span class="token operator">*</span>readfds<span class="token punctuation">,</span><span class="token comment">// 要监听读事件的fd集合</span>
    fd_set <span class="token operator">*</span>writefds<span class="token punctuation">,</span><span class="token comment">// 要监听写事件的fd集合</span>
    fd_set <span class="token operator">*</span>exceptfds<span class="token punctuation">,</span>  <span class="token comment">// 要监听异常事件的fd集合</span>
    <span class="token comment">// 超时时间，nulT-永不超时;0-不阻塞等待;大于0-固定等待时间</span>
    <span class="token keyword">struct</span> <span class="token class-name">timeval</span> <span class="token operator">*</span>timeout
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="@source/../assets/redis-netword-model/2023-06-19-23-08-33.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>具体流程如下：</p>
<ol>
<li>用户空间中创建 fd_set rfds</li>
<li>假如要监听 fd = 1，2，5</li>
<li>用户空间中执行 selec(5 + 1, rfds, null, null, 3)</li>
<li>将用户空间中创建的 fd_set rfds 数组拷贝到内核空间中</li>
<li>内核空间中遍历拷贝后的 fd_set rfds 数组</li>
<li>如果没有就绪，则将该位置的 fd 设置为0。</li>
</ol>
<p><strong>select模式存在的问题：</strong></p>
<ul>
<li>需要将整个fd_set从用户空间拷贝到内核空间，select结束还要再次拷贝回用户空间</li>
<li>select无法得知具体是哪个fd就绪，需要遍历fd_set</li>
<li>fd_set监听的fd数量不能超过1024、</li>
</ul>
<h3 id="poll" tabindex="-1"><a class="header-anchor" href="#poll" aria-hidden="true">#</a> POLL</h3>
<p>poll 模式对 select 模式做了简单改进，但是性能提升并不明显，部分关键代码如下：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">// pollfd 中的事件类型</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">POLLIN</span>      <span class="token comment">//可读事件</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">POLLOUT</span>     <span class="token comment">//可写事件</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">POLLERR</span>     <span class="token comment">//错误事件</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">POLLNVAL</span>    <span class="token comment">//fd未打开</span></span>

<span class="token comment">// pollfd结构</span>
<span class="token keyword">struct</span> <span class="token class-name">pollfd</span><span class="token punctuation">{</span>
    <span class="token keyword">int</span> fd<span class="token punctuation">;</span>             <span class="token comment">// 要监听的 fd</span>
    <span class="token operator">*</span><span class="token keyword">short</span> <span class="token keyword">int</span> events<span class="token punctuation">;</span>  <span class="token comment">// 要监听的事件类型:读、写、异常</span>
    <span class="token keyword">short</span> <span class="token keyword">int</span> revents<span class="token punctuation">;</span>  <span class="token comment">// 实际发生的事件类型</span>
<span class="token punctuation">}</span>

<span class="token comment">// poll函数</span>
<span class="token keyword">int</span> <span class="token function">poll</span><span class="token punctuation">(</span>
    <span class="token keyword">struct</span> <span class="token class-name">pollfd</span> xfds<span class="token punctuation">,</span> <span class="token comment">// pollfd数组，可以自定义大小</span>
    <span class="token class-name">nfds_t</span> nfds<span class="token punctuation">,</span>        <span class="token comment">// 数组元素个数</span>
    <span class="token keyword">int</span> timeout         <span class="token comment">// 超时时间</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>IO 流程：</strong></p>
<ol>
<li>创建 pollfd 数组，向其中添加关注的fd 信息，数组大小自定义</li>
<li>调用 poll 函数，将 pollfd 数组拷贝到内核空间，转链表存储，无上限</li>
<li>内核遍历 fd ，判断是否就绪</li>
<li>数据就绪或超时后，拷贝 pollfd 数组到用户空间，返回就绪 fd 数量 n</li>
<li>用户进程判断 n 是否大于 0</li>
<li>大于 0 则遍历 pollfd 数组，找到就绪的 fd</li>
</ol>
<p><strong>与 SELECT 比较：</strong></p>
<ul>
<li>select 模式中的 fd_set 大小固定值为 1024 ，而 pollfd 在内核中采用链表，理论上是无限的</li>
<li>监听的 FD 越多，每次遍历消耗的时间也越久，性能反而会下降</li>
</ul>
<h3 id="epoll" tabindex="-1"><a class="header-anchor" href="#epoll" aria-hidden="true">#</a> EPOLL</h3>
<p>epoll 模式是对 select 和 poll 模式的改进， 提供了三个函数：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">eventpoll</span><span class="token punctuation">{</span>
    <span class="token comment">//...</span>
    <span class="token keyword">struct</span> <span class="token class-name">rb_root</span> rbr<span class="token punctuation">;</span> <span class="token comment">// 一颗红黑树，记录要监听的fd</span>
    <span class="token keyword">struct</span> <span class="token class-name">list_head</span> rdlist<span class="token punctuation">;</span>  <span class="token comment">// 一个链表，记录就绪的 FD</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>

<span class="token comment">// 1.会在内核创建eventpolL结构体，返回对应的句柄epfd</span>
<span class="token keyword">int</span> epoll <span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">int</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 2.将一个FD添加到epol的红黑树中，并设置ep_poli_calLback</span>
<span class="token comment">// calTback触发时，就把对应的FD加入到rdlist这个就绪列表中</span>
<span class="token keyword">int</span> epoll <span class="token function">_ctl</span><span class="token punctuation">(</span>
    <span class="token keyword">int</span> epfd<span class="token punctuation">,</span>   <span class="token comment">// epoll实例的句柄</span>
    <span class="token keyword">int</span> op<span class="token punctuation">,</span>     <span class="token comment">// 要执行的操作，包括：ADD、MOD、DEL</span>
    <span class="token keyword">int</span> fd<span class="token punctuation">,</span>     <span class="token comment">// 要监听的 FD</span>
    <span class="token keyword">struct</span> <span class="token class-name">epoll_event</span> <span class="token operator">*</span>event <span class="token comment">// 要监听的事件类型: 读、写、异常等</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 3.检查rdlist列表是否为空，不为空则返回就绪的FD的数量</span>
<span class="token keyword">int</span> epoll <span class="token function">wait</span><span class="token punctuation">(</span>
    <span class="token keyword">int</span> epfd<span class="token punctuation">,</span>       <span class="token comment">// eventpoll 实例的句柄</span>
    <span class="token keyword">struct</span> <span class="token class-name">epoll_event</span> <span class="token operator">*</span>events<span class="token punctuation">,</span> <span class="token comment">// 空event 数组，用于接收就绪的 FD</span>
    <span class="token keyword">int</span> maxevents<span class="token punctuation">,</span>  <span class="token comment">// events 数组的最大长度</span>
    <span class="token keyword">int</span> timeout <span class="token comment">// 超时时间，-1永不超时;0不阻塞;大于0为阻塞时间</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="@source/../assets/redis-netword-model/2023-06-20-11-17-41.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="事件通知机制" tabindex="-1"><a class="header-anchor" href="#事件通知机制" aria-hidden="true">#</a> 事件通知机制</h3>
<p>当 FD 有数据可读时，我们调用 epoll_wait 就可以得到通知，但是时间通知的模式有两种：</p>
<ul>
<li>LevelTriggered：简称 LT。当 FD 有数据可读时，会重复通知多次，直至数据处理完成。是 epoll 的默认模式。</li>
<li>EdgeTriggered：简称 ET。当 FD 有数据可读时，只会通知一次，不管数据是否被处理完成</li>
</ul>
<div class="hint-container info">
<p class="hint-container-title">举个例子</p>
<ol>
<li>假设一个客户端 Socket 对应的 FD 已经注册到了 epoll 实例中</li>
<li>客户端 Socket 发送了 2kb 的数据</li>
<li>服务端调用 epoll_wait ，得到通知说 FD 就绪</li>
<li>服务端从 FD 读取了 1kb 的数据</li>
<li>回到步骤三（再次调用 epoll_wait ，形成循环）</li>
</ol>
</div>
<p>结论</p>
<ul>
<li>ET 模式避免了 LT 模式可能出现的惊群现象</li>
<li>ET 模式最好结合非阻塞 IO 读取 FD 数据，相比 LT 会复杂一些</li>
</ul>
<h3 id="web服务流程" tabindex="-1"><a class="header-anchor" href="#web服务流程" aria-hidden="true">#</a> WEB服务流程</h3>
<p>基于 epoll 模式的 web 服务的基本流程图：</p>
<figure><img src="@source/../assets/redis-netword-model/2023-06-20-13-53-06.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p><strong>select 模式的存在的三个问题：</strong></p>
<ul>
<li>能监听的 FD 最大不超过 1024 个</li>
<li>每次 select 都需要把所有要监听的 FD 都拷贝到内核空间</li>
<li>每次都要遍历所有 FD 来判断就绪状态</li>
</ul>
<p><strong>poll 模式的问题：</strong></p>
<ul>
<li>poll 利用链表解决了 select 中监听 FD 上限的问题，但是依然要遍历所有的 FD ，如果监听较多，性能会下降</li>
</ul>
<p><strong>epoll 模式中如何解决这些问题:</strong></p>
<ul>
<li>基于 epoll 实例中的红黑树保存要监听的 FD ，理论上无上限，而且增删改查效率都非常高，性能不会随监听的 FD 数量增多而产生显著的下降</li>
<li>每个 FD 只需要执行一次 epoll_ctl 添加到红黑树，以后每次 epoll_wait 无需传递任何参数，无需重复拷贝 FD 到内核空间</li>
<li>内核会将就绪的 FD 直接拷贝到用户空间的指定位置，用户进程无需遍历所有 FD 就能知道就绪的 FD 是谁</li>
</ul>
<h2 id="信号驱动io" tabindex="-1"><a class="header-anchor" href="#信号驱动io" aria-hidden="true">#</a> 信号驱动IO</h2>
<p>信号驱动 IO 是与内核建立 SIGIO 的信号关联并设置回调，当内核有 FD 就绪时，会发出 SIGIO 信号通知用户，期间用户应用可以执行其他业务，无需阻塞等待。</p>
<figure><img src="@source/../assets/redis-netword-model/2023-06-20-13-59-29.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>当有大量 IO 操作时，信号较多，SIGIO 处理函数不能及时处理可能导致信号队列溢出。</p>
<p>而且内核空间与用户空间的频繁信号交互性能也较低。</p>
<h2 id="异步io" tabindex="-1"><a class="header-anchor" href="#异步io" aria-hidden="true">#</a> 异步IO</h2>
<p>异步 IO 的整个过程都是非阻塞的，用户进程调用完异步 API 后就可以去做其他事情，内核等待数据就绪并拷贝到用户空间后才会递交信号，通知用户进程。</p>
<figure><img src="@source/../assets/redis-netword-model/2023-06-20-14-02-25.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>在异步 IO 模型中，用户进程在两个阶段都是非阻塞的状态。</p>
<p>异步 IO 模型虽然很简单，但是在高并发的访问下，内核中会处理大量请求，容易导致内核崩溃。</p>
<h2 id="同步和异步" tabindex="-1"><a class="header-anchor" href="#同步和异步" aria-hidden="true">#</a> 同步和异步</h2>
<p>IO 操作是同步还是异步，关键看数据在内核空间与用户空间的拷贝过程（数据读写的IO操作），也就是阶段二是同步还是异步：</p>
<figure><img src="@source/../assets/redis-netword-model/2023-06-20-14-08-37.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</div></template>



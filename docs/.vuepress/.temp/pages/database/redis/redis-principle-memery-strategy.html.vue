<template><div><h1 id="redis原理-内存策略" tabindex="-1"><a class="header-anchor" href="#redis原理-内存策略" aria-hidden="true">#</a> Redis原理 - 内存策略</h1>
<p>Redis 本身是一个典型的 key-value 内存存储数据库，因此所有的 key、value 都保存在之前学习过的 Dict 结构中。不过在其 database 结构体中，有两个 Dict ：一个用来记录 key-value；另外一个用来记录 key-TTL</p>
<figure><img src="@source/../assets/redis-memery-strategy/2023-06-22-17-58-07.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">redisDb</span> <span class="token punctuation">{</span>
    dict <span class="token operator">*</span>dict<span class="token punctuation">;</span>     <span class="token comment">// 存放所有 key 和 value 的地方</span>
    dict <span class="token operator">*</span>expires<span class="token punctuation">;</span>  <span class="token comment">// 存放每一个 key 及其对应的 TTL 存活时间，只包含设置了 TTL 的 key</span>
    dict <span class="token operator">*</span>blocking_keys<span class="token punctuation">;</span>   
    dict <span class="token operator">*</span>ready_keys<span class="token punctuation">;</span>
    dict <span class="token operator">*</span>watched_keys<span class="token punctuation">;</span>
    <span class="token keyword">int</span> id<span class="token punctuation">;</span>         <span class="token comment">// Database ID ：0 ~ 15</span>
    <span class="token keyword">long</span> <span class="token keyword">long</span> avg_ttl<span class="token punctuation">;</span>  
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> expires_cursor<span class="token punctuation">;</span>   <span class="token comment">// expire 检查时在 dict 中抽样的索引位置</span>
    list <span class="token operator">*</span>defrag_later<span class="token punctuation">;</span> <span class="token comment">// 等待碎片整理的 key 列表</span>
<span class="token punctuation">}</span> redisDb<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Redis 是如何知道一个 key 是否过期呢？</strong></p>
<p>答：利用两个 Dict 分别记录 key-value 和 key-ttl</p>
<p><strong>是不是 TTL 到期就立刻删除呢？</strong></p>
<p>答：并不是到期立刻删除，而是采用 <em><strong>惰性删除</strong></em> 和 <em><strong>周期删除</strong></em>。</p>
<h2 id="删除策略" tabindex="-1"><a class="header-anchor" href="#删除策略" aria-hidden="true">#</a> 删除策略</h2>
<ul>
<li>
<p>定时删除：TTL 到期后，立刻删除对应的 key</p>
</li>
<li>
<p>惰性删除：并不是在 TTL 到期后就立刻删除，而是在访问一个 key 的时候，检查该 key 的存活时间，如果已经过期，才执行删除。</p>
</li>
<li>
<p>周期删除：是通过一个定时任务，周期性的抽样部分过期的 key，然后执行删除。执行周期有两种：</p>
<ul>
<li>Redis 会设置一个定时任务 serverCron()，按照 server.hz 的频率来执行过期 key 清理，模式为 SLOW，默认为 10</li>
<li>Redis 的每个事情循环前会调用beforeSleep()函数，执行过期key清理，模式为FAST</li>
</ul>
</li>
</ul>
<p><strong>SLOW模式规则:</strong></p>
<ol>
<li>
<p>执行频率受server.hz影响，默认为10，即每秒执行10次，每个执行周期100ms。</p>
</li>
<li>
<p>执行清理耗时不超过一次执行周期的25%.</p>
</li>
<li>
<p>逐个遍历db，逐个遍历db中的bucket，抽取20个key判断是否过期</p>
</li>
<li>
<p>如果没达到时间上限 (25ms)并且过期key比例大于10%，再进行一次抽样，否则结束</p>
</li>
</ol>
<p><strong>FAST模式规则 (过期key比例小于10%不执行)</strong></p>
<ol>
<li>执行频率受beforeSleep()调用频率影响，但两次FAST模式间隔不低于2ms</li>
<li>执行清理耗时不超过1ms</li>
<li>逐个遍历db，逐个遍历db中的bucket，抽取20个key判断是否过期</li>
<li>如果没达到时间上限 (1ms)并且过期key比例大于10%，再进行一次抽样，否则结束</li>
</ol>
<h2 id="淘汰策略" tabindex="-1"><a class="header-anchor" href="#淘汰策略" aria-hidden="true">#</a> 淘汰策略</h2>
<p>内存淘汰就是当 Redis 内存使用达到设置的阈值时，Redis 主动挑选部分 key 删除以释放更多的内存的流程。Redis 会在处理客户端命令的方法 processCommand() 中尝试做内存淘汰。</p>
<p>Redis 一共支持 8 种淘汰策略</p>
<ul>
<li>
<p>noeviction：当内存使用超过配置的时候会返回错误，不会驱逐任何键。</p>
</li>
<li>
<p>allkeys-lru：加入键的时候，如果过限，首先通过LRU算法驱逐最久没有使用的键。</p>
</li>
<li>
<p>volatile-lru：加入键的时候如果过限，首先从设置了过期时间的键集合中驱逐最久没有使用的键。</p>
</li>
<li>
<p>allkeys-random：加入键的时候如果过限，从所有key随机删除。</p>
</li>
<li>
<p>volatile-random：加入键的时候如果过限，从过期键的集合中随机驱逐。</p>
</li>
<li>
<p>volatile-ttl：从配置了过期时间的键中驱逐马上就要过期的键。</p>
</li>
<li>
<p>volatile-lfu：从所有配置了过期时间的键中驱逐使用频率最少的键。</p>
</li>
<li>
<p>allkeys-lfu：从所有键中驱逐使用频率最少的键。</p>
</li>
</ul>
<p>LRU(Least Recently Used)：最少最近使用，用当前时间减去最后一次访问时间，这个值越大则淘汰优先级越高。</p>
<p>LFU(Least Frequently Used)：最少频率使用，会统计每个 key 的访问频率，值越小淘汰优先级越高。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">redisObject</span><span class="token punctuation">(</span>

    <span class="token keyword">unsigned</span> type<span class="token operator">:</span><span class="token number">4</span><span class="token punctuation">;</span><span class="token comment">//对象类型</span>
    <span class="token keyword">unsigned</span> encoding<span class="token operator">:</span><span class="token number">4</span><span class="token punctuation">;</span><span class="token comment">// 编码方式</span>
    <span class="token keyword">unsigned</span> lru<span class="token operator">:</span>LRU_BITS<span class="token punctuation">;</span>
    <span class="token comment">//LRU: 以秒为单位记录最近一次访问时间，长度24bit</span>
    <span class="token comment">//LFU: 高16位以分钟为单位记录最近一次访问时间，低8位记录逻辑访问次数</span>
    <span class="token keyword">int</span> refcount<span class="token punctuation">;</span>   <span class="token comment">// 引用计数，计数为0则可以回收</span>
    <span class="token keyword">void</span> <span class="token operator">*</span>ptr<span class="token punctuation">;</span>      <span class="token comment">// 数据指针，指向真实数据</span>
<span class="token punctuation">)</span> robj<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>LRU 的访问次数之所以叫做逻辑访问次数，是因为并不是每次 key 被访问都计数，而是通过运算：</p>
<ol>
<li>生成 0 ~ 1 之间的随机数 R</li>
<li>计算 1 / (旧次数 * lfu_log_factor + 1)，记录为 R，lfu_log_factor 默认为 10</li>
<li>如果 R &lt; P，则计数器 + 1，且最大不超过 255</li>
<li>访问次数会随时间缩减，距离上一次访问时间每隔 lfu_decay_time 分钟（默认 1），计数器 -1</li>
</ol>
<figure><img src="@source/../assets/redis-memery-strategy/2023-06-22-18-41-05.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</div></template>



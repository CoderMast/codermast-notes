<template><div><h1 id="redis进阶-缓存问题" tabindex="-1"><a class="header-anchor" href="#redis进阶-缓存问题" aria-hidden="true">#</a> Redis进阶 - 缓存问题</h1>
<h2 id="缓存" tabindex="-1"><a class="header-anchor" href="#缓存" aria-hidden="true">#</a> 缓存</h2>
<p>缓存就是数据交换的缓冲区（Cache），是存储数据的临时地方，一般读写性能比较高。</p>
<ul>
<li>例如</li>
</ul>
<ol>
<li>内存是硬盘的缓存</li>
<li>cache 是内存的缓存</li>
</ol>
<ul>
<li>作用</li>
</ul>
<ol>
<li>降低后端负载</li>
<li>提高读写效率，降低响应时间</li>
</ol>
<ul>
<li>成本</li>
</ul>
<ol>
<li>数据一致性成本</li>
<li>代码维护成本</li>
</ol>
<h2 id="缓存穿透" tabindex="-1"><a class="header-anchor" href="#缓存穿透" aria-hidden="true">#</a> 缓存穿透</h2>
<p>缓存穿透是指客户端请求的数据在缓存中和数据库中都不存在，这样缓存永远不会生效，这些请求都会打到数据库。如请求不存在的数据，则 Redis 缓存中不存在，数据库中也不存在，频繁请求，造成资源的浪费。</p>
<p><strong>解决方案</strong></p>
<ul>
<li>缓存空对象
<ul>
<li>优点：实现简单，维护方便</li>
<li>缺点：1. 额外的内存消耗。 2. 可能造成短期的不一致</li>
</ul>
</li>
<li>布隆过滤
<ul>
<li>优点：内存占用小，没有多余的key</li>
<li>缺点：1. 实现复杂 2. 存在误判可能</li>
</ul>
</li>
<li>增强ID的复杂度，避免被猜测ID规律</li>
<li>做好数据的基础格式校验</li>
</ul>
<h2 id="缓存雪崩" tabindex="-1"><a class="header-anchor" href="#缓存雪崩" aria-hidden="true">#</a> 缓存雪崩</h2>
<p>缓存雪崩是指在同一时间段内，大量的缓存 Key 同时失效或者 Redis 服务宕机，导致瞬间大量请求到达数据库，带来巨大压力。</p>
<p><strong>解决方案</strong></p>
<ul>
<li>给不同的 Key 的TTL添加随机值</li>
<li>利用 Redis 集群提高服务的可用性</li>
<li>给缓存业务添加降级限流操作</li>
<li>给业务添加多级缓存</li>
</ul>
<h2 id="缓存击穿" tabindex="-1"><a class="header-anchor" href="#缓存击穿" aria-hidden="true">#</a> 缓存击穿</h2>
<p>缓存击穿问题也叫热点 key 问题，就是一个被高并发访问并且缓存重建业务较复杂的 key 突然失效，无数的请求访问会在瞬间给数据库带来巨大的冲击。和缓存雪崩不同的是，缓存击穿指并发查同一条数据，缓存雪崩是不同数据都过期了，很多数据都查不到从而查数据库，导致请求数据库的总量比较大。</p>
<p><strong>解决方案</strong></p>
<ul>
<li>互斥锁
<ol>
<li>查询缓存，未命中</li>
<li>获取锁，再更新缓存</li>
<li>更新完以后，释放锁</li>
</ol>
</li>
<li>逻辑过期</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:center">解决方案</th>
<th style="text-align:center">优点</th>
<th style="text-align:center">缺点</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">互斥锁</td>
<td style="text-align:center">1. 没有额外的内存消耗<br> 2. 保证一致性<br> 3. 实现简单</td>
<td style="text-align:center">1. 线程需要等待，性能受影响<br> 2. 可能有死锁风险</td>
</tr>
<tr>
<td style="text-align:center">逻辑过期</td>
<td style="text-align:center">线程无需等待，性能较好</td>
<td style="text-align:center">1. 不保证一致性 <br> 2. 有额外内存消耗<br> 3. 实现复杂</td>
</tr>
</tbody>
</table>
<h2 id="缓存污染" tabindex="-1"><a class="header-anchor" href="#缓存污染" aria-hidden="true">#</a> 缓存污染</h2>
<p>缓存污染问题指的是缓存中一些只会被访问一次或者几次的数据，被访问完以后，再也不会被访问到，但这部分数据依然留在缓存中，占用缓存空间。</p>
<p>缓存污染会随着数据的持续增加而逐渐显露，随着服务的不断运行，缓存中会存在大量的永远不会被访问的数据。然而缓存空间是有限的，如果缓存写满了，再往缓存中存储数据时就会有额外的性能开销，影响 Redis 的性能。这部分开销主要是指往缓存中写数据时判断缓存淘汰策略，根据淘汰策略去选择要淘汰的数据，然后进行删除操作。</p>
<ul>
<li>最大缓存设置多少</li>
</ul>
<p>系统的设计选择是一个权衡的过程：大容量缓存是能带来性能加速的收益，但是成本也会更高，而小容量缓存不一定就起不到加速访问的效果。一般来说，我会建议把缓存容量设置为总数据量的 15% 到 30%，兼顾访问性能和内存空间开销。对于 Redis 来说，一旦确定了缓存最大容量，比如 4GB，你就可以使用下面这个命令来设定缓存的大小了：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>CONFIG SET maxmemory 4gb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>不过，缓存被写满是不可避免的, 所以需要数据淘汰策略。</p>
<ul>
<li>缓存淘汰策略</li>
</ul>
<blockquote>
<p>具体的放到下一个小节来说</p>
</blockquote>
<h2 id="缓存更新策略" tabindex="-1"><a class="header-anchor" href="#缓存更新策略" aria-hidden="true">#</a> 缓存更新策略</h2>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">内存淘汰</th>
<th style="text-align:center">超时剔除</th>
<th style="text-align:center">主动更新</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">说明</td>
<td style="text-align:center">不用自己维护，利用 Redis 的内存淘汰机制，当内存不足时自动淘汰部分数据。下次查询时更新缓存</td>
<td style="text-align:center">给缓存数据添加TTL时间，到期后自动删除缓存。下次查询时更新缓存。</td>
<td style="text-align:center">编写业务逻辑，在修改数据库的同时，更新缓存。</td>
</tr>
<tr>
<td style="text-align:center">一致性</td>
<td style="text-align:center">差</td>
<td style="text-align:center">一般</td>
<td style="text-align:center">好</td>
</tr>
<tr>
<td style="text-align:center">维护成本</td>
<td style="text-align:center">无</td>
<td style="text-align:center">低</td>
<td style="text-align:center">高</td>
</tr>
</tbody>
</table>
<p><strong>业务场景：</strong></p>
<ul>
<li>低一致性需求：数据的变化频率低，使用内存淘汰机制。例如：店铺类型的查询缓存。</li>
<li>高一致性需求：数据经常发生改变，主动更新，并以超时剔除作为兜底方案。例如：店铺详情查询的缓存。</li>
</ul>
<h3 id="主动更新策略" tabindex="-1"><a class="header-anchor" href="#主动更新策略" aria-hidden="true">#</a> 主动更新策略</h3>
<ol>
<li>
<p><strong>Cache Aside Pattern</strong>：由缓存的调用者，在更新数据库的同时更新缓存。</p>
</li>
<li>
<p>Read/Write Through Pattern：缓存和数据库整合为一个服务，由服务来维护一致性。调用者调用该服务，无需关心缓存一致性问题。</p>
</li>
<li>
<p>Write Behind Caching Pattern：调用者只操作缓存，由其他线程异步的将缓存数据持久化到数据库，保证最终一致。</p>
</li>
</ol>
<blockquote>
<p>一般情况下都使用第一种方法，可控性更高。</p>
</blockquote>
<p>在操作缓存时，数据库发生修改则直接删除对应的缓存，待查询时再创建缓存。</p>
<ul>
<li>单体系统，将缓存和数据库操作放在同一个事务内。</li>
<li>分布式系统，使用TCC等分布式事务方案。</li>
</ul>
<p>先操作数据库，在删除缓存。</p>
<h2 id="缓存淘汰策略" tabindex="-1"><a class="header-anchor" href="#缓存淘汰策略" aria-hidden="true">#</a> 缓存淘汰策略</h2>
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
</div></template>



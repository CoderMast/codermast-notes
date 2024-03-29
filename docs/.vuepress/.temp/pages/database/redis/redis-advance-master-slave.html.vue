<template><div><h1 id="redis进阶-redis主从" tabindex="-1"><a class="header-anchor" href="#redis进阶-redis主从" aria-hidden="true">#</a> Redis进阶 - Redis主从</h1>
<h2 id="搭建主从架构" tabindex="-1"><a class="header-anchor" href="#搭建主从架构" aria-hidden="true">#</a> 搭建主从架构</h2>
<p>单节点 Redis 的并发能力是有上限的，要进一步提高 Redis 的并发能力，就需要搭建主从集群，实现读写分离。</p>
<blockquote>
<p>在 Redis 5.0 以前，从节点都叫做 slave，在 5.0 版本以后被称为 replica，本质上是一个东西。</p>
</blockquote>
<h3 id="_1-集群结构" tabindex="-1"><a class="header-anchor" href="#_1-集群结构" aria-hidden="true">#</a> 1.集群结构</h3>
<p>我们搭建的主从集群结构如图：</p>
<figure><img src="@source/../assets/redis-advance-master-slave/2023-06-24-20-37-26.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>共包含三个节点，一个主节点，两个从节点。</p>
<p>这里我们会在同一台虚拟机中开启3个redis实例，模拟主从集群，信息如下：</p>
<table>
<thead>
<tr>
<th style="text-align:center">IP</th>
<th style="text-align:center">PORT</th>
<th style="text-align:center">角色</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">192.168.150.101</td>
<td style="text-align:center">7001</td>
<td style="text-align:center">master</td>
</tr>
<tr>
<td style="text-align:center">192.168.150.101</td>
<td style="text-align:center">7002</td>
<td style="text-align:center">slave</td>
</tr>
<tr>
<td style="text-align:center">192.168.150.101</td>
<td style="text-align:center">7003</td>
<td style="text-align:center">slave</td>
</tr>
</tbody>
</table>
<h3 id="_2-准备实例和配置" tabindex="-1"><a class="header-anchor" href="#_2-准备实例和配置" aria-hidden="true">#</a> 2.准备实例和配置</h3>
<p>要在同一台虚拟机开启3个实例，必须准备三份不同的配置文件和目录，配置文件所在目录也就是工作目录。</p>
<ol>
<li>创建目录</li>
</ol>
<p>我们创建三个文件夹，名字分别叫7001、7002、7003：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 进入/tmp目录</span>
<span class="token builtin class-name">cd</span> /tmp
<span class="token comment"># 创建目录</span>
<span class="token function">mkdir</span> <span class="token number">7001</span> <span class="token number">7002</span> <span class="token number">7003</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>恢复原始配置</li>
</ol>
<p>修改redis-6.2.4/redis.conf文件，将其中的持久化模式改为默认的RDB模式，AOF保持关闭状态。</p>
<div class="language-properties line-numbers-mode" data-ext="properties"><pre v-pre class="language-properties"><code><span class="token comment"># 开启RDB</span>
<span class="token comment"># save ""</span>
<span class="token key attr-name">save</span> <span class="token value attr-value">3600 1</span>
<span class="token key attr-name">save</span> <span class="token value attr-value">300 100</span>
<span class="token key attr-name">save</span> <span class="token value attr-value">60 10000</span>
 
<span class="token comment"># 关闭AOF</span>
<span class="token key attr-name">appendonly</span> <span class="token value attr-value">no</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>拷贝配置文件到每个实例目录</li>
</ol>
<p>然后将redis-6.2.4/redis.conf文件拷贝到三个目录中（在/tmp目录执行下列命令）：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 方式一：逐个拷贝</span>
<span class="token function">cp</span> redis-6.2.4/redis.conf <span class="token number">7001</span>
<span class="token function">cp</span> redis-6.2.4/redis.conf <span class="token number">7002</span>
<span class="token function">cp</span> redis-6.2.4/redis.conf <span class="token number">7003</span>
 
<span class="token comment"># 方式二：管道组合命令，一键拷贝</span>
<span class="token builtin class-name">echo</span> <span class="token number">7001</span> <span class="token number">7002</span> <span class="token number">7003</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> <span class="token function">cp</span> redis-6.2.4/redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>修改每个实例的端口、工作目录</li>
</ol>
<p>修改每个文件夹内的配置文件，将端口分别修改为7001、7002、7003，将rdb文件保存位置都修改为自己所在目录（在/tmp目录执行下列命令）：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">-e</span> <span class="token string">'s/6379/7001/g'</span> <span class="token parameter variable">-e</span> <span class="token string">'s/dir .\//dir \/tmp\/7001\//g'</span> <span class="token number">7001</span>/redis.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">-e</span> <span class="token string">'s/6379/7002/g'</span> <span class="token parameter variable">-e</span> <span class="token string">'s/dir .\//dir \/tmp\/7002\//g'</span> <span class="token number">7002</span>/redis.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">-e</span> <span class="token string">'s/6379/7003/g'</span> <span class="token parameter variable">-e</span> <span class="token string">'s/dir .\//dir \/tmp\/7003\//g'</span> <span class="token number">7003</span>/redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>修改每个实例的声明IP</li>
</ol>
<p>虚拟机本身有多个IP，为了避免将来混乱，我们需要在redis.conf文件中指定每一个实例的绑定ip信息，格式如下：</p>
<div class="language-properties line-numbers-mode" data-ext="properties"><pre v-pre class="language-properties"><code><span class="token comment"># redis实例的声明 IP</span>
<span class="token key attr-name">replica-announce-ip</span> <span class="token value attr-value">192.168.150.101</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>每个目录都要改，我们一键完成修改（在/tmp目录执行下列命令）：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 逐一执行</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">'1a replica-announce-ip 192.168.150.101'</span> <span class="token number">7001</span>/redis.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">'1a replica-announce-ip 192.168.150.101'</span> <span class="token number">7002</span>/redis.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">'1a replica-announce-ip 192.168.150.101'</span> <span class="token number">7003</span>/redis.conf
 
<span class="token comment"># 或者一键修改</span>
<span class="token builtin class-name">printf</span> <span class="token string">'%s\n'</span> <span class="token number">7001</span> <span class="token number">7002</span> <span class="token number">7003</span> <span class="token operator">|</span> <span class="token function">xargs</span> -I<span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token parameter variable">-t</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">'1a replica-announce-ip 192.168.150.101'</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>/redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-启动" tabindex="-1"><a class="header-anchor" href="#_3-启动" aria-hidden="true">#</a> 3.启动</h3>
<p>为了方便查看日志，我们打开3个ssh窗口，分别启动3个redis实例，启动命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 第1个</span>
redis-server <span class="token number">7001</span>/redis.conf
<span class="token comment"># 第2个</span>
redis-server <span class="token number">7002</span>/redis.conf
<span class="token comment"># 第3个</span>
redis-server <span class="token number">7003</span>/redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要一键停止，可以运行下面命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">printf</span> <span class="token string">'%s\n'</span> <span class="token number">7001</span> <span class="token number">7002</span> <span class="token number">7003</span> <span class="token operator">|</span> <span class="token function">xargs</span> -I<span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token parameter variable">-t</span> redis-cli <span class="token parameter variable">-p</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token function">shutdown</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-开启主从关系" tabindex="-1"><a class="header-anchor" href="#_4-开启主从关系" aria-hidden="true">#</a> 4.开启主从关系</h3>
<p>现在三个实例还没有任何关系，要配置主从可以使用replicaof 或者slaveof（5.0以前）命令。</p>
<p>有临时和永久两种模式：</p>
<ul>
<li>
<p>修改配置文件（永久生效）</p>
<ul>
<li>在redis.conf中添加一行配置：<code v-pre>slaveof &lt;masterip&gt; &lt;masterport&gt;</code></li>
</ul>
</li>
<li>
<p>使用redis-cli客户端连接到redis服务，执行slaveof命令（重启后失效）：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>slaveof <span class="token operator">&lt;</span>masterip<span class="token operator">></span> <span class="token operator">&lt;</span>masterport<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<p><strong><font color='red'>注意</font></strong>：在5.0以后新增命令replicaof，与salveof效果一致。</p>
<p>这里我们为了演示方便，使用方式二。</p>
<p>通过redis-cli命令连接7002，执行下面命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 连接 7002</span>
redis-cli <span class="token parameter variable">-p</span> <span class="token number">7002</span>
<span class="token comment"># 执行slaveof</span>
slaveof <span class="token number">192.168</span>.150.101 <span class="token number">7001</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过redis-cli命令连接7003，执行下面命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 连接 7003</span>
redis-cli <span class="token parameter variable">-p</span> <span class="token number">7003</span>
<span class="token comment"># 执行slaveof</span>
slaveof <span class="token number">192.168</span>.150.101 <span class="token number">7001</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后连接 7001节点，查看集群状态：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 连接 7001</span>
redis-cli <span class="token parameter variable">-p</span> <span class="token number">7001</span>
<span class="token comment"># 查看状态</span>
info replication
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-测试" tabindex="-1"><a class="header-anchor" href="#_5-测试" aria-hidden="true">#</a> 5.测试</h3>
<p>执行下列操作以测试：</p>
<ul>
<li>
<p>利用redis-cli连接7001，执行<code v-pre>set num 123</code></p>
</li>
<li>
<p>利用redis-cli连接7002，执行<code v-pre>get num</code>，再执行<code v-pre>set num 666</code></p>
</li>
<li>
<p>利用redis-cli连接7003，执行<code v-pre>get num</code>，再执行<code v-pre>set num 888</code></p>
</li>
</ul>
<p>可以发现，只有在7001这个master节点上可以执行写操作，7002和7003这两个slave节点只能执行读操作。</p>
<h2 id="数据同步原理" tabindex="-1"><a class="header-anchor" href="#数据同步原理" aria-hidden="true">#</a> 数据同步原理</h2>
<h3 id="全量同步" tabindex="-1"><a class="header-anchor" href="#全量同步" aria-hidden="true">#</a> 全量同步</h3>
<p>主从第一次同步是全量同步：</p>
<figure><img src="@source/../assets/redis-advance-master-slave/2023-06-24-23-57-00.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>master 是如何判断 slave 是不是第一次来同步数据？这里会用到两个很重要的概念：</p>
<ul>
<li>
<p>Replication ID：简称replid，是数据集的标记，id 一致则说明是同一数据集。每一个 master 都有位移的 replid，slave 则会继承 master 节点的 replid。</p>
</li>
<li>
<p>Offset：偏移量，随着记录在 repl_baklog 中的数据增多而逐渐增大。slave 完成同步时也会记录当前同步的 offset。如果 slave 的 offset 小于 master 的 offset，说明 slave 数据落后于 master，需要更新。</p>
</li>
</ul>
<p>因此 slave 做数据同步，必须想 master 声明自己的 replication id 和 offset，master 才可以判断到底需要同步哪些数据。</p>
<p>先判断 replication id 是否相同，再判断 offset 的大小关系。</p>
<div class="hint-container info">
<p class="hint-container-title">全量同步的流程</p>
<ol>
<li>slave 节点请求增量同步</li>
<li>master 节点判断 replid，发现不一致，拒绝增量同步。</li>
<li>master 将完整内存数据生成 RDB，发送 RDB到 slave</li>
<li>slave 清空本地数据，加载master 的 RDB</li>
<li>master 将 RDB 期间的命令记录在 repl_baklog，并持续将 log 中的命令发送给 slave</li>
<li>slave 收到接受的命令，保持与 master 之间的同步。</li>
</ol>
</div>
<h3 id="增量同步" tabindex="-1"><a class="header-anchor" href="#增量同步" aria-hidden="true">#</a> 增量同步</h3>
<p>主从第一次同步是全量同步，但如果 slave 冲去后同步，则执行增量同步。</p>
<figure><img src="@source/../assets/redis-advance-master-slave/2023-06-25-00-15-30.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>repl_baklog 大小有上限，写满以后会覆盖最早的数据。如果 slave 断开时间过久，导致数据被覆盖，则无法实现增量同步，只能再次全量同步。</p>
</div>
<p>可以从以下几个方面来优化 Redis 主从集群：</p>
<ul>
<li>在 master 中配置 repl_diskless-sync yes 启用无磁盘复制，避免全量同步时的磁盘 IO。一般适用于网络带宽较大的情况下。</li>
<li>Redis 单节点上的内存占用不要太大，减少 RDB 导致的过多磁盘 IO。</li>
<li>适当提高 repl_baklog 的大小，发现 slave 宕机时尽快实现故障恢复，尽可能避免全量同步</li>
<li>限制一个 master 上的 slave 节点数量，如果实在是太多 slave，则可以采用 主-从-从链式结构，减少 master 压力</li>
</ul>
<figure><img src="@source/../assets/redis-advance-master-slave/2023-06-25-00-20-48.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p><strong>简述全量同步和增量同步的区别？</strong></p>
<ul>
<li>全量同步：master 将完整内存数据生成 RDB，发送 RDB 到 slave。后续命令则记录在repl_baklog，逐个发送给 slave。</li>
<li>增量同步：slave 提交自己的 offset 到 master，master 获取 repl_baklog 中从 offset 之后的命令给 slave</li>
</ul>
<p><strong>什么时候执行全量同步？</strong></p>
<ul>
<li>slave 节点第一次连接 master 节点时。</li>
<li>slave 节点断开时间太久，repl_baklog 中的 offset 已经被覆盖时</li>
</ul>
<p><strong>什么时候执行增量同步？</strong></p>
<ul>
<li>slave 节点断开又恢复，并且在 repl_baklog 中能找到 offset 时。</li>
</ul>
</div></template>



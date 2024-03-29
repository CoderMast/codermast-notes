<template><div><h1 id="redis入门-5种基本数据类型" tabindex="-1"><a class="header-anchor" href="#redis入门-5种基本数据类型" aria-hidden="true">#</a> Redis入门 - 5种基本数据类型</h1>
<div class="hint-container tip">
<p class="hint-container-title">说明</p>
<p>在我们平常的业务中基本只会使用到Redis的基本数据类型（String、List、Hash、Set、Sorted Set），特殊类型（Geo、Bitmap、Hyperloglog）类型只有在特殊的业务场景下会使用到，通常只需要掌握基本数据类型即可，特殊类型作为了解即可。</p>
</div>
<h2 id="string-字符串" tabindex="-1"><a class="header-anchor" href="#string-字符串" aria-hidden="true">#</a> String 字符串</h2>
<p>String类型，也就是字符串类型，是Redis中最简单的存储类型。String 类型是二进制安全的。意思是 redis 的 String 可以包含任何数据。比如jpg图片或者序列化的对象。</p>
<p>其value是字符串，不过根据字符串的格式不同，又可以分为3类：</p>
<ul>
<li>string：普通字符串</li>
<li>int：整数类型，可以做自增、自减操作</li>
<li>float：浮点类型，可以做自增、自减操作</li>
</ul>
<p>不管是哪种格式，底层都是字节数组形式存储，只不过是编码方式不同。字符串类型的最大空间不能超过512m.</p>
<p><strong>String类型的常见操作命令</strong>：</p>
<table>
<thead>
<tr>
<th style="text-align:center">命令</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">SET</td>
<td style="text-align:center">添加或者修改已经存在的一个String类型的键值对</td>
</tr>
<tr>
<td style="text-align:center">GET</td>
<td style="text-align:center">根据key获取String类型的value</td>
</tr>
<tr>
<td style="text-align:center">MSET</td>
<td style="text-align:center">批量添加多个String类型的键值对</td>
</tr>
<tr>
<td style="text-align:center">MGET</td>
<td style="text-align:center">根据多个key获取多个String类型的value</td>
</tr>
<tr>
<td style="text-align:center">INCR</td>
<td style="text-align:center">让一个整型的key自增1</td>
</tr>
<tr>
<td style="text-align:center">INCRBY</td>
<td style="text-align:center">让一个整型的key自增并指定步长，例如：incrby num 2 让num值自增2</td>
</tr>
<tr>
<td style="text-align:center">INCRBYFLOAT</td>
<td style="text-align:center">让一个浮点类型的数字自增并指定步长</td>
</tr>
<tr>
<td style="text-align:center">SETNX</td>
<td style="text-align:center">添加一个String类型的键值对，前提是这个key不存在，否则不执行</td>
</tr>
<tr>
<td style="text-align:center">SETEX</td>
<td style="text-align:center">添加一个String类型的键值对，并且指定有效期</td>
</tr>
</tbody>
</table>
<p>Redis的key中虽然没有目录结构，但是允许有多个单词形成层级结构，多个单词之间用” ：“隔开，一般情况下使用的格式为：<code v-pre>项目名:业务名:类型:id</code>。</p>
<p>这个格式并非固定，也可以根据自己的需求来删除或添加词条。</p>
<div class="hint-container info">
<p class="hint-container-title">举例说明</p>
<p>例如我们的项目名称叫 myblog ，有user和product两种不同类型的数据，我们可以这样定义key：</p>
<p>user相关的key：myblog:user:1</p>
<p>product相关的key：myblog:product:1</p>
<p>如果Value是一个Java对象，例如一个User对象，则可以将对象序列化为JSON字符串后存储</p>
<table>
<thead>
<tr>
<th style="text-align:center">KEY</th>
<th style="text-align:center">VALUE</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">myblog:user:1</td>
<td style="text-align:center">{“id”:1, “name”: “Jack”, “age”: 21}</td>
</tr>
<tr>
<td style="text-align:center">myblog:product:1</td>
<td style="text-align:center">{“id”:1, “name”: “小米11”, “price”: 4999}</td>
</tr>
</tbody>
</table>
</div>
<h2 id="hash-哈希" tabindex="-1"><a class="header-anchor" href="#hash-哈希" aria-hidden="true">#</a> Hash 哈希</h2>
<p>Hash类型，也叫散列，又可以成为哈希类型。其value是一个无序字典，类似于Java中的HashMap结构。</p>
<p>Hash结构可以将对象中的每个字段独立存储，可以针对单个字段做CRUD</p>
<figure><img src="@source/../assets/datatype-commond/2023-05-16-17-09-37.png" alt="Hash类型的数据" tabindex="0" loading="lazy"><figcaption>Hash类型的数据</figcaption></figure>
<p>Hash的常见命令有：</p>
<table>
<thead>
<tr>
<th style="text-align:center">命令</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">HSET key field value</td>
<td style="text-align:center">添加或者修改hash类型key的field的值</td>
</tr>
<tr>
<td style="text-align:center">HGET key field</td>
<td style="text-align:center">获取一个hash类型key的field的值</td>
</tr>
<tr>
<td style="text-align:center">HMSET</td>
<td style="text-align:center">hmset 和 hset 效果相同 ，4.0之后hmset可以弃用了</td>
</tr>
<tr>
<td style="text-align:center">HMGET</td>
<td style="text-align:center">批量获取多个hash类型key的field的值</td>
</tr>
<tr>
<td style="text-align:center">HGETALL</td>
<td style="text-align:center">获取一个hash类型的key中的所有的field和value</td>
</tr>
<tr>
<td style="text-align:center">HKEYS</td>
<td style="text-align:center">获取一个hash类型的key中的所有的field</td>
</tr>
<tr>
<td style="text-align:center">HVALS</td>
<td style="text-align:center">获取一个hash类型的key中的所有的value</td>
</tr>
<tr>
<td style="text-align:center">HINCRBY</td>
<td style="text-align:center">让一个hash类型key的字段值自增并指定步长</td>
</tr>
<tr>
<td style="text-align:center">HSETNX</td>
<td style="text-align:center">添加一个hash类型的key的field值，前提是这个field不存在，否则不执行</td>
</tr>
</tbody>
</table>
<h3 id="list-列表" tabindex="-1"><a class="header-anchor" href="#list-列表" aria-hidden="true">#</a> List 列表</h3>
<p>Redis中的List类型与Java中的LinkedList类似，可以看做是一个双向链表结构。既可以支持正向检索和也可以支持反向检索。</p>
<p>特征也与LinkedList类似：</p>
<ul>
<li>有序</li>
<li>元素可以重复</li>
<li>插入和删除快</li>
<li>查询速度一般</li>
</ul>
<p>常用来存储一个有序数据，例如：朋友圈点赞列表，评论列表等.</p>
<table>
<thead>
<tr>
<th style="text-align:center">命令</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">LPUSH key element …</td>
<td style="text-align:center">向列表左侧插入一个或多个元素</td>
</tr>
<tr>
<td style="text-align:center">LPOP key</td>
<td style="text-align:center">移除并返回列表左侧的第一个元素，没有则返回nil</td>
</tr>
<tr>
<td style="text-align:center"><strong>RPUSH key element …</strong></td>
<td style="text-align:center">向列表右侧插入一个或多个元素</td>
</tr>
<tr>
<td style="text-align:center">RPOP key</td>
<td style="text-align:center">移除并返回列表右侧的第一个元素</td>
</tr>
<tr>
<td style="text-align:center">LRANGE key star end</td>
<td style="text-align:center">返回一段角标范围内的所有元素</td>
</tr>
<tr>
<td style="text-align:center">BLPOP和BRPOP</td>
<td style="text-align:center">与LPOP和RPOP类似，只不过在没有元素时等待指定时间，而不是直接返回nil</td>
</tr>
</tbody>
</table>
<figure><img src="@source/../assets/datatype-commond/双端队列.gif" alt="双端队列示意图" tabindex="0" loading="lazy"><figcaption>双端队列示意图</figcaption></figure>
<h2 id="set-集合" tabindex="-1"><a class="header-anchor" href="#set-集合" aria-hidden="true">#</a> Set 集合</h2>
<p>Redis的Set结构与Java中的HashSet类似，可以看做是一个value为null的HashMap。因为也是一个hash表，因此具备与HashSet类似的特征</p>
<ul>
<li>无序</li>
<li>元素不可重复</li>
<li>查找快</li>
<li>支持交集、并集、差集等功能</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:center">命令</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">SADD key member …</td>
<td style="text-align:center">向set中添加一个或多个元素</td>
</tr>
<tr>
<td style="text-align:center">SREM key member …</td>
<td style="text-align:center">移除set中的指定元素</td>
</tr>
<tr>
<td style="text-align:center">SCARD key</td>
<td style="text-align:center">返回set中元素的个数</td>
</tr>
<tr>
<td style="text-align:center">SISMEMBER key member</td>
<td style="text-align:center">判断一个元素是否存在于set中</td>
</tr>
<tr>
<td style="text-align:center">SMEMBERS</td>
<td style="text-align:center">获取set中的所有元素</td>
</tr>
<tr>
<td style="text-align:center">SINTER key1 key2 …</td>
<td style="text-align:center">求key1与key2的交集</td>
</tr>
<tr>
<td style="text-align:center">SDIFF key1 key2 …</td>
<td style="text-align:center">求key1与key2的差集</td>
</tr>
<tr>
<td style="text-align:center">SUNION key1 key2 …</td>
<td style="text-align:center">求key1和key2的并集</td>
</tr>
</tbody>
</table>
<figure><img src="@source/../assets/datatype-commond/2023-05-16-17-15-01.png" alt="tip 交集、差集、并集图示" tabindex="0" loading="lazy"><figcaption>tip 交集、差集、并集图示</figcaption></figure>
<h2 id="sortedset-有序集合" tabindex="-1"><a class="header-anchor" href="#sortedset-有序集合" aria-hidden="true">#</a> SortedSet 有序集合</h2>
<p>Redis的SortedSet又可以成为Zset，是一个可排序的set集合，与Java中的TreeSet有些类似，但底层数据结构却差别很大。</p>
<p>SortedSet中的每一个元素都带有一个score属性，可以基于score属性对元素排序，底层的实现是一个跳表（SkipList）加 hash表。</p>
<p><strong>SortedSet具备下列特性：</strong></p>
<ul>
<li>可排序</li>
<li>元素不重复</li>
<li>查询速度快</li>
</ul>
<p>因为SortedSet的可排序特性，经常被用来实现排行榜这样的功能。</p>
<p><strong>SortedSet的常见命令有</strong></p>
<table>
<thead>
<tr>
<th style="text-align:center">命令</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">ZADD key score member</td>
<td style="text-align:center">添加一个或多个元素到sorted set ，如果已经存在则更新其score值</td>
</tr>
<tr>
<td style="text-align:center">ZREM key member</td>
<td style="text-align:center">删除sorted set中的一个指定元素</td>
</tr>
<tr>
<td style="text-align:center">ZSCORE key member</td>
<td style="text-align:center">获取sorted set中的指定元素的score值</td>
</tr>
<tr>
<td style="text-align:center">ZRANK key member</td>
<td style="text-align:center">获取sorted set 中的指定元素的排名</td>
</tr>
<tr>
<td style="text-align:center">ZCARD key</td>
<td style="text-align:center">获取sorted set中的元素个数</td>
</tr>
<tr>
<td style="text-align:center">ZCOUNT key min max</td>
<td style="text-align:center">统计score值在给定范围内的所有元素的个数</td>
</tr>
<tr>
<td style="text-align:center">ZINCRBY key increment member</td>
<td style="text-align:center">让sorted set中的指定元素自增，步长为指定的increment值</td>
</tr>
<tr>
<td style="text-align:center">ZRANGE key min max</td>
<td style="text-align:center">按照score排序后，获取指定排名范围内的元素</td>
</tr>
<tr>
<td style="text-align:center">ZRANGEBYSCORE key min max</td>
<td style="text-align:center">按照score排序后，获取指定score范围内的元素</td>
</tr>
<tr>
<td style="text-align:center">ZDIFF、ZINTER、ZUNION</td>
<td style="text-align:center">求差集、交集、并集</td>
</tr>
</tbody>
</table>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>所有的排名默认都是升序，如果要降序则在命令的Z后面添加<code v-pre>REV</code>即可</p>
</div>
</div></template>



<template><div><h1 id="redis入门-3种特殊数据类型" tabindex="-1"><a class="header-anchor" href="#redis入门-3种特殊数据类型" aria-hidden="true">#</a> Redis入门 - 3种特殊数据类型</h1>
<div class="hint-container tip">
<p class="hint-container-title">说明</p>
<p>在我们平常的业务中基本只会使用到Redis的基本数据类型（String、List、Hash、Set、Sorted Set），特殊类型（Geo、Bitmap、Hyperloglog）类型只有在特殊的业务场景下会使用到，通常只需要掌握基本数据类型即可，特殊类型作为了解即可。</p>
</div>
<h2 id="geo类型" tabindex="-1"><a class="header-anchor" href="#geo类型" aria-hidden="true">#</a> GEO类型</h2>
<p>GEO，Geographic，地理信息的缩写。该类型，就是元素的2维坐标，在地图上就是经纬度。redis基于该类型，提供了经纬度设置，查询，范围查询，距离查询，经纬度Hash等常⻅操作。</p>
<ul>
<li>geoadd：添加地理位置的坐标。</li>
<li>geopos：获取地理位置的坐标。</li>
<li>geodist：计算两个位置之间的距离。</li>
<li>georadius：根据⽤户给定的经纬度坐标来获取指定范围内的地理位置集合。</li>
<li>georadiusbymember：根据储存在位置集合⾥⾯的某个地点获取指定范围内的地理位置集合。</li>
<li>geohash：返回⼀个或多个位置对象的 geohash 值。</li>
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
<td style="text-align:center">GEOHASH key member [member ...]</td>
<td style="text-align:center">返回⼀个或多个位置元素的 Geohash 表示</td>
</tr>
<tr>
<td style="text-align:center">GEOPOS key member [member ...]</td>
<td style="text-align:center">从key⾥返回所有给定位置元素的位置（经度和纬度）</td>
</tr>
<tr>
<td style="text-align:center">GEODIST key member1 member2 [m|km|ft|mi]</td>
<td style="text-align:center">返回两个给定位置之间的距离</td>
</tr>
<tr>
<td style="text-align:center">GEORADIUS key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]</td>
<td style="text-align:center">以给定的经纬度为中⼼， 找出某⼀半径内的元素</td>
</tr>
<tr>
<td style="text-align:center">GEOADD key longitude latitude member [longitude latitude member ...]</td>
<td style="text-align:center">将指定的地理空间位置（纬度、经度、名称）添加到指定的key中</td>
</tr>
<tr>
<td style="text-align:center">GEORADIUSBYMEMBER key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]</td>
<td style="text-align:center">找出位于指定范围内的 元素，中⼼点是由给定的位置元素决定</td>
</tr>
</tbody>
</table>
<h2 id="bitmap类型" tabindex="-1"><a class="header-anchor" href="#bitmap类型" aria-hidden="true">#</a> Bitmap类型</h2>
<p>从本质上来说，bitmap不是⼀种数据类型，本质是字符串key-value，但是其可以对位进⾏操作。也可以将bitmap想象成⼀个只能存储0、1的整型数组，可以随时对任意⼀位进⾏运算。下标在bitmap中成为偏移量。</p>
<table>
<thead>
<tr>
<th style="text-align:center">命令</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">setbit</td>
<td style="text-align:center">设置Bitmaps中某个偏移量的值（0或1）(offset:偏移量从0开始)</td>
</tr>
<tr>
<td style="text-align:center">getbit</td>
<td style="text-align:center">获取Bitmaps中某个偏移量的值（偏移量不存在，也是返回0）</td>
</tr>
<tr>
<td style="text-align:center">bitcount[start end]</td>
<td style="text-align:center">统计字符串被设置为1的bit数。</td>
</tr>
<tr>
<td style="text-align:center">bitop and(or/not/xor) [key…]</td>
<td style="text-align:center">bitop是⼀个复合操作， 它可以做多个Bitmaps的and（交集） 、 or（并集） 、 not（⾮） 、 xor（异或） 操作并将结果保存在destkey中。</td>
</tr>
</tbody>
</table>
<h2 id="hyperloglog类型" tabindex="-1"><a class="header-anchor" href="#hyperloglog类型" aria-hidden="true">#</a> Hyperloglog类型</h2>
<p>Redis HyperLogLog 是⽤来做基数统计的算法，HyperLogLog 的优点是，在输⼊元素的数量或者体积⾮常⾮常⼤时，计算基数所需的空间总是固定 的、并且是很⼩的。</p>
<p>在 Redis ⾥⾯，每个 HyperLogLog 键只需要花费 12 KB 内存，就可以计算接近 2^64 个不同元素的基 数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对⽐。</p>
<p>但是，因为 HyperLogLog 只会根据输⼊元素来计算基数，⽽不会储存输⼊元素本身，所以HyperLogLog 不能像集合那样，返回输⼊的各个元素。</p>
<table>
<thead>
<tr>
<th style="text-align:center">命令</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">pfadd &lt;element&gt; [element ...]</td>
<td style="text-align:center">将所有元素添加到指定HyperLogLog数据结构中。如果执⾏命令后HLL估计的近似基数发⽣变化，则返回1，否则返回0。</td>
</tr>
<tr>
<td style="text-align:center">pfcount [key ...]</td>
<td style="text-align:center">计算HLL的近似基数，可以计算多个HLL，⽐如⽤HLL存储每天的UV，计算⼀周的UV可以使⽤7天的UV合并计算即可</td>
</tr>
<tr>
<td style="text-align:center">pfmerge [sourcekey ...]</td>
<td style="text-align:center">将⼀个或多个HLL合并后的结果存储在另⼀个HLL中，⽐如每⽉活跃⽤户可以使⽤每天的活跃⽤户来合并计算可得</td>
</tr>
</tbody>
</table>
</div></template>



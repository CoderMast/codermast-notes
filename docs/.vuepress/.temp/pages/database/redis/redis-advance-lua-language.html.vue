<template><div><h1 id="redis进阶-lua语法" tabindex="-1"><a class="header-anchor" href="#redis进阶-lua语法" aria-hidden="true">#</a> Redis进阶 - Lua语法</h1>
<h2 id="初识-lua" tabindex="-1"><a class="header-anchor" href="#初识-lua" aria-hidden="true">#</a> 初识 Lua</h2>
<p>Lua 是一种轻量小巧的脚本语言，用标准的 C 语言编写并以源代码形式开放，其设计的目的是为了嵌入应用程序中，从而为应用程序提供灵活的扩展和定制功能。</p>
<p>官网：<a href="https://www.lua.org/" target="_blank" rel="noopener noreferrer">https://www.lua.org/<ExternalLinkIcon/></a></p>
<figure><img src="@source/../assets/redis-advance-lua-language/2023-08-26-20-27-16.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="快速入门" tabindex="-1"><a class="header-anchor" href="#快速入门" aria-hidden="true">#</a> 快速入门</h2>
<ol>
<li>在 Linux 虚拟机的任意目录下，新建一个 hello.lua 文件</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">touch</span> hello.lua
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>添加下面的内容</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>print("Hello World!")
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>运行</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>lua hello.lua
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4">
<li>运行结果</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Hello World!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h2>
<p>在正式了解变量之前，需要先对 Lua 中的数据类型有个简单的了解，下面是 Lua 语言中的一些数据类型。</p>
<table>
<thead>
<tr>
<th style="text-align:center">数据类型</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">nil</td>
<td style="text-align:center">这个最简单，只有值 nil 属于该类型，表示一个无效值（在条件表达式中相当于 false）</td>
</tr>
<tr>
<td style="text-align:center">boolean</td>
<td style="text-align:center">包含两个数：false 和 true</td>
</tr>
<tr>
<td style="text-align:center">number</td>
<td style="text-align:center">表示双精度类型的实浮点数</td>
</tr>
<tr>
<td style="text-align:center">string</td>
<td style="text-align:center">字符串由一对双引号或者单引号来表示</td>
</tr>
<tr>
<td style="text-align:center">function</td>
<td style="text-align:center">由 C 或者 Lua 编写的函数</td>
</tr>
<tr>
<td style="text-align:center">table</td>
<td style="text-align:center">Lua 中的表（table）其实是一个 “关联数组” （associative arrays），数组的索引可以是数字、字符串或表类型。在 Lua 里，table 的创建是通过 “构造表达式” 来完成，最简单的构造表达式是 {} ，用来创建一个空表。</td>
</tr>
</tbody>
</table>
<p>Lua 声明变量的时候，并不需要指定数据类型：</p>
<ul>
<li>声明字符串：<code v-pre>local str = 'hello'</code></li>
<li>声明数字：<code v-pre>local num = 21</code></li>
<li>声明布尔类型：<code v-pre>local flag = true</code></li>
<li>声明数组 key 为索引的 table ：<code v-pre>local arr = {'Java', 'Python' , 'Lua'}</code></li>
<li>声明 table ，类似 Java 的 Map：<code v-pre>local map = {name = 'Jack', age = 21}</code></li>
</ul>
<p>访问 table 的几种方式：</p>
<ul>
<li>角标访问(从 1 开始)：<code v-pre>table[1]</code></li>
<li>Key 访问：
<ul>
<li><code v-pre>map['name']</code></li>
<li><code v-pre>map.name</code></li>
</ul>
</li>
</ul>
<h2 id="循环" tabindex="-1"><a class="header-anchor" href="#循环" aria-hidden="true">#</a> 循环</h2>
<p>一组被重复执行的语句称之为循环体，能否继续重复，决定循环的终止条件。</p>
<p>循环结构是在一定条件下反复执行某段程序的流程结构，被反复执行的程序被称为循环体。</p>
<p>循环语句是由循环体及循环的终止条件两部分组成的。</p>
<ul>
<li>While循环：在判断条件为 true 时会重复执行循环体语句</li>
</ul>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token keyword">while</span><span class="token punctuation">(</span>condition<span class="token punctuation">)</span>
<span class="token keyword">do</span>
   statements
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>For循环：可以重复执行指定语句，重复次数可在 for 语句中控制。</li>
</ul>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token keyword">for</span> var<span class="token operator">=</span>exp1<span class="token punctuation">,</span>exp2<span class="token punctuation">,</span>exp3 <span class="token keyword">do</span>  
    <span class="token operator">&lt;</span>执行体<span class="token operator">></span>  
<span class="token keyword">end</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>泛型for循环：通过一个迭代器函数来遍历所有值</li>
</ul>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code>a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"one"</span><span class="token punctuation">,</span> <span class="token string">"two"</span><span class="token punctuation">,</span> <span class="token string">"three"</span><span class="token punctuation">}</span>
<span class="token keyword">for</span> i<span class="token punctuation">,</span> v <span class="token keyword">in</span> <span class="token function">ipairs</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token keyword">do</span>
    <span class="token function">print</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> v<span class="token punctuation">)</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>i是数组索引值，v是对应索引的数组元素值。ipairs是Lua提供的一个迭代器函数，用来迭代数组。</p>
</blockquote>
<ul>
<li>Repeat循环：在条件进行判断前循环体都会执行一次，然后才进行条件判断。</li>
</ul>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token keyword">repeat</span>
   statements
<span class="token keyword">until</span><span class="token punctuation">(</span> condition <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>类似于 do ... while ... 循环</p>
</blockquote>
<h2 id="条件" tabindex="-1"><a class="header-anchor" href="#条件" aria-hidden="true">#</a> 条件</h2>
<p>在布尔表达式为 true 时会if中的代码块会被执行，在布尔表达式为 false 时，紧跟在 if 语句 end 之后的代码会被执行。</p>
<p>Lua认为false和nil为假，true 和非nil为真。要注意的是Lua中 0 为 true。</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token keyword">if</span><span class="token punctuation">(</span>布尔表达式<span class="token punctuation">)</span>
<span class="token keyword">then</span>
   <span class="token comment">--[ 布尔表达式为 true 时执行该语句块 --]</span>
<span class="token keyword">else</span>
   <span class="token comment">--[ 布尔表达式为 false 时执行该语句块 --]</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code>optional_function_scope <span class="token keyword">function</span> <span class="token function">function_name</span><span class="token punctuation">(</span> argument1<span class="token punctuation">,</span> argument2<span class="token punctuation">,</span> argument3<span class="token punctuation">...</span><span class="token punctuation">,</span> argumentn<span class="token punctuation">)</span>
    function_body
    <span class="token keyword">return</span> result_params_comma_separated
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>optional_function_scope: 该参数是可选的指定函数是全局函数还是局部函数，未设置该参数默认为全局函数，如果你需要设置函数为局部函数需要使用关键字 local。</p>
</li>
<li>
<p>function_name: 指定函数名称。</p>
</li>
<li>
<p>argument1, argument2, argument3..., argumentn: 函数参数，多个参数以逗号隔开，函数也可以不带参数。</p>
</li>
<li>
<p>function_body: 函数体，函数中需要执行的代码语句块。</p>
</li>
<li>
<p>result_params_comma_separated: 函数返回值，Lua语言函数可以返回多个值，每个值以逗号隔开。</p>
</li>
<li>
<p>Lua函数可以返回多个结果值，比如string.find，其返回匹配串&quot;开始和结束的下标&quot;（如果不存在匹配串返回nil）。</p>
</li>
</ul>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token operator">></span> s<span class="token punctuation">,</span> e <span class="token operator">=</span> string<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">"www.runoob.com"</span><span class="token punctuation">,</span> <span class="token string">"runoob"</span><span class="token punctuation">)</span> 
<span class="token operator">></span> <span class="token function">print</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> e<span class="token punctuation">)</span>
<span class="token number">5</span>    <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Lua 函数可以接受可变数目的参数，和 C 语言类似，在函数参数列表中使用三点 ... 表示函数有可变的参数。</li>
</ul>
<div class="hint-container info">
<p class="hint-container-title">资料</p>
<p><a href="https://www.runoob.com/lua/lua-tutorial.html" target="_blank" rel="noopener noreferrer">https://www.runoob.com/lua/lua-tutorial.html<ExternalLinkIcon/></a></p>
</div>
</div></template>



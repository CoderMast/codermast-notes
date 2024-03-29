<template><div><h1 id="mysql进阶-视图" tabindex="-1"><a class="header-anchor" href="#mysql进阶-视图" aria-hidden="true">#</a> MySQL进阶 - 视图</h1>
<h2 id="介绍和基本语法" tabindex="-1"><a class="header-anchor" href="#介绍和基本语法" aria-hidden="true">#</a> 介绍和基本语法</h2>
<h3 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h3>
<p>视图View是一种虚拟存在的表，视图中的数据并不在数据库中实际存在，行和列数据来自定义视图中使用的表，并且是在使用视图时动态生成的。</p>
<p>简单的来说，视图不保存数据，只是保存了查询的SQL逻辑，不保存查询的结果。所以我们在创建视图的时候，主要的工作就落在创建这条SQL查询语句上。</p>
<div class="hint-container info">
<p class="hint-container-title">简单理解</p>
<p>可以理解为给SQL语句设置别名，我们在使用的时候可以直接使用别名进行子查询、联合查询等操作。</p>
</div>
<h3 id="操作语法" tabindex="-1"><a class="header-anchor" href="#操作语法" aria-hidden="true">#</a> 操作语法</h3>
<ul>
<li>创建</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token punctuation">[</span><span class="token operator">OR</span> <span class="token keyword">REPLACE</span><span class="token punctuation">]</span> <span class="token keyword">VIEW</span> 视图名称<span class="token punctuation">[</span><span class="token punctuation">(</span>列名列表<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token keyword">AS</span> <span class="token keyword">SELECT</span>语句 <span class="token punctuation">[</span><span class="token keyword">WITH</span><span class="token punctuation">[</span><span class="token keyword">CASCADED</span> <span class="token operator">|</span> <span class="token keyword">LOCAL</span><span class="token punctuation">]</span> <span class="token keyword">CHECK</span> <span class="token keyword">OPTION</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>查询</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 查看创建视图语句</span>
<span class="token keyword">SHOW</span> <span class="token keyword">CREATE</span> <span class="token keyword">VIEW</span> 视图名称<span class="token punctuation">;</span>
<span class="token comment">-- 查看视图数据</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> 视图名称<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>视图就是一张逻辑SQL查询的临时表，我们可以直接按照表的操作来操作视图。</p>
<ul>
<li>修改</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 方法一：和创建视图一致，但是需要保证OR REPLACE关键字，说明是替换原来的视图</span>
<span class="token keyword">CREATE</span> <span class="token punctuation">[</span><span class="token operator">OR</span> <span class="token keyword">REPLACE</span><span class="token punctuation">]</span> <span class="token keyword">VIEW</span> 视图名称<span class="token punctuation">[</span><span class="token punctuation">(</span>列名列表<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token keyword">AS</span> <span class="token keyword">SELECT</span>语句 <span class="token punctuation">[</span><span class="token keyword">WITH</span><span class="token punctuation">[</span><span class="token keyword">CASCADED</span> <span class="token operator">|</span> <span class="token keyword">LOCAL</span><span class="token punctuation">]</span> <span class="token keyword">CHECK</span> <span class="token keyword">OPTION</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">-- 方法二</span>
<span class="token keyword">ALTER</span> <span class="token keyword">VIEW</span> 视图名称<span class="token punctuation">[</span><span class="token punctuation">(</span>列名列表<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token keyword">AS</span> <span class="token keyword">SELECT</span>语句 <span class="token punctuation">[</span><span class="token keyword">WITH</span><span class="token punctuation">[</span><span class="token keyword">CASCADED</span> <span class="token operator">|</span> <span class="token keyword">LOCAL</span><span class="token punctuation">]</span> <span class="token keyword">CHECK</span> <span class="token keyword">OPTION</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>删除</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">VIEW</span> <span class="token punctuation">[</span><span class="token keyword">IF</span> <span class="token keyword">EXISTS</span><span class="token punctuation">]</span> 视图名称 <span class="token punctuation">[</span><span class="token punctuation">,</span>视图名称<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="检查选项" tabindex="-1"><a class="header-anchor" href="#检查选项" aria-hidden="true">#</a> 检查选项</h2>
<p>当使用WITH CHECK OPTION 子句创建视图时，MySQL会通过视图检查正在更改的每个行，例如 插入、删除 更新，以使其符合视图的定义。MySQL允许基于另一个视图创建视图，他还会检查依赖视图中的规则以保持一致性。为了确定检查的范围，MySQL提供了两个选项：<code v-pre>CASCADED</code>、<code v-pre>LOCAL</code>，默认值为<code v-pre>CASCADED</code>。</p>
<p>CASCADED会强制检查当前视图和其依赖的视图的筛选条件。</p>
<p>LOCAL会检查当前视图，并且检查定义检查条件的依赖的视图。</p>
<div class="hint-container info">
<p class="hint-container-title">简单理解</p>
<p>可以简单的理解为CASCADED是强制检查所有相关的视图，无论是否定义，而LOCAL只会检查定义检查条件的视图。</p>
</div>
<h2 id="更新及作用" tabindex="-1"><a class="header-anchor" href="#更新及作用" aria-hidden="true">#</a> 更新及作用</h2>
<h3 id="视图的更新" tabindex="-1"><a class="header-anchor" href="#视图的更新" aria-hidden="true">#</a> 视图的更新</h3>
<p>要使视图可以更新，视图中的行与基础表中的行之间必须存在一对一的关系，如果视图包含了以下任意一项，则该视图就不可更新：</p>
<ol>
<li>聚合函数或者窗口函数(SUM()、MIN()、MAX()、COUNT()等)；</li>
<li>DISTINCT</li>
<li>GROUP BY</li>
<li>HAVING</li>
<li>UNION 或者 UNION ALL</li>
</ol>
<h3 id="视图的作用" tabindex="-1"><a class="header-anchor" href="#视图的作用" aria-hidden="true">#</a> 视图的作用</h3>
<ul>
<li>简单</li>
</ul>
<p>视图不仅可以简化用户对数据的理解，也可以简化他们的操作，那些被经常使用的查询可以被定义为视图，从而使得用户不必为以后的操作每次指定全部的查询条件。</p>
<ul>
<li>安全</li>
</ul>
<p>数据库可以授权，但是不能授权到数据库特定行和特定的列上。通过视图用户只能查询和修改他们所能见到的数据。</p>
</div></template>



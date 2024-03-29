<template><div><h1 id="mysql基础-事务" tabindex="-1"><a class="header-anchor" href="#mysql基础-事务" aria-hidden="true">#</a> MySQL基础 - 事务</h1>
<p>事务是一组操作的集合，他是一个不可分隔的工作单位，事务会把所有的操作作为一个整体一起向系统提交或者撤销操作请求，即这些操作要么同时成功，要么同时失败。</p>
<h2 id="事务操作" tabindex="-1"><a class="header-anchor" href="#事务操作" aria-hidden="true">#</a> 事务操作</h2>
<ul>
<li>查看/设置事务提交方式</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> @<span class="token variable">@autocommit</span><span class="token punctuation">;</span>
<span class="token keyword">SET</span> @<span class="token variable">@autocommit</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info">
<p class="hint-container-title">说明</p>
<p>这里的@@autocommit 属性的值有两种：</p>
<ul>
<li>1：则开启自动提交</li>
<li>0：关闭自动提交，此时事务执行完毕时，需要我们使用指令进行提交。</li>
</ul>
</div>
<ul>
<li>开启事务</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">START</span> <span class="token keyword">TRANSACTION</span><span class="token punctuation">;</span>
<span class="token comment">-- 或者</span>
<span class="token keyword">BEGIN</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>提交事务</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">COMMIT</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>回滚事务</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ROLLBACK</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="事务的四大特性" tabindex="-1"><a class="header-anchor" href="#事务的四大特性" aria-hidden="true">#</a> 事务的四大特性</h2>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>事务的ACID特性，是面试中经常被问到的一个知识点，也是实际业务中容易出错的一个点，需要认真学习。</p>
</div>
<ul>
<li>原子性(Atomicity):事务是不可分割的最小操作单元，要么全部成功，要么全部失败。</li>
<li>一致性(Consistency):事务完成时，必须使得所有的数据都保持一致状态。</li>
<li>隔离性(Isolation):数据库提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行。</li>
<li>持久性(Durability):事务一旦提交或者回滚，它对数据库中数据的改变就是永久的。</li>
</ul>
<h2 id="事务并发问题" tabindex="-1"><a class="header-anchor" href="#事务并发问题" aria-hidden="true">#</a> 事务并发问题</h2>
<p>在单线程环境下，对数据库的任何操作都是安全的。但是在并发环境下，对数据库进行事务操作，可能会产生一系列的问题。</p>
<table>
<thead>
<tr>
<th style="text-align:center">问题</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">脏读</td>
<td style="text-align:center">一个事务读到另外一个事务还没有提交的数据。</td>
</tr>
<tr>
<td style="text-align:center">不可重复读</td>
<td style="text-align:center">一个事务先后读取同一条记录，但是两次读取的数据不一致</td>
</tr>
<tr>
<td style="text-align:center">幻读</td>
<td style="text-align:center">一个事务按照指定条件查询数据时，没有对应的数据记录值，但是在插入操作时，又发现数据已经存在。删除现象也是如此</td>
</tr>
</tbody>
</table>
<h2 id="事务的隔离级别" tabindex="-1"><a class="header-anchor" href="#事务的隔离级别" aria-hidden="true">#</a> 事务的隔离级别</h2>
<table>
<thead>
<tr>
<th style="text-align:center">隔离级别</th>
<th style="text-align:center">脏读</th>
<th style="text-align:center">不可重复读</th>
<th style="text-align:center">幻读</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Read Uncommitted(读未提交)</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">✅</td>
</tr>
<tr>
<td style="text-align:center">Read Committed(读已提交)</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">✅</td>
</tr>
<tr>
<td style="text-align:center">Repeatable Read<Badge text="默认" type="danger" />(可重复读)</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">✅</td>
</tr>
<tr>
<td style="text-align:center">Serializable(串行化)</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">❌</td>
</tr>
</tbody>
</table>
<ul>
<li>查看事务的隔离级别</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> @<span class="token variable">@TRANSACTION_ISOLATION</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>设置事务的隔离级别</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SET</span> <span class="token punctuation">[</span><span class="token keyword">Session</span><span class="token operator">|</span><span class="token keyword">Global</span><span class="token punctuation">]</span> <span class="token keyword">TRANSACTION</span> <span class="token keyword">ISOLATION</span> <span class="token keyword">LEVEL</span> {<span class="token keyword">READ</span> <span class="token keyword">UNCOMMITTED</span> <span class="token operator">|</span> <span class="token keyword">READ</span> <span class="token keyword">COMMITTED</span> <span class="token operator">|</span> <span class="token keyword">REPEATABLE</span> <span class="token keyword">READ</span> <span class="token operator">|</span> <span class="token keyword">SERIALIZABLE</span>}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>事务的隔离级别越高，数据的安全性也越高，但是性能越低。</p>
</div>
</div></template>



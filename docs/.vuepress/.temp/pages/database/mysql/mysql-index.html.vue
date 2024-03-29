<template><div><h1 id="mysql进阶-索引" tabindex="-1"><a class="header-anchor" href="#mysql进阶-索引" aria-hidden="true">#</a> MySQL进阶 - 索引</h1>
<h2 id="索引概述" tabindex="-1"><a class="header-anchor" href="#索引概述" aria-hidden="true">#</a> 索引概述</h2>
<h3 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h3>
<p>索引是帮助MySQL<font color="blue">高效获取数据</font>的<code v-pre>数据结构</code>（有序）。在数据之外，数据库系统还维护着满足特定查找算法的数据结构，这些数据结构以某种方式饮用（指向）数据，这样就可以在这些数据结构上实现高级查找算法，这种数据结构就是索引。</p>
<h3 id="优缺点" tabindex="-1"><a class="header-anchor" href="#优缺点" aria-hidden="true">#</a> 优缺点</h3>
<ul>
<li>优点</li>
</ul>
<ol>
<li>提高数据检索的效率，降低数据库的IO成本</li>
<li>通过索引列对数据进行排序，降低数据排序的成本，降低CPU的消耗</li>
</ol>
<ul>
<li>缺点</li>
</ul>
<ol>
<li>索引列也是要占用空间的</li>
<li>索引大大提高了查询效率，同时却也降低更新表的速度，如对表进行INSERT、UPDATE、DELETE时，效率降低。</li>
</ol>
<div class="hint-container tip">
<p class="hint-container-title">注意</p>
<p>索引是一种典型的使用空间换时间的例子。</p>
</div>
<h2 id="索引结构" tabindex="-1"><a class="header-anchor" href="#索引结构" aria-hidden="true">#</a> 索引结构</h2>
<p>MySQL的索引是在存储引擎层实现的，不同的存储引擎有不同的结构，主要包含以下几种：</p>
<table>
<thead>
<tr>
<th style="text-align:center">索引结构</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><font color="red">B+Tree索引</font></td>
<td style="text-align:center"><font color="red">最常见的索引结构，大部分索引都支持B+树索引</font></td>
</tr>
<tr>
<td style="text-align:center">Hash索引</td>
<td style="text-align:center">底层数据结构是用哈希表实现的，只有精确匹配索引列的查询才有效，不支持范围查询</td>
</tr>
<tr>
<td style="text-align:center">R-tree<Badge text="空间索引" type="danger" /></td>
<td style="text-align:center">空间索引是MyISAM引擎的一个特殊索引，主要用于地理空间数据类型，通常使用较少</td>
</tr>
<tr>
<td style="text-align:center">Full-text<Badge text="全文索引" type="danger" /></td>
<td style="text-align:center">是一种通过建立倒排索引，快速匹配文档的方式，类似于Lucene,Solr,Es</td>
</tr>
</tbody>
</table>
<h3 id="二叉树" tabindex="-1"><a class="header-anchor" href="#二叉树" aria-hidden="true">#</a> 二叉树</h3>
<figure><img src="@source/../assets/mysql-index/2023-04-10-22-50-55.png" alt="二叉树" tabindex="0" loading="lazy"><figcaption>二叉树</figcaption></figure>
<div class="hint-container warning">
<p class="hint-container-title">缺点</p>
<p>使用二叉树做索引结构，顺序插入时，会退化成为一个链表，查询性能大大降低。大量数据的情况下，层级较深，检索速度慢。</p>
</div>
<h3 id="红黑树" tabindex="-1"><a class="header-anchor" href="#红黑树" aria-hidden="true">#</a> 红黑树</h3>
<figure><img src="@source/../assets/mysql-index/2023-04-10-22-55-17.png" alt="红黑树" tabindex="0" loading="lazy"><figcaption>红黑树</figcaption></figure>
<div class="hint-container warning">
<p class="hint-container-title">缺点</p>
<p>红黑树虽然解决了退化为单链表的这种现象，但是其本质上仍然是二叉树，在大量数据的情况下，层级较深，检索速度还是很慢。</p>
</div>
<h3 id="b树" tabindex="-1"><a class="header-anchor" href="#b树" aria-hidden="true">#</a> B树</h3>
<p>B树(B-Tree)又称为多路平衡查找树，一般是以阶树来衡量B树，以其最大度数作为B树的阶数，一棵n阶B树的节点最多能存储n-1个数据，n个指针。</p>
<figure><img src="@source/../assets/mysql-index/2023-04-10-23-09-07.png" alt="B树" tabindex="0" loading="lazy"><figcaption>B树</figcaption></figure>
<div class="hint-container tip">
<p class="hint-container-title">小知识</p>
<p>树的度数指的是一个节点的子节点个数。</p>
</div>
<p>B树随着数据的插入或者删除会自动进行节点的裂变和合并，这里的具体细节可以去学习数据结构中的B树。</p>
<div class="hint-container info">
<p class="hint-container-title">B树知识点</p>
<p>// todo 待更新<br>
<a href="https://www.codermast.com" target="_blank" rel="noopener noreferrer">B树<ExternalLinkIcon/></a></p>
</div>
<h3 id="b-树" tabindex="-1"><a class="header-anchor" href="#b-树" aria-hidden="true">#</a> B+树</h3>
<p>B+树是B树的一个变种，基本的结构和节点的变化规律不变，仅在非叶子结点中存储索引，在叶子结点中存储数据。并且在叶子结点中，相邻的叶子结点会有一个单向的指针连接，形成一个单向链表。</p>
<figure><img src="@source/../assets/mysql-index/2023-04-10-23-16-28.png" alt="B+树" tabindex="0" loading="lazy"><figcaption>B+树</figcaption></figure>
<h3 id="优化的b-树" tabindex="-1"><a class="header-anchor" href="#优化的b-树" aria-hidden="true">#</a> 优化的B+树</h3>
<p>MySQL索引数据结构对经典的B+Tree进行了优化。在原B+Tree的基础上增加了一个指向相邻叶子结点的链表指针，就形成了带有顺序指针的B+Tree，提高区间访问的性能。</p>
<figure><img src="@source/../assets/mysql-index/2023-04-10-23-21-08.png" alt="MySQL优化的B+树" tabindex="0" loading="lazy"><figcaption>MySQL优化的B+树</figcaption></figure>
<h3 id="hash" tabindex="-1"><a class="header-anchor" href="#hash" aria-hidden="true">#</a> Hash</h3>
<p>哈希索引就是采用一定的Hash算法，将键值换算成新的hash值，映射到对应的槽位上，然后存储在hash表中。</p>
<p>是哈希结构，那么就不可避免的会出现哈希碰撞（哈希冲突），即多个键值对映射到了同一个槽位上，此时就产生了哈希碰撞，可以通过构建链表来解决。</p>
<div class="hint-container tip">
<p class="hint-container-title">知识点</p>
<p>解决哈希碰撞的方法有很多，如：拉链法、开放寻址法、再哈希法、建立公共溢出区等方法进行解决。</p>
</div>
<p>哈希索引的特点：</p>
<ol>
<li>hash索引只能用于对等比较（== ， in） ，不支持范围查找(between , &gt; , &lt; , ...)</li>
<li>无法利用索引完成排序操作。</li>
<li>查询效率高，通常只需要一次检索就可以了，效率通常要高于B+Tree索引。</li>
</ol>
<div class="hint-container note">
<p class="hint-container-title">存储引擎支持</p>
<p>在MySQL中，支持hash索引的是Memory引擎，而InnoDB中具有自适应hash功能，hash索引是存储引擎根据B+Tree索引在指定条件下自动构建的。其他引擎不支持。</p>
<p>自适应hash就是InnoDB存储引擎根据我们的查询条件，在指定的条件下会自动的将B+树索引构建成hash索引。</p>
</div>
<h3 id="思考" tabindex="-1"><a class="header-anchor" href="#思考" aria-hidden="true">#</a> 思考</h3>
<div class="hint-container warning">
<p class="hint-container-title">思考题</p>
<p>为什么InnoDB存储引擎选择使用B+树索引结构？</p>
</div>
<ul>
<li>相对于二叉树，在相同数据规模的情况下，B+树具有更少的层级，查询速度更快</li>
<li>对于B树，无论是叶子结点还是非叶子结点，都会保存数据，这样导致一页中存储的键值减少，指针跟着减少，要保存大量数据，只能增加树的高度，导致性能降低。</li>
<li>对于Hash索引，B+树支持范围匹配和排序操作。</li>
</ul>
<h3 id="存储引擎支持" tabindex="-1"><a class="header-anchor" href="#存储引擎支持" aria-hidden="true">#</a> 存储引擎支持</h3>
<table>
<thead>
<tr>
<th style="text-align:center">索引</th>
<th style="text-align:center">InnoDB</th>
<th style="text-align:center">MyISAM</th>
<th style="text-align:center">Memory</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">B+Tree索引</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">✅</td>
</tr>
<tr>
<td style="text-align:center">Hash索引</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">✅</td>
</tr>
<tr>
<td style="text-align:center">R-Tree索引</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">❌</td>
</tr>
<tr>
<td style="text-align:center">Full-text索引</td>
<td style="text-align:center">5.6版本以后✅</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">❌</td>
</tr>
</tbody>
</table>
<h2 id="索引分类" tabindex="-1"><a class="header-anchor" href="#索引分类" aria-hidden="true">#</a> 索引分类</h2>
<p>索引主要分为4个类型：主键索引、唯一索引、常规索引、全文索引</p>
<table>
<thead>
<tr>
<th style="text-align:center">分类</th>
<th style="text-align:center">含义</th>
<th style="text-align:center">特点</th>
<th style="text-align:center">关键字</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">主键索引</td>
<td style="text-align:center">针对于表中主键创建的索引</td>
<td style="text-align:center">默认自动创建，只能有一个</td>
<td style="text-align:center">PRIMARY</td>
</tr>
<tr>
<td style="text-align:center">唯一索引</td>
<td style="text-align:center">避免同一个表中某数据列中的值重复</td>
<td style="text-align:center">可以有多个</td>
<td style="text-align:center">UNIQUE</td>
</tr>
<tr>
<td style="text-align:center">常规索引</td>
<td style="text-align:center">快速定位特定数据</td>
<td style="text-align:center">可以有多个</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">全文索引</td>
<td style="text-align:center">全文索引查找的是文本中的关键词，而不是比较索引中的值</td>
<td style="text-align:center">可以有多个</td>
<td style="text-align:center">FULLTEXT</td>
</tr>
</tbody>
</table>
<p>在InnoDB存储引擎中，根据索引的存储形式，又可以分为以下两种：</p>
<table>
<thead>
<tr>
<th style="text-align:center">分类</th>
<th style="text-align:center">含义</th>
<th style="text-align:center">特点</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">聚集索引<Badge text="Clustered Index" type="danger" /></td>
<td style="text-align:center">将数据和索引的存储放到了一块，索引结构的叶子结点保存了行数据</td>
<td style="text-align:center">必须有，而且只能有一个</td>
</tr>
<tr>
<td style="text-align:center">二级索引<Badge text="Secoundary Index" type="danger" /></td>
<td style="text-align:center">将数据和索引分开存储，索引结构的叶子结点关联的是对应的主键</td>
<td style="text-align:center">可以存在多个</td>
</tr>
</tbody>
</table>
<p>聚集索引的选取规则：</p>
<ol>
<li>如果存在主键，主键索引就是聚集索引</li>
<li>如果不存在主键，将使用第一个唯一UNIQUE索引作为聚集索引。</li>
<li>如果没有主键，也没有合适的唯一索引，那么InnoDB引擎就会生成一个rowid作为隐藏的聚集索引。</li>
</ol>
<h3 id="回表查询" tabindex="-1"><a class="header-anchor" href="#回表查询" aria-hidden="true">#</a> 回表查询</h3>
<figure><img src="@source/../assets/mysql-index/2023-04-11-00-05-50.png" alt="回表查询" tabindex="0" loading="lazy"><figcaption>回表查询</figcaption></figure>
<p>我们在对数据的查询时，通常会给定查询条件，而当我们的查询条件并不是聚集索引中的值，而是二级索引中的值，这时候的查询过程为：</p>
<ol>
<li>先通过筛选条件在二级索引中查找对应的记录值，找到记录值的id；</li>
<li>使用记录值的id再在聚集索引中查询，得到数据的记录值。</li>
</ol>
<p>这个过程我们就叫做回表查询，虽然只执行了一条查询语句，但是实际的底层在B+树内查询了两次。</p>
<h3 id="思考题" tabindex="-1"><a class="header-anchor" href="#思考题" aria-hidden="true">#</a> 思考题</h3>
<ol>
<li>以下SQL语句中，那个执行效率更高？为什么？</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token keyword">user</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>

<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token keyword">user</span> <span class="token keyword">where</span> name <span class="token operator">=</span> <span class="token string">'Mast'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>备注：id为主键，name字段创建的有索引。</p>
<div class="hint-container tip">
<p class="hint-container-title">答案</p>
<p>第一条SQL使用id查询的效率更高，因为id是主键，而主键会建立聚集索引，聚集索引中查询直接就能够得到数据的记录值。而使用name字段查询，虽然建立有索引，但是其为二级索引，查询后的值为该字段对应的id值，此时还需要通过id值在聚集索引中查询，有回表查询，查询了两次B+树，而第一条SQL只查询了一次B+树。</p>
</div>
<ol start="2">
<li>InnoDB主键索引的B+Tree高度为多高呢？</li>
</ol>
<div class="hint-container tip">
<p class="hint-container-title">答案</p>
<ul>
<li>
<p>假设：<br>
一行数据大小为1K=1024B=1024字节，一页中能存储16行这样的数据，InnoDB的指针占用6个字节的空间，主键即使为bigint，占用8个字节。</p>
</li>
<li>
<p>高度为2时：<br>
n * 8 + (n + 1) * 6 = 16 * 1024<br>
解得：n = 1170</p>
<p>所以一共能存储 1171 * 16 = 18736 个数据</p>
</li>
<li>
<p>高度为3时：<br>
1171 * 1171 * 16 = 21939856 个数据</p>
</li>
</ul>
</div>
<h2 id="索引语法" tabindex="-1"><a class="header-anchor" href="#索引语法" aria-hidden="true">#</a> 索引语法</h2>
<ul>
<li>创建索引</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token punctuation">[</span><span class="token keyword">UNIQUE</span> <span class="token operator">|</span> FULLTEXT<span class="token punctuation">]</span> <span class="token keyword">INDEX</span> index_name <span class="token keyword">ON</span> table_name<span class="token punctuation">(</span>index_col_name<span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>在表 table_name 中创建名为index_name 的索引。</p>
</blockquote>
<div class="hint-container note">
<p class="hint-container-title">注意</p>
<p>[UNIQUE | FULLTEXT]是可选项，分别为创建唯一索引和全文索引，如果都不选的话，则创建的是常规索引。一个索引可以关联多个字段。</p>
</div>
<p>根据索引关联字段的个数，可以讲索引分为两种类型：</p>
<ol>
<li>单列索引：索引列表只有一个字段。</li>
<li>联合索引：又叫组合索引，即索引列表有多个字段。</li>
</ol>
<ul>
<li>查看索引</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SHOW</span> <span class="token keyword">INDEX</span> <span class="token keyword">FROM</span> table_name<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>查看指定表的索引。</p>
</blockquote>
<ul>
<li>删除索引</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">INDEX</span> index_name <span class="token keyword">ON</span> table_name<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>删除表 table_name 名为 index_name 的索引。</p>
</blockquote>
<h2 id="索引使用" tabindex="-1"><a class="header-anchor" href="#索引使用" aria-hidden="true">#</a> 索引使用</h2>
<h3 id="索引失效场景" tabindex="-1"><a class="header-anchor" href="#索引失效场景" aria-hidden="true">#</a> 索引失效场景</h3>
<ul>
<li>最左前缀法则<br>
如果索引了多列（联合索引），要遵守最左前缀法则，最左前缀法则指的是查询从索引的最左列开始，并且不跳过索引中的列。如果跳跃某一列，索引将部分失效（后面的字段索引失效）。</li>
</ul>
<blockquote>
<p>举个简单的例子，如为 mail(5)、tel(6)、username(7)三个字段建立联合索引，括号内为长度，则在使用的时候根据 mail -&gt; tel -&gt; username 这个顺序来判断是否走索引。</p>
<ol>
<li>查询条件的顺序为：mail - tel - username，则走索引，长度为 5 + 6 + 7 = 18</li>
<li>查询条件的顺序为：mail - username - tel，则走索引，但长度为 5</li>
<li>查询条件的顺序为：tel - username - mail，则不走索引，长度为NULL<br>
......以此类推，满足最左前缀法则，哪里不满足，则从哪里断开，可以根据索引长度来判断</li>
</ol>
</blockquote>
<ul>
<li>
<p>范围查询<br>
联合索引中，出现范围查（<code v-pre>&gt;</code> ，<code v-pre>&lt;</code>），范围查询右侧的列索引失效。</p>
</li>
<li>
<p>索引列运算<br>
不要在索引列上进行运算操作，索引将失效。</p>
</li>
<li>
<p>字符串类型不加引号<br>
在字符串类型字段上使用时，不加引号，索引将失效。</p>
</li>
<li>
<p>模糊查询<br>
如果仅仅是尾部模糊匹配，索引不会失效。如果是开头模糊匹配，则索引失效。</p>
</li>
<li>
<p>or连接的条件<br>
用or分割开的条件，如果or前的条件中的列有索引，而后面的列中没有索引，那么涉及的索引都不会被使用到。</p>
</li>
<li>
<p>数据分布影响<br>
如果MySQL评估使用索引比全表更慢，则不会使用索引。</p>
</li>
</ul>
<h3 id="sql提示" tabindex="-1"><a class="header-anchor" href="#sql提示" aria-hidden="true">#</a> SQL提示</h3>
<p>SQL提示，是优化数据库的一个重要手段，简单来说，就是在SQL语句中加入一些人为的提示来达到优化的目的。</p>
<ul>
<li>use index 建议使用索引</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">use</span> <span class="token keyword">index</span><span class="token punctuation">(</span>idx_user_pro<span class="token punctuation">)</span> <span class="token keyword">where</span> profession <span class="token operator">=</span> <span class="token string">'软件工程'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>ignore index 忽略索引</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">ignore</span> <span class="token keyword">index</span><span class="token punctuation">(</span>idx_user_pro<span class="token punctuation">)</span> <span class="token keyword">where</span> profession <span class="token operator">=</span> <span class="token string">'软件工程'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>force index 强制索引</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">force</span> <span class="token keyword">index</span><span class="token punctuation">(</span>idx_user_pro<span class="token punctuation">)</span> <span class="token keyword">where</span> profession <span class="token operator">=</span> <span class="token string">'软件工程'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="覆盖索引" tabindex="-1"><a class="header-anchor" href="#覆盖索引" aria-hidden="true">#</a> 覆盖索引</h3>
<p>尽量使用覆盖索引（查询使用了索引，并且需要返回的列，在该索引中已经全部能够找到），减少select *</p>
<blockquote>
<p>即尽量保证所需要的数据在使用索引内包含，保证所需要的所有数据都能够通过索引查询到。即保证返回的字段，能通过索引直接查到，不回表查询。</p>
</blockquote>
<div class="hint-container tip">
<p class="hint-container-title">小贴士</p>
<p>using index condition:查找使用了索引，但是需要回表查询数据。</p>
<p>using where;using index：查找使用了索引，但是需要的数据都在索引列中能找到，所以不需要回表查询数据。</p>
</div>
<h3 id="前缀索引" tabindex="-1"><a class="header-anchor" href="#前缀索引" aria-hidden="true">#</a> 前缀索引</h3>
<p>当字段类型为字符串（varchar，text等）时，有时候需要索引很长的字符串，这会让索引变得很大，查询时，浪费大量的磁盘IO，影响查询效率。此时可以只将字符串的一部分前缀，建立索引，这样可以大大节约索引空间，从而提高索引效率。</p>
<ul>
<li>语法</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">index</span> idx_xxxx <span class="token keyword">on</span> table_name<span class="token punctuation">(</span><span class="token keyword">column</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>前缀长度<br>
可以根据索引的选择性来决定，而选择性是指不重复的索引值(基数)和数据表的记录总数的比值，索引选择性越高则查询效率越高，唯一索引的选择性是1，这是最好的索引选择性，性能也是最好的。</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token keyword">distinct</span> email<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">from</span> tb_user<span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span>distanct substring<span class="token punctuation">(</span><span class="token punctuation">(</span>email<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">from</span> tb_user<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="单列-联合索引" tabindex="-1"><a class="header-anchor" href="#单列-联合索引" aria-hidden="true">#</a> 单列/联合索引</h3>
<ul>
<li>单列索引：即一个索引值包含了单个列</li>
<li>联合索引：即一个索引值包含了多个列<br>
在业务场景中，如果存在多个查询条件，考虑针对于查询字段建立索引时，建议建立联合索引，而非单列索引。</li>
</ul>
<div class="hint-container info">
<p class="hint-container-title">小知识</p>
<p>有时候即便我们创建了联合索引，MySQL也不一定就会使用，在多联合查询时，MySQL优化器会评估哪个字段的索引效率更高，会选择该索引完成本次查询。</p>
</div>
<h2 id="索引设计原则" tabindex="-1"><a class="header-anchor" href="#索引设计原则" aria-hidden="true">#</a> 索引设计原则</h2>
<ol>
<li>针对于数据量较大，且查询比较频繁的表建立索引。</li>
<li>针对于常作为查询条件（where）、排序（order by）、分组（group by）操作的字段建立索引。</li>
<li>尽量选择区分度较高的列作为索引，尽量建立唯一索引，区分度越高，使用索引的效率越高。</li>
<li>如果是字符串类型和字段，字段的长度较长，可以针对于字段的特点，建立前缀索引。</li>
<li>尽量使用联合索引，减少单列索引，查询时，联合索引很多时候可以覆盖索引，节省存储空间，避免回表，提高查询效率。</li>
<li>要控制索引的数量，索引并不是多多益善，索引越多，维护索引结构的代价也就越大，会影响增删改茶的效率。</li>
<li>如果索引列不能存储NULL值，请在创建表时使用NOT NULL约束它。当优化器知道每列是否包含NULL值时，它可以更好地确定哪个索引更有效地用于查询。</li>
</ol>
</div></template>



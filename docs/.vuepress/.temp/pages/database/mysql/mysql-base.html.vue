<template><div><h1 id="mysql基础-基础概念" tabindex="-1"><a class="header-anchor" href="#mysql基础-基础概念" aria-hidden="true">#</a> MySQL基础 - 基础概念</h1>
<h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h2>
<div class="hint-container info">
<p class="hint-container-title">区别</p>
<p>在学习MySQL之前，我们需要明确一些基本概念，以便于后续的理解和学习。</p>
</div>
<ul>
<li>数据库</li>
</ul>
<p>数据库是存储数据的仓库，数据是有组织的进行存储。简写为DataBase （DB）</p>
<ul>
<li>数据库管理系统</li>
</ul>
<p>操纵和管理数据库的大型软件系统。简写为DataBase Management System （DBMS）</p>
<ul>
<li>SQL</li>
</ul>
<p>操作关系型数据库的编程语言，定义了一套操作关系型数据库的统一标准。又叫架构话查询语言，Structured Query Language（SQL）</p>
<ul>
<li>MySQL</li>
</ul>
<p>由瑞典MySQL AB公司开发的一款关系型数据库管理系统（Relational DataBase Management System RDBMS），属于Oracle旗下。</p>
<h2 id="mysql的安装" tabindex="-1"><a class="header-anchor" href="#mysql的安装" aria-hidden="true">#</a> MySQL的安装</h2>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>直接在MySQL官方网站，根据自己的操作系统下载安装即可。</p>
</div>
<p><a href="https://www.mysql.com/downloads/" target="_blank" rel="noopener noreferrer">MySQL官方下载地址：https://www.mysql.com/downloads/<ExternalLinkIcon/></a></p>
<h2 id="mysql版本" tabindex="-1"><a class="header-anchor" href="#mysql版本" aria-hidden="true">#</a> MySQL版本</h2>
<ul>
<li>
<p>社区版 MySQL Community Server</p>
<ul>
<li>免费</li>
<li>不提供技术支持</li>
</ul>
</li>
<li>
<p>商业版 MySQL Enterprise Edition</p>
<ul>
<li>收费</li>
<li>提供专业技术支持</li>
</ul>
</li>
</ul>
<h2 id="数据库类型" tabindex="-1"><a class="header-anchor" href="#数据库类型" aria-hidden="true">#</a> 数据库类型</h2>
<h3 id="关系型数据库" tabindex="-1"><a class="header-anchor" href="#关系型数据库" aria-hidden="true">#</a> 关系型数据库</h3>
<p>建立在关系模型基础上，由多张相互连接的二维表组成的数据库。</p>
<div class="hint-container info">
<p class="hint-container-title">特点</p>
<ol>
<li>使用表存储数据，格式统一，便于维护</li>
<li>使用SQL语言操作，标准统一，使用方便。</li>
</ol>
</div>
<h3 id="非关系型数据库" tabindex="-1"><a class="header-anchor" href="#非关系型数据库" aria-hidden="true">#</a> 非关系型数据库</h3>
<p>分布式的、非关系型的、不保证遵循ACID原则的数据存储系统。最常见的解释就是NoSQL，non-relational或者Not only SQL。非关系型可以分为以下几种类型：</p>
<ul>
<li>键值(Key-Value)存储数据库</li>
</ul>
<div class="hint-container note">
<p class="hint-container-title">注</p>
<p>主要有：Tokyo Cabinet/Tyrant， Redis， Voldemort， Oracle BDB</p>
</div>
<ul>
<li>列存储数据库</li>
</ul>
<div class="hint-container note">
<p class="hint-container-title">注</p>
<p>主要有：Cassandra， HBase， Riak</p>
</div>
<ul>
<li>文档型数据库</li>
</ul>
<div class="hint-container note">
<p class="hint-container-title">注</p>
<p>主要有：CouchDB， MongoDb</p>
</div>
<ul>
<li>图形(Graph)数据库</li>
</ul>
<div class="hint-container note">
<p class="hint-container-title">注</p>
<p>主要有：Neo4J， InfoGrid， Infinite Graph</p>
</div>
<h2 id="mysql数据模型" tabindex="-1"><a class="header-anchor" href="#mysql数据模型" aria-hidden="true">#</a> MySQL数据模型</h2>
<figure><img src="@source/../assets/mysql-base/2023-04-08-23-50-11.png" alt="MySQL数据模型" tabindex="0" loading="lazy"><figcaption>MySQL数据模型</figcaption></figure>
</div></template>



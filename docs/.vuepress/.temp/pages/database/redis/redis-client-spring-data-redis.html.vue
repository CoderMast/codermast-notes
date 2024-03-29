<template><div><h1 id="redis客户端-springdataredis" tabindex="-1"><a class="header-anchor" href="#redis客户端-springdataredis" aria-hidden="true">#</a> Redis客户端 - SpringDataRedis</h1>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>SpringData 是 Spring 中操作数据的模块，包含对各种数据库的集成，其中对 Redis 的集成模块就叫做 SpringDataRedis，官网地址：<a href="https://spring.io/prohects/spring-data-redis" target="_blank" rel="noopener noreferrer">https://spring.io/prohects/spring-data-redis<ExternalLinkIcon/></a></p>
<ul>
<li>提供了对不同 Redis 客户端的整合 （Lettuce 和 Jedis）</li>
<li>提供了 RedisTemplate 统一 API 来操作Redis</li>
<li>支持 Redis 的发布订阅模型</li>
<li>支持 Redis 哨兵和 Redis 集群</li>
<li>支持基于 Lettuce 的响应式编程</li>
<li>支持基于 JDK、JSON、字符串、Spring对象的数据序列化和反序列化</li>
<li>支持基于 Redis 的 JDKCollection 实现</li>
</ul>
<h2 id="操作api" tabindex="-1"><a class="header-anchor" href="#操作api" aria-hidden="true">#</a> 操作API</h2>
<p>SpringDataRedis 中提供了 RedisTemplate 工具类，其中封装了各种对 Redis 的操作。并且将不同数据类型的操作API封装到了不同的类型中：</p>
<table>
<thead>
<tr>
<th style="text-align:center">API</th>
<th style="text-align:center">返回值类型</th>
<th style="text-align:center">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code v-pre>redisTemplate.opsForValue()</code></td>
<td style="text-align:center"><code v-pre>ValueOperations</code></td>
<td style="text-align:center">操作<code v-pre>String</code>类型数据</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>redisTemplate.opsForHash()</code></td>
<td style="text-align:center"><code v-pre>HashOperations</code></td>
<td style="text-align:center">操作<code v-pre>Hash</code>类型数据</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>redisTemplate.opsForList()</code></td>
<td style="text-align:center"><code v-pre>ListOperations</code></td>
<td style="text-align:center">操作<code v-pre>List</code>类型数据</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>redisTemplate.opsForSet()</code></td>
<td style="text-align:center"><code v-pre>SetOperations</code></td>
<td style="text-align:center">操作<code v-pre>Set</code>类型数据</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>redisTemplate.opsForZSet()</code></td>
<td style="text-align:center"><code v-pre>ZSetOperations</code></td>
<td style="text-align:center">操作<code v-pre>SortedSet</code>类型数据</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>redisTemplate</code></td>
<td style="text-align:center"></td>
<td style="text-align:center">通用命令</td>
</tr>
</tbody>
</table>
<div class="hint-container tip">
<p class="hint-container-title">使用说明</p>
<p>我们在操作对应的 Redis 数据时，根据数据类型的不同获取对应的操作对象，如操作 String 类型时，则调用 <code v-pre>redisTemplate.opsForValue()</code> 方法，获取一个 <code v-pre>ValueOperations</code> 对象，来操作 <code v-pre>String</code> 类型的数据。</p>
</div>
<h2 id="spring-boot-中使用" tabindex="-1"><a class="header-anchor" href="#spring-boot-中使用" aria-hidden="true">#</a> Spring Boot 中使用</h2>
<ol>
<li>引入依赖</li>
</ol>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--Redis依赖--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!--连接池依赖--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>commons-pool2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>配置文件</li>
</ol>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span> <span class="token punctuation">:</span>
  <span class="token key atrule">redis</span> <span class="token punctuation">:</span>
      <span class="token key atrule">host</span> <span class="token punctuation">:</span> 192.168.100.100
      <span class="token key atrule">port</span> <span class="token punctuation">:</span> <span class="token number">6379</span>
      <span class="token key atrule">password</span> <span class="token punctuation">:</span> codermast
      <span class="token key atrule">lettuce</span> <span class="token punctuation">:</span> 
        <span class="token key atrule">pool</span> <span class="token punctuation">:</span> 
          <span class="token key atrule">max-active</span> <span class="token punctuation">:</span> <span class="token number">8</span> <span class="token comment"># 最大的连接数</span>
          <span class="token key atrule">max-idle</span> <span class="token punctuation">:</span> <span class="token number">8</span>   <span class="token comment"># 最大空闲连接</span>
          <span class="token key atrule">min-idle</span> <span class="token punctuation">:</span> <span class="token number">0</span>   <span class="token comment"># 最小空闲连接</span>
          <span class="token key atrule">max-wait</span> <span class="token punctuation">:</span> <span class="token number">100</span> <span class="token comment"># 连接等待时间</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>获取 RedisTemplate 对象</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">RedisTemplate</span> redisTemplate<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>在 Spring Boot 框架中，使用自动注入获取对象</p>
</blockquote>
<ol start="4">
<li>编写测试类</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RedisTemplate</span> redisTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">testString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 插入一条 String 类型的数据</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span><span class="token string">"codermast"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 获取一条 String 类型的数据</span>
        <span class="token class-name">Object</span> name <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"我的名字是："</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>运行查看结果</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>我的名字是：codermast
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>



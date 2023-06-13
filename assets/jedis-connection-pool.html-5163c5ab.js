const s=JSON.parse('{"key":"v-6edf7d37","path":"/database/redis/base/jedis-connection-pool.html","title":"Redis客户端 - Jedis连接池","lang":"zh-CN","frontmatter":{"order":10,"description":"Redis客户端 - Jedis连接池 Jedis本身是线程不安全的，并且频繁的创建和销毁连接会有性能损耗，因此我们使用Jedis连接池代替Jedis的直接连接方式。 配置Jedis连接池 public class JedisConnectionFactory{ private static final JedisPool jedisPool; static { JedisPoolConfig jedisPollConfig = new JedisPoolConfig(); // 最大连接，这里设置为 8 jedisPollConfig.setMaxTotal(8); // 最大空闲连接，这里设置为 8 jedisPollConfig.setMaxIdle(8); // 最小空闲连接，这里设置为 0 jedisPollConfig.setMaxIdle(0); // 设置最长等待时间，单位 ms jedisPollConfig.setMaxWaitMillis(200); jedisPool = new JedisPool(jedisPoolConfig,\\"192.168.100.100\\",6379,1000,\\"codermast\\"); } // 获取Jedis对象 public static Jedis getJedis(){ return jedisPool.getResource(); } }","head":[["meta",{"property":"og:url","content":"https://www.codermast.com/database/redis/base/jedis-connection-pool.html"}],["meta",{"property":"og:site_name","content":"CoderMast编程桅杆"}],["meta",{"property":"og:title","content":"Redis客户端 - Jedis连接池"}],["meta",{"property":"og:description","content":"Redis客户端 - Jedis连接池 Jedis本身是线程不安全的，并且频繁的创建和销毁连接会有性能损耗，因此我们使用Jedis连接池代替Jedis的直接连接方式。 配置Jedis连接池 public class JedisConnectionFactory{ private static final JedisPool jedisPool; static { JedisPoolConfig jedisPollConfig = new JedisPoolConfig(); // 最大连接，这里设置为 8 jedisPollConfig.setMaxTotal(8); // 最大空闲连接，这里设置为 8 jedisPollConfig.setMaxIdle(8); // 最小空闲连接，这里设置为 0 jedisPollConfig.setMaxIdle(0); // 设置最长等待时间，单位 ms jedisPollConfig.setMaxWaitMillis(200); jedisPool = new JedisPool(jedisPoolConfig,\\"192.168.100.100\\",6379,1000,\\"codermast\\"); } // 获取Jedis对象 public static Jedis getJedis(){ return jedisPool.getResource(); } }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-17T14:42:27.000Z"}],["meta",{"property":"article:author","content":"CoderMast"}],["meta",{"property":"article:modified_time","content":"2023-05-17T14:42:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis客户端 - Jedis连接池\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-17T14:42:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"CoderMast\\",\\"url\\":\\"https://www.codermast.com\\",\\"email\\":\\"codermast@qq.com\\"}]}"]]},"headers":[],"git":{"createdTime":1684256973000,"updatedTime":1684334547000,"contributors":[{"name":"codermast","email":"codermast@qq.com","commits":2}]},"readingTime":{"minutes":0.78,"words":234},"filePathRelative":"database/redis/base/jedis-connection-pool.md","localizedDate":"2023年5月16日","excerpt":"<h1> Redis客户端 - Jedis连接池</h1>\\n<p>Jedis本身是线程不安全的，并且频繁的创建和销毁连接会有性能损耗，因此我们使用Jedis连接池代替Jedis的直接连接方式。</p>\\n<ul>\\n<li>配置Jedis连接池</li>\\n</ul>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">JedisConnectionFactory</span><span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">JedisPool</span> jedisPool<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">static</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token class-name\\">JedisPoolConfig</span> jedisPollConfig <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">JedisPoolConfig</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n        <span class=\\"token comment\\">// 最大连接，这里设置为 8</span>\\n        jedisPollConfig<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">setMaxTotal</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">8</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token comment\\">// 最大空闲连接，这里设置为 8</span>\\n        jedisPollConfig<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">setMaxIdle</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">8</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token comment\\">// 最小空闲连接，这里设置为 0 </span>\\n        jedisPollConfig<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">setMaxIdle</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token comment\\">// 设置最长等待时间，单位 ms</span>\\n        jedisPollConfig<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">setMaxWaitMillis</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">200</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n        jedisPool <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">JedisPool</span><span class=\\"token punctuation\\">(</span>jedisPoolConfig<span class=\\"token punctuation\\">,</span><span class=\\"token string\\">\\"192.168.100.100\\"</span><span class=\\"token punctuation\\">,</span><span class=\\"token number\\">6379</span><span class=\\"token punctuation\\">,</span><span class=\\"token number\\">1000</span><span class=\\"token punctuation\\">,</span><span class=\\"token string\\">\\"codermast\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token comment\\">// 获取Jedis对象</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token class-name\\">Jedis</span> <span class=\\"token function\\">getJedis</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> jedisPool<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getResource</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{s as data};

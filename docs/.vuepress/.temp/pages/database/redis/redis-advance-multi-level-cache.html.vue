<template><div><h1 id="redis进阶-多级缓存" tabindex="-1"><a class="header-anchor" href="#redis进阶-多级缓存" aria-hidden="true">#</a> Redis进阶 - 多级缓存</h1>
<h2 id="安装openresty" tabindex="-1"><a class="header-anchor" href="#安装openresty" aria-hidden="true">#</a> 安装OpenResty</h2>
<p>在正式安装 OpenResty 之前，我们需要了解它是干什么的。</p>
<p>OpenResty® 是一个基于 Nginx 与 Lua 的高性能 Web 平台，其内部集成了大量精良的 Lua 库、第三方模块以及大多数的依赖项。用于方便地搭建能够处理超高并发、扩展性极高的动态 Web 应用、Web 服务和动态网关。</p>
<p>OpenResty® 通过汇聚各种设计精良的 Nginx 模块（主要由 OpenResty 团队自主开发），从而将 Nginx 有效地变成一个强大的通用 Web 应用平台。这样，Web 开发人员和系统工程师可以使用 Lua 脚本语言调动 Nginx 支持的各种 C 以及 Lua 模块，快速构造出足以胜任 10K 乃至 1000K 以上单机并发连接的高性能 Web 应用系统。</p>
<p>OpenResty® 的目标是让你的Web服务直接跑在 Nginx 服务内部，充分利用 Nginx 的非阻塞 I/O 模型，不仅仅对 HTTP 客户端请求,甚至于对远程后端诸如 MySQL、PostgreSQL、Memcached 以及 Redis 等都进行一致的高性能响应。</p>
<p>OpenResty官网：<a href="https://openresty.org/cn/" target="_blank" rel="noopener noreferrer">https://openresty.org/cn/<ExternalLinkIcon/></a></p>
<h3 id="_1-安装" tabindex="-1"><a class="header-anchor" href="#_1-安装" aria-hidden="true">#</a> 1.安装</h3>
<p>首先你的Linux虚拟机必须联网</p>
<ol>
<li><strong>安装开发库</strong></li>
</ol>
<p>首先要安装OpenResty的依赖开发库，执行命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> pcre-devel openssl-devel gcc --skip-broken
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li><strong>安装OpenResty仓库</strong></li>
</ol>
<p>你可以在你的 CentOS 系统中添加 <code v-pre>openresty</code> 仓库，这样就可以便于未来安装或更新我们的软件包（通过 <code v-pre>yum check-update</code> 命令）。运行下面的命令就可以添加我们的仓库：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum-config-manager --add-repo https://openresty.org/package/centos/openresty.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果提示说命令不存在，则运行：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后再重复上面的命令</p>
<ol start="3">
<li><strong>安装OpenResty</strong></li>
</ol>
<p>然后就可以像下面这样安装软件包，比如 <code v-pre>openresty</code>：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> openresty
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4">
<li><strong>安装opm工具</strong></li>
</ol>
<p>opm是OpenResty的一个管理工具，可以帮助我们安装一个第三方的Lua模块。</p>
<p>如果你想安装命令行工具 <code v-pre>opm</code>，那么可以像下面这样安装 <code v-pre>openresty-opm</code> 包：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> openresty-opm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5">
<li><strong>目录结构</strong></li>
</ol>
<p>默认情况下，OpenResty安装的目录是：/usr/local/openresty</p>
<figure><img src="@source/../assets/redis-advance-multi-level-cache/2023-08-27-09-32-10.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>看到里面的nginx目录了吗，OpenResty就是在Nginx基础上集成了一些Lua模块。</p>
<ol start="6">
<li><strong>配置nginx的环境变量</strong></li>
</ol>
<p>打开配置文件：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vi</span> /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在最下面加入两行：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">NGINX_HOME</span><span class="token operator">=</span>/usr/local/openresty/nginx
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token variable">${NGINX_HOME}</span>/sbin:<span class="token environment constant">$PATH</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>NGINX_HOME：后面是OpenResty安装目录下的nginx的目录</p>
<p>然后让配置生效：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">source</span> /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-启动和运行" tabindex="-1"><a class="header-anchor" href="#_2-启动和运行" aria-hidden="true">#</a> 2.启动和运行</h3>
<p>OpenResty底层是基于Nginx的，查看OpenResty目录的nginx目录，结构与windows中安装的nginx基本一致：</p>
<figure><img src="@source/../assets/redis-advance-multi-level-cache/2023-08-27-09-36-04.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>所以运行方式与nginx基本一致：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 启动nginx</span>
nginx
<span class="token comment"># 重新加载配置</span>
nginx <span class="token parameter variable">-s</span> reload
<span class="token comment"># 停止</span>
nginx <span class="token parameter variable">-s</span> stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>nginx的默认配置文件注释太多，影响后续我们的编辑，这里将nginx.conf中的注释部分删除，保留有效部分。</p>
<p>修改<code v-pre>/usr/local/openresty/nginx/conf/nginx.conf</code>文件，内容如下：</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token comment">#user  nobody;</span>
<span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">error_log</span>  logs/error.log</span><span class="token punctuation">;</span>

<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">8081</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Linux的控制台输入命令以启动nginx：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后访问页面：<a href="http://192.168.150.101:8081" target="_blank" rel="noopener noreferrer">http://192.168.150.101:8081<ExternalLinkIcon/></a>，注意ip地址替换为你自己的虚拟机IP：</p>
<h3 id="_3-备注" tabindex="-1"><a class="header-anchor" href="#_3-备注" aria-hidden="true">#</a> 3.备注</h3>
<ul>
<li><strong>加载OpenResty的lua模块</strong></li>
</ul>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token comment">#lua 模块</span>
<span class="token directive"><span class="token keyword">lua_package_path</span> <span class="token string">"/usr/local/openresty/lualib/?.lua;;"</span></span><span class="token punctuation">;</span>
<span class="token comment">#c模块     </span>
<span class="token directive"><span class="token keyword">lua_package_cpath</span> <span class="token string">"/usr/local/openresty/lualib/?.so;;"</span></span><span class="token punctuation">;</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>common.lua</strong></li>
</ul>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token comment">-- 封装函数，发送http请求，并解析响应</span>
<span class="token keyword">local</span> <span class="token keyword">function</span> <span class="token function">read_http</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> params<span class="token punctuation">)</span>
    <span class="token keyword">local</span> resp <span class="token operator">=</span> ngx<span class="token punctuation">.</span>location<span class="token punctuation">.</span><span class="token function">capture</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span><span class="token punctuation">{</span>
        method <span class="token operator">=</span> ngx<span class="token punctuation">.</span>HTTP_GET<span class="token punctuation">,</span>
        args <span class="token operator">=</span> params<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> resp <span class="token keyword">then</span>
        <span class="token comment">-- 记录错误信息，返回404</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"http not found, path: "</span><span class="token punctuation">,</span> path <span class="token punctuation">,</span> <span class="token string">", args: "</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
        ngx<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">404</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>
    <span class="token keyword">return</span> resp<span class="token punctuation">.</span>body
<span class="token keyword">end</span>
<span class="token comment">-- 将方法导出</span>
<span class="token keyword">local</span> _M <span class="token operator">=</span> <span class="token punctuation">{</span>  
    read_http <span class="token operator">=</span> read_http
<span class="token punctuation">}</span>  
<span class="token keyword">return</span> _M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>释放Redis连接API：</strong></li>
</ul>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token comment">-- 关闭redis连接的工具方法，其实是放入连接池</span>
<span class="token keyword">local</span> <span class="token keyword">function</span> <span class="token function">close_redis</span><span class="token punctuation">(</span>red<span class="token punctuation">)</span>
    <span class="token keyword">local</span> pool_max_idle_time <span class="token operator">=</span> <span class="token number">10000</span> <span class="token comment">-- 连接的空闲时间，单位是毫秒</span>
    <span class="token keyword">local</span> pool_size <span class="token operator">=</span> <span class="token number">100</span> <span class="token comment">--连接池大小</span>
    <span class="token keyword">local</span> ok<span class="token punctuation">,</span> err <span class="token operator">=</span> red<span class="token punctuation">:</span><span class="token function">set_keepalive</span><span class="token punctuation">(</span>pool_max_idle_time<span class="token punctuation">,</span> pool_size<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> ok <span class="token keyword">then</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"放入redis连接池失败: "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>读取Redis数据的API：</strong></li>
</ul>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token comment">-- 查询redis的方法 ip和port是redis地址，key是查询的key</span>
<span class="token keyword">local</span> <span class="token keyword">function</span> <span class="token function">read_redis</span><span class="token punctuation">(</span>ip<span class="token punctuation">,</span> port<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token comment">-- 获取一个连接</span>
    <span class="token keyword">local</span> ok<span class="token punctuation">,</span> err <span class="token operator">=</span> red<span class="token punctuation">:</span><span class="token function">connect</span><span class="token punctuation">(</span>ip<span class="token punctuation">,</span> port<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> ok <span class="token keyword">then</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"连接redis失败 : "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token keyword">nil</span>
    <span class="token keyword">end</span>
    <span class="token comment">-- 查询redis</span>
    <span class="token keyword">local</span> resp<span class="token punctuation">,</span> err <span class="token operator">=</span> red<span class="token punctuation">:</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token comment">-- 查询失败处理</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> resp <span class="token keyword">then</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"查询Redis失败: "</span><span class="token punctuation">,</span> err<span class="token punctuation">,</span> <span class="token string">", key = "</span> <span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token keyword">end</span>
    <span class="token comment">--得到的数据为空处理</span>
    <span class="token keyword">if</span> resp <span class="token operator">==</span> ngx<span class="token punctuation">.</span>null <span class="token keyword">then</span>
        resp <span class="token operator">=</span> <span class="token keyword">nil</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"查询Redis数据为空, key = "</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token keyword">end</span>
    <span class="token function">close_redis</span><span class="token punctuation">(</span>red<span class="token punctuation">)</span>
    <span class="token keyword">return</span> resp
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>开启共享词典：</strong></li>
</ul>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token comment"># 共享字典，也就是本地缓存，名称叫做：item_cache，大小150m</span>
<span class="token directive"><span class="token keyword">lua_shared_dict</span> item_cache <span class="token number">150m</span></span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="openresty快速入门" tabindex="-1"><a class="header-anchor" href="#openresty快速入门" aria-hidden="true">#</a> OpenResty快速入门</h2>
<blockquote>
<p>这里我们使用 nginx 拦截 http 请求，处理后返回数据。</p>
</blockquote>
<h3 id="步骤1-修改nginx-conf文件" tabindex="-1"><a class="header-anchor" href="#步骤1-修改nginx-conf文件" aria-hidden="true">#</a> 步骤1 修改nginx.conf文件</h3>
<ol>
<li>在 nginx.conf 的 http 下面，添加对 OpenResty 的 Lua 模块支持</li>
</ol>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token comment"># 加载 lua 模块</span>
<span class="token directive"><span class="token keyword">lua_package_path</span> <span class="token string">"/usr/local/openresty/lualib/?.lua;;"</span></span><span class="token punctuation">;</span>
<span class="token comment"># 加载 c 模块</span>
<span class="token directive"><span class="token keyword">lua_package_cpath</span> <span class="token string">"/usr/local/openresty/lualib/?.so;;"</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>在 nginx.conf 的 serevr 下面，添加对 /api/item 这个路径的监听：</li>
</ol>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> /api/item</span> <span class="token punctuation">{</span>
    <span class="token comment"># 响应类型，这里返回 json</span>
    <span class="token directive"><span class="token keyword">default_type</span> application/json

    <span class="token comment"># 响应数据由 lua/item.lua 这个文件来决定</span>
    content_by_lua_file lua/item.lua</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="步骤2-编写item-lua文件" tabindex="-1"><a class="header-anchor" href="#步骤2-编写item-lua文件" aria-hidden="true">#</a> 步骤2 编写item.lua文件</h3>
<ol>
<li>在 nginx 目录创建文件夹：lua</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> lua
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>在 lua 文件夹下，新建文件：item.lua</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">touch</span> lua/item.lua
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>内容如下</li>
</ol>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token comment">-- 返回假数据，这里的 ngx.say() 函数，就是写数据到 Response 中</span>
ngx<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token string">'{"id": 10001, "name" : "Coder Mast"}'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>重新加载配置</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>nginx <span class="token parameter variable">-s</span> reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="openresty获取请求参数" tabindex="-1"><a class="header-anchor" href="#openresty获取请求参数" aria-hidden="true">#</a> OpenResty获取请求参数</h2>
<p>OpenResty 提供了各种 API 用来获取不同类型的请求参数：</p>
<table>
<thead>
<tr>
<th style="text-align:center">参数格式</th>
<th style="text-align:center">参数示例</th>
<th style="text-align:center">参数解析代码示例</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">路径占位符</td>
<td style="text-align:center">/item/1001</td>
<td style="text-align:center"><img src="@source/../assets/redis-advance-multi-level-cache/2023-08-27-11-37-02.png" alt="" loading="lazy"></td>
</tr>
<tr>
<td style="text-align:center">请求头</td>
<td style="text-align:center">id:1001</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">Get请求参数</td>
<td style="text-align:center">?id=1001</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">Post表单参数</td>
<td style="text-align:center">id=1001</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">Json参数</td>
<td style="text-align:center">{&quot;id&quot;:1001}</td>
<td style="text-align:center"></td>
</tr>
</tbody>
</table>
<details class="hint-container details"><summary>代码详情</summary>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code>- 路径占位符
<span class="token comment"># 1. 正则表达式匹配：</span>
<span class="token directive"><span class="token keyword">location</span> ~ /item/(\d+)</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">content_by_lua_file</span> lua/item.lua</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token comment">-- 2. 匹配到的参数会存入 ngx.var 数组中，可以使用角标获取</span>
lcoal id <span class="token operator">=</span> ngx<span class="token punctuation">.</span>var<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>请求头</p>
</li>
<li>
<p>Get请求参数</p>
</li>
<li>
<p>Post表单参数</p>
</li>
<li>
<p>Json参数</p>
</li>
</ul>
</details>
<h2 id="封装http请求工具" tabindex="-1"><a class="header-anchor" href="#封装http请求工具" aria-hidden="true">#</a> 封装Http请求工具</h2>
<h2 id="向tomcat发送http请求" tabindex="-1"><a class="header-anchor" href="#向tomcat发送http请求" aria-hidden="true">#</a> 向Tomcat发送http请求</h2>
<h2 id="根据商品id对tomcat集群负载均衡" tabindex="-1"><a class="header-anchor" href="#根据商品id对tomcat集群负载均衡" aria-hidden="true">#</a> 根据商品id对Tomcat集群负载均衡</h2>
<h2 id="redis缓存预热" tabindex="-1"><a class="header-anchor" href="#redis缓存预热" aria-hidden="true">#</a> Redis缓存预热</h2>
<h2 id="查询redis" tabindex="-1"><a class="header-anchor" href="#查询redis" aria-hidden="true">#</a> 查询Redis</h2>
<h2 id="nginx本地缓存" tabindex="-1"><a class="header-anchor" href="#nginx本地缓存" aria-hidden="true">#</a> Nginx本地缓存</h2>
</div></template>



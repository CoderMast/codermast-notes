<template><div><h1 id="docker-web应用实例" tabindex="-1"><a class="header-anchor" href="#docker-web应用实例" aria-hidden="true">#</a> Docker - WEB应用实例</h1>
<p>在之前的章节中，仅对普通容器进行了演示，但在实际中常常使用到 Docker 容器中的 WEB 应用程序。</p>
<h2 id="运行一个web应用" tabindex="-1"><a class="header-anchor" href="#运行一个web应用" aria-hidden="true">#</a> 运行一个WEB应用</h2>
<ol>
<li>拉取镜像</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull training/webapp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-web-containers/2024-01-15-23-24-22.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="2">
<li>创建一个容器</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-P</span> training/webapp python app.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-web-containers/2024-01-15-23-25-17.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<blockquote>
<p>这里出现了警告信息，是因为我的电脑是 M1 芯片，是 ARM 架构，而所需要的平台是请求的映像的平台（linux/aamd64）与检测到的主机平台（linux/alm64/v8）不匹配，这里每个人的电脑环境不同，不必理会。</p>
</blockquote>
<ul>
<li>
<p>-d:让容器在后台运行。</p>
</li>
<li>
<p>-P:将容器内部使用的网络端口随机映射到我们使用的主机上。</p>
</li>
<li>
<p>-p:是容器内部端口绑定到指定的主机端口。</p>
</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">5001</span>:5000 training/webapp python app.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>即将本机的 5001 端口绑定到容器内部的 5000 端口上。</p>
<figure><img src="@source/../assets/docker-web-containers/2024-01-18-23-38-50.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="查看web应用容器" tabindex="-1"><a class="header-anchor" href="#查看web应用容器" aria-hidden="true">#</a> 查看WEB应用容器</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-web-containers/2024-01-15-23-27-37.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>我们看到这里增加了端口的映射，<code v-pre>0.0.0.0:55000-&gt;5000/tcp</code>，即将本地 IP 的 55000 端口，映射到了该 Docker 容器中的 5000 端口，即我们在本地访问 55000 端口，即可访问该 Docker 容器。</p>
<figure><img src="@source/../assets/docker-web-containers/2024-01-15-23-37-47.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="自定义网络端口映射" tabindex="-1"><a class="header-anchor" href="#自定义网络端口映射" aria-hidden="true">#</a> 自定义网络端口映射</h2>
<p>在上面的例子中，使用 <code v-pre>-p</code> 参数映射到主机上的端口是随机的，下面我们对其进行端口的自定义操作。</p>
<p>为了便于和前面创建的容器进行区分，我们再创建一个容器。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">55001</span>:5000 training/webapp python app.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-web-containers/2024-01-15-23-35-33.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>访问 <code v-pre>localhost:55001</code></p>
<figure><img src="@source/../assets/docker-web-containers/2024-01-15-23-38-01.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="hint-container tip">
<p class="hint-container-title">补充</p>
<p>端口映射既可以是本地端口映射，也可以是网络端口映射，即将 Docker 容器中的端口直接映射到某个指定的网络 IP 的端口。</p>
<ul>
<li>本地端口映射：<code v-pre>5000/tcp</code> -&gt; <code v-pre>0.0.0.0:5001</code></li>
<li>网络端口映射：<code v-pre>5000/tcp</code> -&gt; <code v-pre>123.23.46.123:5001</code></li>
</ul>
<p>另外，这里的端口映射默认都是 TCP 端口，也可以指定为 UDP 端口，在端口后面加上 <code v-pre>/udp</code> 即可。</p>
</div>
<h2 id="查看端口映射信息" tabindex="-1"><a class="header-anchor" href="#查看端口映射信息" aria-hidden="true">#</a> 查看端口映射信息</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> port focused_boyd <span class="token number">5000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该指令即查看名为 <code v-pre>focused_boyd</code> 的 Docker 容器的 5000 端口映射到什么位置。</p>
<figure><img src="@source/../assets/docker-web-containers/2024-01-18-23-47-46.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="停止web应用容器" tabindex="-1"><a class="header-anchor" href="#停止web应用容器" aria-hidden="true">#</a> 停止WEB应用容器</h2>
<p>WEB 应用容器，本身就是一个 Docker 容器，使用 Docker 本身的停止命令即可。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 通过 Docker 容器名称停止</span>
<span class="token function">docker</span> stop busy_hodgkin

<span class="token comment"># 通过 Docker 容器 ID 停止</span>
<span class="token function">docker</span> stop af9b91fa3cc6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="重启web应用容器" tabindex="-1"><a class="header-anchor" href="#重启web应用容器" aria-hidden="true">#</a> 重启WEB应用容器</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 通过 Docker 容器名称重启</span>
<span class="token function">docker</span> restart busy_hodgkin

<span class="token comment"># 通过 Docker 容器 ID 重启</span>
<span class="token function">docker</span> restart af9b91fa3cc6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除web应用容器" tabindex="-1"><a class="header-anchor" href="#删除web应用容器" aria-hidden="true">#</a> 删除WEB应用容器</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">rm</span> busy_hodgkin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里要注意，该指令是无法直接删除运行中的容器，想要直接删除需要加上 <code v-pre>-f</code> 选项</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> busy_hodgkin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>



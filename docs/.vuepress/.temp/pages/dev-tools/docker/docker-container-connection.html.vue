<template><div><h1 id="docker-容器互联" tabindex="-1"><a class="header-anchor" href="#docker-容器互联" aria-hidden="true">#</a> Docker - 容器互联</h1>
<p>在上一个章节中我们学习了 Docker 容器的端口映射，可以将 Docker 容器和本地以及网络中的端口进行连接起来。</p>
<p>但端口映射并不是唯一把 Docker 连接到另一个容器的方法，Docker 有一个连接系统允许将多个容器连接在一起，共享连接信息。</p>
<h2 id="容器命名" tabindex="-1"><a class="header-anchor" href="#容器命名" aria-hidden="true">#</a> 容器命名</h2>
<p>在创建一个容器的时候，Docker 会自动为其进行命名，也可以使用 <code v-pre>--name</code> 来自定义 Docker 容器的名称。</p>
<ul>
<li>创建时自定义名称</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-P</span> <span class="token parameter variable">--name</span> codermast training/webapp python app.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-container-connection/2024-01-18-23-56-11.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>创建后修改名称</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">rename</span> focused_boyd codermast1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中 <code v-pre>focused_boyd</code> 为原容器名，<code v-pre>codermast1</code> 为要自定义的名称。</p>
<figure><img src="@source/../assets/docker-container-connection/2024-01-18-23-57-39.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="创建网络" tabindex="-1"><a class="header-anchor" href="#创建网络" aria-hidden="true">#</a> 创建网络</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> network create <span class="token parameter variable">-d</span> bridge codermast-test-net
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>-d：参数指定 Docker 网络类型，有 bridge、overlay。</li>
</ul>
<figure><img src="@source/../assets/docker-container-connection/2024-01-19-00-01-10.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="连接容器" tabindex="-1"><a class="header-anchor" href="#连接容器" aria-hidden="true">#</a> 连接容器</h2>
<ol>
<li>创建一个容器并连接到该网络</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token parameter variable">--name</span> codermast_test_net1 <span class="token parameter variable">--network</span> codermast-test-net ubuntu:20.04 /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>创建另一个容器并连接到该网络</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token parameter variable">--name</span> codermast_test_net2 <span class="token parameter variable">--network</span> codermast-test-net ubuntu:20.04 /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-container-connection/2024-01-19-00-06-45.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="3">
<li>验证该网络下的两个容器建立了联系</li>
</ol>
<p>使用 ping 指令检测，在执行之前请确保安装了该指令工具，如果未安装，执行下列指令安装即可。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">apt-get</span> update
<span class="token function">apt</span> <span class="token function">install</span> iputils-ping
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-container-connection/2024-01-19-00-15-23.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<figure><img src="@source/../assets/docker-container-connection/2024-01-19-00-15-28.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>这样，<code v-pre>codermast_test_net1</code> 容器和 <code v-pre>codermast_test_net2</code> 容器建立了互联关系。</p>
<p>如果有多个容器之间需要互相连接，推荐使用 <code v-pre>Docker Compose</code>，在后续的章节中会进行详细说明，这里不再赘述。</p>
</div></template>



<template><div><h1 id="docker-helloworld" tabindex="-1"><a class="header-anchor" href="#docker-helloworld" aria-hidden="true">#</a> Docker - HelloWorld</h1>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>在学习本小节之前，你必须确保你正确安装了 Docker，正确安装 Docker 是后续学习的前提，务必确保你已经成功安装。</p>
<p>另外当你在学习本小节时，可能会出现你完全按照教程进行，但是运行结果并不与教程相符合的情况。这种情况不必担心，因为 Docker 镜像源默认是在海外，国内访问可能不够稳定，在后续的章节中会一一解决这些问题。</p>
<p>在本章节中的所有关于 Docker 的专有名词，如 镜像、容器、仓库等，不理解属于正常情况，这些内容都会在后续中进行讲解。</p>
<p>本小节的目的是为了让大家对 Docker 的运行有一个简单的认识，仅此而已。</p>
<p>如未能成功运行，可先学习自本小节起的后续章节，学习完成后可回头做此学习案例。</p>
</div>
<h2 id="hello-world容器样例" tabindex="-1"><a class="header-anchor" href="#hello-world容器样例" aria-hidden="true">#</a> Hello World容器样例</h2>
<ol>
<li>拉取 hello-world 镜像</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull hello-world:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-helloworld/2024-01-10-21-53-19.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="2">
<li>查看本地仓库是否有 hello-world 这个库</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-helloworld/2024-01-10-21-53-34.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="3">
<li>运行这个镜像的容器，即实例</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run hello-world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-helloworld/2024-01-10-21-54-08.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="centos容器样例" tabindex="-1"><a class="header-anchor" href="#centos容器样例" aria-hidden="true">#</a> Centos容器样例</h2>
<blockquote>
<p>在 Centos 环境下执行 <code v-pre>/bin/echo &quot;Hello world&quot;</code>指令</p>
</blockquote>
<ol>
<li>拉取 Centos 镜像</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull centos
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-helloworld/2024-01-10-22-13-31.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="2">
<li>查看本地仓库是否有 Centos7 这个镜像</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-helloworld/2024-01-10-22-13-41.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="3">
<li>运行这个镜像的容器，即实例</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run centos /bin/echo <span class="token string">"Hello world"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-helloworld/2024-01-10-22-14-01.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</div></template>



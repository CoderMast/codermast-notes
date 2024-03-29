<template><div><h1 id="docker-dockerfile" tabindex="-1"><a class="header-anchor" href="#docker-dockerfile" aria-hidden="true">#</a> Docker - Dockerfile</h1>
<h2 id="什么是dockerfile" tabindex="-1"><a class="header-anchor" href="#什么是dockerfile" aria-hidden="true">#</a> 什么是Dockerfile？</h2>
<p>DockerFile 是用于构建 Docker 镜像的文本文件。Docker 是一种容器化平台，允许开发者将应用程序及其依赖项打包到一个可移植的容器中，以确保在不同环境中的一致性和可移植性。</p>
<p>DockerFile 包含一系列指令，这些指令描述了如何构建 Docker 镜像。每个指令都对应一个操作，例如安装软件包、设置环境变量、复制文件等。当 Docker 引擎读取 DockerFile 时，它会逐行执行其中的指令，以最终创建一个镜像。</p>
<h2 id="示例说明" tabindex="-1"><a class="header-anchor" href="#示例说明" aria-hidden="true">#</a> 示例说明</h2>
<p>在空目录下，新建一个名为 Dockerfile 的文件，并在其中添加如下内容。</p>
<div class="language-docker line-numbers-mode" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token comment"># 使用官方的基础镜像</span>
<span class="token instruction"><span class="token keyword">FROM</span> ubuntu:latest</span>

<span class="token comment"># 设置工作目录</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span>

<span class="token comment"># 复制当前目录下的所有文件到工作目录</span>
<span class="token instruction"><span class="token keyword">COPY</span> . .</span>

<span class="token comment"># 安装依赖</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; apt-get install -y <span class="token operator">\</span>
    python3 <span class="token operator">\</span>
    python3-pip</span>

<span class="token comment"># 安装应用程序依赖</span>
<span class="token instruction"><span class="token keyword">RUN</span> pip3 install -r requirements.txt</span>

<span class="token comment"># 暴露应用程序的端口</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 5000</span>

<span class="token comment"># 定义启动命令</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"python3"</span>, <span class="token string">"app.py"</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中：</p>
<ul>
<li>FROM 指定了基础镜像，即用作构建的起点的操作系统和环境。</li>
<li>WORKDIR 设置了工作目录，即后续指令执行时的当前工作目录。</li>
<li>COPY 将当前目录下的所有文件复制到容器的工作目录。</li>
<li>RUN 执行命令，例如更新包列表、安装软件等。</li>
<li>EXPOSE 声明应用程序将监听的端口。</li>
<li>CMD 定义了容器启动时要执行的默认命令。</li>
</ul>
<p>通过编写 DockerFile，开发者可以将应用程序的构建过程和运行时环境的配置以代码的方式进行描述，实现了可重复、可移植和可自动化的容器化部署。</p>
<h2 id="镜像结构" tabindex="-1"><a class="header-anchor" href="#镜像结构" aria-hidden="true">#</a> 镜像结构</h2>
<p>Docker File 文件中的每条指令都会创建一个新的镜像层，当本地环境中已经下载好了某些镜像，那么会直接使用这些镜像，不会重复下载，提高了效率。</p>
<p>但是过多的层也会导致镜像过大，可以适当进行简化，仅在关键部分进行分层。</p>
<figure><img src="@source/../assets/docker-dockerfile/2024-01-21-23-58-53.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="编写规则" tabindex="-1"><a class="header-anchor" href="#编写规则" aria-hidden="true">#</a> 编写规则</h2>
<ul>
<li>每条保留字指令都必须为大写字母且后面要跟随至少一个参数</li>
<li>指令顺序执行，遵循从上到下原则</li>
<li>#表示注释</li>
<li>每条指令都会创建一个新的镜像层，并对镜像进行提交</li>
</ul>
<h2 id="指令汇总" tabindex="-1"><a class="header-anchor" href="#指令汇总" aria-hidden="true">#</a> 指令汇总</h2>
<ul>
<li>FROM： 指定基础镜像，作为构建的起点。</li>
</ul>
<div class="language-docker" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> ubuntu:latest</span>
</code></pre></div><ul>
<li>WORKDIR： 设置工作目录，后续指令将在该目录下执行。</li>
</ul>
<div class="language-docker" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span>
</code></pre></div><ul>
<li>COPY： 复制文件或目录到容器中。</li>
</ul>
<div class="language-docker" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">COPY</span> . .</span>
</code></pre></div><ul>
<li>ADD： 类似于COPY，还支持URL解压缩和tar文件自动解压。</li>
</ul>
<div class="language-docker" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">ADD</span> https://example.com/file.tar.gz/app/</span>
</code></pre></div><ul>
<li>RUN： 执行命令，通常用于安装软件包、更新系统等。</li>
</ul>
<div class="language-docker" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; apt-get install -y python3</span>
</code></pre></div><ul>
<li>ENV： 设置环境变量。</li>
</ul>
<div class="language-docker" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">ENV</span> MY_VAR=value</span>
</code></pre></div><ul>
<li>EXPOSE： 声明容器将监听的端口，但并不映射到主机。</li>
</ul>
<div class="language-docker" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">EXPOSE</span> 80</span>
</code></pre></div><ul>
<li>CMD： 定义容器启动时要执行的默认命令。可以被覆盖。</li>
</ul>
<div class="language-docker" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"python"</span>, <span class="token string">"app.py"</span>]</span>
</code></pre></div><ul>
<li>ENTRYPOINT： 定义容器启动时要执行的默认命令。不可被覆盖，但可以追加参数。</li>
</ul>
<div class="language-docker" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">"nginx"</span>, <span class="token string">"-g"</span>, <span class="token string">"daemon off;"</span>]</span>
</code></pre></div><ul>
<li>VOLUME： 创建挂载点，用于持久化数据。</li>
</ul>
<div class="language-docker" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">VOLUME</span> /data</span>
</code></pre></div><ul>
<li>USER： 设置执行后续命令的用户或 UID。</li>
</ul>
<div class="language-docker" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">USER</span> appuser</span>
</code></pre></div><ul>
<li>ARG： 定义构建时的变量，可通过构建命令传递。</li>
</ul>
<div class="language-docker" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">ARG</span> version=latest</span>
</code></pre></div><ul>
<li>LABEL： 添加元数据，通常用于描述镜像。</li>
</ul>
<div class="language-docker" data-ext="docker"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">LABEL</span> version=<span class="token string">"1.0"</span> description=<span class="token string">"My custom image"</span> author=<span class="token string">"codermast"</span></span>
</code></pre></div><div class="hint-container tip">
<p class="hint-container-title">Docker File 指令官方文档</p>
<p><a href="https://docs.docker.com/engine/reference/builder/" target="_blank" rel="noopener noreferrer">https://docs.docker.com/engine/reference/builder/<ExternalLinkIcon/></a></p>
</div>
</div></template>



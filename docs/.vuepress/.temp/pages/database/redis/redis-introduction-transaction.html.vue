<template><div><h1 id="redis入门-事务" tabindex="-1"><a class="header-anchor" href="#redis入门-事务" aria-hidden="true">#</a> Redis入门 - 事务</h1>
<p>Redis 事务可以一次执行多个命令， 并且带有以下三个重要的保证：</p>
<ul>
<li>批量操作在发送 EXEC 命令前被放入队列缓存。</li>
<li>收到 EXEC 命令后进入事务执行，事务中任意命令执行失败，其余的命令依然被执行。</li>
<li>在事务执行过程，其他客户端提交的命令请求不会插入到事务执行命令序列中。</li>
</ul>
<p>一个事务从开始到执行会经历以下三个阶段：</p>
<ul>
<li>开始事务。</li>
<li>命令入队。</li>
<li>执行事务。</li>
</ul>
<p>单个 Redis 命令的执行是原子性的，但 Redis 没有在事务上增加任何维持原子性的机制，所以 Redis 事务的执行并不是原子性的。</p>
<p>事务可以理解为一个打包的批量执行脚本，但批量指令并非原子化的操作，中间某条指令的失败不会导致前面已做指令的回滚，也不会造成后续的指令不做。</p>
<p><strong>Redis事务命令</strong></p>
<ul>
<li>开始事务：<code v-pre>multi</code></li>
<li>执行事务：<code v-pre>exec</code></li>
<li>取消事务：<code v-pre>discard</code></li>
<li>监视一个(或多个) key：<code v-pre>watch key [key ...]</code></li>
</ul>
<blockquote>
<p>监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断。</p>
</blockquote>
<ul>
<li>取消监视：<code v-pre>unwatch</code></li>
</ul>
<blockquote>
<p>取消 WATCH 命令对所有 key 的监视。</p>
</blockquote>
<div class="hint-container danger">
<p class="hint-container-title">注意</p>
<p>Redis的事务和MySQL的事务是不同的，MySQL的事务要么全部执行，要么全部不执行。而Redis仅仅是一组命令的顺序执行集合，事务不会回滚，也不会随着报错而停止。</p>
</div>
</div></template>



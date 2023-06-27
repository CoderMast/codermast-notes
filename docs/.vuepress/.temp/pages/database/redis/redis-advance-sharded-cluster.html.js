export const data = JSON.parse("{\"key\":\"v-3c43b28a\",\"path\":\"/database/redis/redis-advance-sharded-cluster.html\",\"title\":\"Redis进阶 - Redis分片集群\",\"lang\":\"zh-CN\",\"frontmatter\":{\"order\":16,\"description\":\"Redis进阶 - Redis分片集群 搭建分片集群 主从和哨兵可以解决高可用、高并发读的问题。但是依然有两个问题没有解决： 海量数据存储问题 高并发写的问题 使用分片集群可以解决上述问题，分片集群特征： 集群中有多个 master，每个 master 保存不同数据 每个 master 都可以有多个 slave 节点 master 之间通过 ping 监测彼此健康状态 客户端请求可以访问集群任意节点，最终都会被转发到正确节点\"},\"headers\":[{\"level\":2,\"title\":\"搭建分片集群\",\"slug\":\"搭建分片集群\",\"link\":\"#搭建分片集群\",\"children\":[{\"level\":3,\"title\":\"集群结构\",\"slug\":\"集群结构\",\"link\":\"#集群结构\",\"children\":[]},{\"level\":3,\"title\":\"准备实例和配置\",\"slug\":\"准备实例和配置\",\"link\":\"#准备实例和配置\",\"children\":[]},{\"level\":3,\"title\":\"启动\",\"slug\":\"启动\",\"link\":\"#启动\",\"children\":[]},{\"level\":3,\"title\":\"创建集群\",\"slug\":\"创建集群\",\"link\":\"#创建集群\",\"children\":[]},{\"level\":3,\"title\":\"测试\",\"slug\":\"测试\",\"link\":\"#测试\",\"children\":[]}]},{\"level\":2,\"title\":\"散列插槽\",\"slug\":\"散列插槽\",\"link\":\"#散列插槽\",\"children\":[]},{\"level\":2,\"title\":\"集群伸缩\",\"slug\":\"集群伸缩\",\"link\":\"#集群伸缩\",\"children\":[]},{\"level\":2,\"title\":\"故障转移\",\"slug\":\"故障转移\",\"link\":\"#故障转移\",\"children\":[]},{\"level\":2,\"title\":\"RedisTemplate访问分片集群\",\"slug\":\"redistemplate访问分片集群\",\"link\":\"#redistemplate访问分片集群\",\"children\":[]}],\"readingTime\":{\"minutes\":4.85,\"words\":1455},\"filePathRelative\":\"database/redis/redis-advance-sharded-cluster.md\",\"excerpt\":\"<h1> Redis进阶 - Redis分片集群</h1>\\n<h2> 搭建分片集群</h2>\\n<p>主从和哨兵可以解决高可用、高并发读的问题。但是依然有两个问题没有解决：</p>\\n<ul>\\n<li>海量数据存储问题</li>\\n<li>高并发写的问题</li>\\n</ul>\\n<p>使用分片集群可以解决上述问题，分片集群特征：</p>\\n<ul>\\n<li>集群中有多个 master，每个 master 保存不同数据</li>\\n<li>每个 master 都可以有多个 slave 节点</li>\\n<li>master 之间通过 ping 监测彼此健康状态</li>\\n<li>客户端请求可以访问集群任意节点，最终都会被转发到正确节点</li>\\n</ul>\",\"autoDesc\":true}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}

export const data = JSON.parse("{\"key\":\"v-9507482e\",\"path\":\"/database/redis/redis-advance-sentinel.html\",\"title\":\"Redis进阶 - Redis哨兵\",\"lang\":\"zh-CN\",\"frontmatter\":{\"order\":15,\"description\":\"Redis进阶 - Redis哨兵 思考 slave 节点宕机恢复以后可以找 master 节点同步数据，那么 master 节点宕机怎么办？ 哨兵的作用和工作原理 哨兵的作用 Redis 提供了哨兵（Sentinel）机制来实现主从集群的自动故障恢复。哨兵的结构和作用如下：\"},\"headers\":[{\"level\":2,\"title\":\"哨兵的作用和工作原理\",\"slug\":\"哨兵的作用和工作原理\",\"link\":\"#哨兵的作用和工作原理\",\"children\":[{\"level\":3,\"title\":\"哨兵的作用\",\"slug\":\"哨兵的作用\",\"link\":\"#哨兵的作用\",\"children\":[]},{\"level\":3,\"title\":\"服务状态监控\",\"slug\":\"服务状态监控\",\"link\":\"#服务状态监控\",\"children\":[]},{\"level\":3,\"title\":\"选举新的master\",\"slug\":\"选举新的master\",\"link\":\"#选举新的master\",\"children\":[]},{\"level\":3,\"title\":\"实现故障转移\",\"slug\":\"实现故障转移\",\"link\":\"#实现故障转移\",\"children\":[]},{\"level\":3,\"title\":\"小结\",\"slug\":\"小结\",\"link\":\"#小结\",\"children\":[]}]},{\"level\":2,\"title\":\"搭建哨兵集群\",\"slug\":\"搭建哨兵集群\",\"link\":\"#搭建哨兵集群\",\"children\":[{\"level\":3,\"title\":\"集群结构\",\"slug\":\"集群结构\",\"link\":\"#集群结构\",\"children\":[]},{\"level\":3,\"title\":\"准备实例和配置\",\"slug\":\"准备实例和配置\",\"link\":\"#准备实例和配置\",\"children\":[]},{\"level\":3,\"title\":\"启动\",\"slug\":\"启动\",\"link\":\"#启动\",\"children\":[]},{\"level\":3,\"title\":\"测试\",\"slug\":\"测试\",\"link\":\"#测试\",\"children\":[]}]},{\"level\":2,\"title\":\"RedisTemplate连接集群\",\"slug\":\"redistemplate连接集群\",\"link\":\"#redistemplate连接集群\",\"children\":[]}],\"readingTime\":{\"minutes\":4.82,\"words\":1446},\"filePathRelative\":\"database/redis/redis-advance-sentinel.md\",\"excerpt\":\"<h1> Redis进阶 - Redis哨兵</h1>\\n<div class=\\\"hint-container warning\\\">\\n<p class=\\\"hint-container-title\\\">思考</p>\\n<p>slave 节点宕机恢复以后可以找 master 节点同步数据，那么 master 节点宕机怎么办？</p>\\n</div>\\n<h2> 哨兵的作用和工作原理</h2>\\n<h3> 哨兵的作用</h3>\\n<p>Redis 提供了哨兵（Sentinel）机制来实现主从集群的自动故障恢复。哨兵的结构和作用如下：</p>\\n<figure><figcaption></figcaption></figure>\",\"autoDesc\":true}")

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

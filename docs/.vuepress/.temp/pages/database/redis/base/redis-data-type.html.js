export const data = JSON.parse("{\"key\":\"v-fbbc9f46\",\"path\":\"/database/redis/base/redis-data-type.html\",\"title\":\"数据类型及其操作指令\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"数据类型及其操作指令 通用指令 在正式介绍Redis数据结构及其操作指令之前，我们需要先掌握一些最基础的通用指令。 这些都是Redis操作过程中的一些常见指令 指令 描述 keys 查看符合模板的所有key，不建议在⽣产环境设备上使⽤ del 删除⼀个指定的key esists 判断key是否存在 expire 给⼀个key设置有效期，有效期到期时该key会被⾃动删除 ttl 查看⼀个KEY的剩余有效期 quit 退出 shutdown 关闭服务器 select [0-15] 选择指定的数据库\"},\"headers\":[{\"level\":2,\"title\":\"通用指令\",\"slug\":\"通用指令\",\"link\":\"#通用指令\",\"children\":[]},{\"level\":2,\"title\":\"数据结构\",\"slug\":\"数据结构\",\"link\":\"#数据结构\",\"children\":[{\"level\":3,\"title\":\"String 字符串\",\"slug\":\"string-字符串\",\"link\":\"#string-字符串\",\"children\":[]},{\"level\":3,\"title\":\"Hash 哈希\",\"slug\":\"hash-哈希\",\"link\":\"#hash-哈希\",\"children\":[]},{\"level\":3,\"title\":\"List 列表\",\"slug\":\"list-列表\",\"link\":\"#list-列表\",\"children\":[]},{\"level\":3,\"title\":\"Set 集合\",\"slug\":\"set-集合\",\"link\":\"#set-集合\",\"children\":[]},{\"level\":3,\"title\":\"Zset 有序集合\",\"slug\":\"zset-有序集合\",\"link\":\"#zset-有序集合\",\"children\":[]}]}],\"readingTime\":{\"minutes\":1.14,\"words\":342},\"filePathRelative\":\"database/redis/base/redis-data-type.md\",\"excerpt\":\"<h1> 数据类型及其操作指令</h1>\\n<h2> 通用指令</h2>\\n<p>在正式介绍Redis数据结构及其操作指令之前，我们需要先掌握一些最基础的通用指令。</p>\\n<p>这些都是Redis操作过程中的一些常见指令</p>\\n<table>\\n<thead>\\n<tr>\\n<th style=\\\"text-align:center\\\">指令</th>\\n<th style=\\\"text-align:center\\\">描述</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td style=\\\"text-align:center\\\">keys</td>\\n<td style=\\\"text-align:center\\\">查看符合模板的所有key，不建议在⽣产环境设备上使⽤</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align:center\\\">del</td>\\n<td style=\\\"text-align:center\\\">删除⼀个指定的key</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align:center\\\">esists</td>\\n<td style=\\\"text-align:center\\\">判断key是否存在</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align:center\\\">expire</td>\\n<td style=\\\"text-align:center\\\">给⼀个key设置有效期，有效期到期时该key会被⾃动删除</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align:center\\\">ttl</td>\\n<td style=\\\"text-align:center\\\">查看⼀个KEY的剩余有效期</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align:center\\\">quit</td>\\n<td style=\\\"text-align:center\\\">退出</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align:center\\\">shutdown</td>\\n<td style=\\\"text-align:center\\\">关闭服务器</td>\\n</tr>\\n<tr>\\n<td style=\\\"text-align:center\\\">select [0-15]</td>\\n<td style=\\\"text-align:center\\\">选择指定的数据库</td>\\n</tr>\\n</tbody>\\n</table>\",\"autoDesc\":true}")

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
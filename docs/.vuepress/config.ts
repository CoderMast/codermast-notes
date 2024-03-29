import theme from "./theme.js";

import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "CoderMast编程桅杆",
  description: "CoderMast编程桅杆，深入学习编程的知识宝典，早日成为编码大师！。",
  head: [
    ["meta", { name: "keywords", content: "CoderMast,编程桅杆,Java编程,MySQL,Redis,Spring,MyBatis" }],
    ["meta", { name: "baidu-site-verification", content: "codeva-GfqTd2Cs0w" }],
    ["script", {}, `var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?32371a71caaa9940216104814b1449b6";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();`]
  ],

  theme,

  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category,
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: "标签：$content",
        },
      ],
    }),
  ],
});

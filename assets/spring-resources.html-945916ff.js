const e=JSON.parse('{"key":"v-5da3c0ba","path":"/spring-series/spring/spring-resources.html","title":"Spring - 资源操作","lang":"zh-CN","frontmatter":{"order":10,"description":"Spring - 资源操作 Resources概述 Java的标准java.net.URL类和各种URL前缀的标准处理程序无法满足所有对low-level资源的访问，比如：没有标准化的 URL 实现可用于访问需要从类路径或相对于 ServletContext 获取的资源。并且缺少某些Spring所需要的功能，例如检测某资源是否存在等。而Spring的Resource声明了访问low-level资源的能力。 Resource接口 Spring 的 Resource 接口位于 org.springframework.core.io 中。 旨在成为一个更强大的接口，用于抽象对低级资源的访问。以下显示了Resource接口定义的方法","head":[["meta",{"property":"og:url","content":"https://www.codermast.com/spring-series/spring/spring-resources.html"}],["meta",{"property":"og:site_name","content":"编程桅杆"}],["meta",{"property":"og:title","content":"Spring - 资源操作"}],["meta",{"property":"og:description","content":"Spring - 资源操作 Resources概述 Java的标准java.net.URL类和各种URL前缀的标准处理程序无法满足所有对low-level资源的访问，比如：没有标准化的 URL 实现可用于访问需要从类路径或相对于 ServletContext 获取的资源。并且缺少某些Spring所需要的功能，例如检测某资源是否存在等。而Spring的Resource声明了访问low-level资源的能力。 Resource接口 Spring 的 Resource 接口位于 org.springframework.core.io 中。 旨在成为一个更强大的接口，用于抽象对低级资源的访问。以下显示了Resource接口定义的方法"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-03T02:33:49.000Z"}],["meta",{"property":"article:author","content":"CoderMast"}],["meta",{"property":"article:modified_time","content":"2024-01-03T02:33:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring - 资源操作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-01-03T02:33:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"CoderMast\\",\\"url\\":\\"https://www.codermast.com\\",\\"email\\":\\"codermast@163.com\\"}]}"]]},"headers":[{"level":2,"title":"Resources概述","slug":"resources概述","link":"#resources概述","children":[]},{"level":2,"title":"Resource接口","slug":"resource接口","link":"#resource接口","children":[]},{"level":2,"title":"Resource的实现类","slug":"resource的实现类","link":"#resource的实现类","children":[{"level":3,"title":"UrlResource访问网络资源","slug":"urlresource访问网络资源","link":"#urlresource访问网络资源","children":[]},{"level":3,"title":"ClassPathResource 访问类路径下资源","slug":"classpathresource-访问类路径下资源","link":"#classpathresource-访问类路径下资源","children":[]},{"level":3,"title":"FileSystemResource 访问文件系统资源","slug":"filesystemresource-访问文件系统资源","link":"#filesystemresource-访问文件系统资源","children":[]},{"level":3,"title":"ServletContextResource","slug":"servletcontextresource","link":"#servletcontextresource","children":[]},{"level":3,"title":"InputStreamResource","slug":"inputstreamresource","link":"#inputstreamresource","children":[]},{"level":3,"title":"ByteArrayResource","slug":"bytearrayresource","link":"#bytearrayresource","children":[]}]},{"level":2,"title":"Resource类图","slug":"resource类图","link":"#resource类图","children":[]},{"level":2,"title":"ResourceLoader 接口","slug":"resourceloader-接口","link":"#resourceloader-接口","children":[{"level":3,"title":"ResourceLoader 概述","slug":"resourceloader-概述","link":"#resourceloader-概述","children":[]},{"level":3,"title":"使用演示","slug":"使用演示","link":"#使用演示","children":[]},{"level":3,"title":"ResourceLoader 总结","slug":"resourceloader-总结","link":"#resourceloader-总结","children":[]}]},{"level":2,"title":"ResourceLoaderAware 接口","slug":"resourceloaderaware-接口","link":"#resourceloaderaware-接口","children":[]},{"level":2,"title":"使用Resource 作为属性","slug":"使用resource-作为属性","link":"#使用resource-作为属性","children":[]},{"level":2,"title":"应用程序上下文和资源路径","slug":"应用程序上下文和资源路径","link":"#应用程序上下文和资源路径","children":[{"level":3,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":3,"title":"ApplicationContext实现类指定访问策略","slug":"applicationcontext实现类指定访问策略","link":"#applicationcontext实现类指定访问策略","children":[]},{"level":3,"title":"使用前缀指定访问策略","slug":"使用前缀指定访问策略","link":"#使用前缀指定访问策略","children":[]}]}],"git":{"createdTime":1704248104000,"updatedTime":1704249229000,"contributors":[{"name":"codermast","email":"codermast@qq.com","commits":3}]},"readingTime":{"minutes":12.28,"words":3683},"filePathRelative":"spring-series/spring/spring-resources.md","localizedDate":"2024年1月3日","excerpt":"<h1> Spring - 资源操作</h1>\\n<h2> Resources概述</h2>\\n<p>Java的标准java.net.URL类和各种URL前缀的标准处理程序无法满足所有对low-level资源的访问，比如：没有标准化的 URL 实现可用于访问需要从类路径或相对于 ServletContext 获取的资源。并且缺少某些Spring所需要的功能，例如检测某资源是否存在等。<strong>而Spring的Resource声明了访问low-level资源的能力。</strong></p>\\n<h2> Resource接口</h2>\\n<p>Spring 的 Resource 接口位于 <a href=\\"http://org.springframework.core.io\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">org.springframework.core.io</a> 中。 旨在成为一个更强大的接口，用于抽象对低级资源的访问。以下显示了Resource接口定义的方法</p>","autoDesc":true}');export{e as data};
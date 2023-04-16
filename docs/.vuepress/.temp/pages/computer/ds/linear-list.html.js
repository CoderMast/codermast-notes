export const data = JSON.parse("{\"key\":\"v-fd067b50\",\"path\":\"/computer/ds/linear-list.html\",\"title\":\"第二章 线性表\",\"lang\":\"zh-CN\",\"frontmatter\":{\"order\":2,\"description\":\"第二章 线性表 2.1线性表的定义和基本操作 2.1.1定义 线性表是具有相同数据类型的n个数据元素的有限集序列，其中n为表长，当n=0时线性表是一个空表。若用L命名线性表，其一般表示为：L = ( a1 ,a2 ,...,ai ,ai+1 ,...,an ) 2.1.2基本操作 InitList(&amp;L):初始化表，构造一个空的线性表。 Length(L):求表长，返回线性表L的长度，即L中元素的个数。 LocateElem(L,e):按值查找操作，在表L中查找具有给定关键字值的元素。 GetElem(L,i):按位查找操作。获取表L中第i个位置的数据元素的值。 ListInsert(&amp;L,i,e):插入操作，在表L中的第i个位置上插入指定的元素e. ListDelete(&amp;L,i,&amp;e):删除操作，删除表L中的第i个位置的元素，并用e返回删除元素的值。 PrintList(L):输出操作，按前后顺序输出线性表L的所有元素值。 Empty(L):判空操作，若L表为空，则返回True，否则返回false。 DestroyList(&amp;L):销毁操作，销毁线性表，并释放线性表L所占用的内存空间。\"},\"headers\":[{\"level\":2,\"title\":\"2.1线性表的定义和基本操作\",\"slug\":\"_2-1线性表的定义和基本操作\",\"link\":\"#_2-1线性表的定义和基本操作\",\"children\":[{\"level\":3,\"title\":\"2.1.1定义\",\"slug\":\"_2-1-1定义\",\"link\":\"#_2-1-1定义\",\"children\":[]},{\"level\":3,\"title\":\"2.1.2基本操作\",\"slug\":\"_2-1-2基本操作\",\"link\":\"#_2-1-2基本操作\",\"children\":[]}]},{\"level\":2,\"title\":\"2.2线性表的顺序表示\",\"slug\":\"_2-2线性表的顺序表示\",\"link\":\"#_2-2线性表的顺序表示\",\"children\":[]},{\"level\":2,\"title\":\"2.3线性表的链式表示\",\"slug\":\"_2-3线性表的链式表示\",\"link\":\"#_2-3线性表的链式表示\",\"children\":[]}],\"readingTime\":{\"minutes\":1.12,\"words\":335},\"filePathRelative\":\"computer/ds/linear-list.md\",\"excerpt\":\"<h1> 第二章 线性表</h1>\\n<h2> 2.1线性表的定义和基本操作</h2>\\n<h3> 2.1.1定义</h3>\\n<p>线性表是具有相同数据类型的n个数据元素的有限集序列，其中n为表长，当n=0时线性表是一个空表。若用L命名线性表，其一般表示为：L = ( a<sub>1</sub> ,a<sub>2</sub> ,...,a<sub>i</sub> ,a<sub>i+1</sub> ,...,a<sub>n</sub> )</p>\\n<h3> 2.1.2基本操作</h3>\\n<ul>\\n<li><code>InitList(&amp;L)</code>:初始化表，构造一个空的线性表。</li>\\n<li><code>Length(L)</code>:求表长，返回线性表L的长度，即L中元素的个数。</li>\\n<li><code>LocateElem(L,e)</code>:按值查找操作，在表L中查找具有给定关键字值的元素。</li>\\n<li><code>GetElem(L,i)</code>:按位查找操作。获取表L中第i个位置的数据元素的值。</li>\\n<li><code>ListInsert(&amp;L,i,e)</code>:插入操作，在表L中的第i个位置上插入指定的元素e.</li>\\n<li><code>ListDelete(&amp;L,i,&amp;e)</code>:删除操作，删除表L中的第i个位置的元素，并用e返回删除元素的值。</li>\\n<li><code>PrintList(L)</code>:输出操作，按前后顺序输出线性表L的所有元素值。</li>\\n<li><code>Empty(L)</code>:判空操作，若L表为空，则返回True，否则返回false。</li>\\n<li><code>DestroyList(&amp;L)</code>:销毁操作，销毁线性表，并释放线性表L所占用的内存空间。</li>\\n</ul>\",\"autoDesc\":true}")

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

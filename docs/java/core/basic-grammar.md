---
order : 2
---
# Java核心 - 基础概念及语法

## 注释

1. 单行注释

```java
// 单行注释
```
2. 多行注释

```java
/*
    多行注释
 */
```
3. 文档注释
```java
/*
*   文档注释
*   通常包含 类、方法、字段的描述信息
*/
```
::: note 小知识
注释仅在编写阶段可见，编译后注释会被编译器完全去除。
:::

## 命名规范

1. 局部变量命名：小驼峰命名法

2. 全局变量命名：小驼峰命名法

3. 常量命名：全部大写，蛇形命名法

4. 方法命名：小驼峰命名法

5. 类命名：大驼峰命名法

::: warning 命名要求
- 不能以保留关键字为名称
- 不能以数字开头
- 不能以特殊字符开头
- 严格区分大小写
- 仅能包括合法的特殊字符
:::

## 数据类型

Java 中数据类型分 基础数据类型 和 引用数据类型 两种类型。

其中基础数据类型主要有boolean(1B)、byte(1B)、char(2B)、short(2B)、int(4B)、long(8B)、float(8B)、double(16B)，最常见的引用数据类型就是 String 字符串类型和数组类型，自定义的类型多为引用数据类型。

Java 给基本数据类型提供了对应的包装类，基本数据类型与其包装类型之间的赋值使用自动装箱和拆箱完成，例如：

```java
// 源代码
Integer a = 3;  // 装箱
int b = a;      // 拆箱

// 反编译
Integer a = Integer.valueOf(3);
int b = a.intValue();
```

::: tip 装箱拆箱
- 拆箱：包装类型——>基础类型
- 装箱：基础类型——>包装类型
所谓自动拆箱装箱，就是JDK帮我们在 基础类型 和 引用类型 之间进行转化，本质就是自动调一些方法。
:::

## 运算符

- 算术运算符：`+`、`-`、`*`、`/`、`%`、`++`、`--`等
- 关系运算符：`==`、`>=`、`<=`、`>`、`<`、`!=`
- 位运算符：`&`、`|`、`^`、`~`、`<<`、`>>`、`>>>`
- 逻辑运算符：`&&`、`||`、`!`
- 赋值运算符：`=`、`+=`、`-=`、`*=`、`/=`、`%=`、`<<=`、`>>`=、`＆=`、`^=`、`|=`
- 其他运算符：`instanceof`、`，`

## 条件语句

### if语句

1. if
```java
if (布尔表达式) {
    // 布尔表达式为真时，执行这里的语句
}
```
2. if...else...

```java
if (布尔表达式) {
    // 布尔表达式为真时，执行这里的语句
} else {
    // 布尔表达式为否时，执行这里的语句
}
```

3. if...else if...else
```java
if (布尔表达式 1) {
   // 布尔表达式 1的值为 true 执行这里的代码
} else if (布尔表达式 2){
   // 如果布尔表达式 2的值为true执行这里的代码
} else if (布尔表达式 3){
   // 如果布尔表达式 3的值为true执行这里的代码
......
} else {
   // 如果以上布尔表达式都不为true执行这里的代码
}
```
::: tip 提示
if 语句可以无限嵌套使用，if...else if...else...也可以无限个条件使用。
:::

### switch语句

```java
switch (表达式) {
    case value1 :
       // 表达式的值 == value1，则执行这里的语句
       break; //可选
    case value2 :
       // 表达式的值 == value2，则执行这里的语句
       break;
    // case 语句无限使用
    default : //可选
       // 如果都不匹配的话，则执行这里的语句
}
```

::: warning 注意
这里要注意的是，如果不在每个 case 语句中的最后一行写上 break 语句，那么执行完不会退出 switch 语句，而是从该位置继续往后执行。
:::


## 循环语句

### for循环

1. 基本 for 循环
```java
for ( 初始化语句; 条件语句; 更新语句;) {
    // 这里是循环要执行的语句
}
```
2. 增强 for 循环
```java
for (ElemType elem : 集合){
    // 这里是循环要执行的语句
}
```
::: tip 提示
增强的 for 循环只适用于遍历集合。
:::

### while循环

```java
while (布尔表达式) {
    // 布尔表达式的值为 true，则循环执行这里的语句
}
```

### do...while循环

```java
do {
    // 循环体内要执行的语句。
} while (布尔表达式)
```
该循环执行时，会先执行一次循环体内的语句，然后才进行判断循环。

::: tip 关键字说明
- break; 退出当前循环
- continue; 继续当前循环
:::

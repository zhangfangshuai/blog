## var、let、const <!-- {docsify-ignore} -->

`var`存在3个不合理的地方

##### 1、存在变量提升

先使用后定义，不符合常人逻辑，容易出现逻辑混乱
```javascript
console.log(num) // undefined，不会报错。使用let会报错未定义
var num = 123
```

##### 2、存在变量覆盖
在大型项目中，如果出现变量覆盖，很可能出现意想不到的错误，还难以查到
```javascript
var num1 = 10
var num1 = 20
console.log(num1)   // 20 使用let会报错重复定义
```

##### 3、没有块级作用域
`for`块级作用域内的变量在外部依旧可以被访问，===> 红杏出墙
```javascript
function fn1() {
    for(var i = 0; i < 3; i++) {
        console.log(i)   // 0,1,2
    }
    console.log(i)  // 3  使用let会报错未定义
}
fn1()
```

&emsp;

!> `let` 针对`var`的几个问题进行了优化，并补充了**块级作用域**、**暂时死区TDZ**等概念。

##### 暂时性死区 
>通常来说, 在局部作用域中是可以访问父作用域空间变量的；但是，如果在块级作用域中使用了`let`、`const`进行声明某个变量假如`tmp`，那声明之前的那部分也会被锁定，称做变量`tmp`的“死区”

&emsp;
#### const用来定义常量

关于`const`的使用，有以下几个内容需要注意
- `const`定义常量，仅针对常量所指定地址空间不允许改变, 不限制引用数据类型其属性的值的改变
- 声明之后必须初始化赋值，否则报错
- 支持`let`其他属性
- 使用`const`定义的一般使用大写定义，用作全局变量

```javascript
const DEMO = 'offer'  // 常量
```


&emsp; <br/>
&emsp; <br/>
[下一篇](/ES6/Destructuring)

#### TS中的函数

函数是主要的**定义行为**的地方，是JS应用程序的基础。函数可以帮助你实现抽象层，模拟类，信息隐藏和模块；TS比JS的函数添加了额外的功能，更方便使用。

### 函数创建
?> **类型注解：**一种轻量级的为函数或变量添加约束的方式。


使用函数声明
```js
function add(x: number, y: number): number {
    return x + y
}
```

使用字面量表达式 + 匿名函数
```js
const add = function(x: number, y: number): number {
    return x + y
}
```

### 完整的函数类型

函数类型包含两部分：**参数类型**和**返回值类型**。 当写完整函数类型时，这两部分都是需要的。在参数类型中，参数名字只是为了增加可读性，不必与函数行参保持一致。返回值类型也是必要的部分，如果没有返回值，可以指定为`void`但不要留空。

如下:<br>
`(baseValue: number, increment: number) => number`是函数类型，<br>
`function (x: number, y: number): number` 符合上面这个类型的值 <br>
函数类型中间用的`=>`符号，函数接口的调用签名是`冒号` `interface IAdd { (x: number, y: number): number }`

```js
let myAdd: (baseValue: number, increment: number) => number = function(x: number, y: number): number {
    return x + y
}
```

### 函数的类型推断

TS遵循*按上下文归类*原则；如果在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型：

```js
// myAdd 会被推断出(x: number, y: number) => number 的函数类型
let myAdd = function(x: number, y: number): number { return x + y }

// 函数参数x，y会被推断出都是number类型
let myAdd: (baseValue: number, increment: number) => number = function(x, y) { return x + y }
```


### 可选参数与默认参数

默认参数直接在函数形参中用`赋值`语句，可选参数在形参后使用问号`?`修饰
```js
function buildName(firstName: string = 'A', lastName?: string): string {
    if (lastName) {
        return firstName + '-' + lastName
    } else {
        return firstName
    }
}
```


### 剩余参数

在ES6之前，可以使用 `arguments` 来访问函数传入的所有参数，但我们知道，它是一个类数组对象，使用起来并不是很方便。在ES6和TS中，支持使用剩余参数获取，它得到的是一个干净的数组

```js
function info(x: string, ...args: string[]) {
    console.log(x, args)
}
info('abc', 'c', 'b', 'a')

// 'abc', ['c', 'b', 'a']
```


### 函数重载

定义上，重载函数是指在同一作用域内，可以有一组具有相同函数名，不同参数列表的函数，这组函数被称为重载函数。<br>
表现上，函数重载是一个同名函数完成不同的功能，编译系统在编译阶段通过函数参数个数、参数类型不同，函数的返回值来区分该调用哪一个函数，即实现的是静态的多态性。<br>
总之，函数重载是指函数名相同，函数的参数不同(包括参数个数和参数类型)，根据参数的不同去执行不同的操作。

?> JS 中没有真正意义上的函数重载，只是在模拟实现重载，因为JS是基于对象的编程语言，不是纯面向对象的，它没有真正的多态：如继承、重载、重写，本质原因是声明创建同名函数JS中默认覆盖。

##### 为什么需要重载

1. 减少了函数名的数量，避免了名字空间的污染，对于程序的可读性有很大的好处。
2. 将你从数据结构或格式类型中解放思维，关注函数的抽象概念和其提供的功能逻辑设计。
3. 针对已存在的正在使用的公共函数的修改与扩展提供另类可行思路，有利于设计模式。

##### TS中的函数重载

```js
// 重载函数声明
function add6(x: string, y: string): string
function add6(x: number, y: number): number

// 函数声明
function add6(x: string | number, y: string | number): string | number {
    // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 x + y
    if (typeof x === 'string' && typeof y === 'string') {
        return x + y
    } else if (typeof x === 'number' && typeof y === 'number') {
        return x + y
    }
}
console.log(add6(1, 2))
console.log(add6('a', 'b'))
console.log(add6(1, 'a')) // No overload matches this call. 没有找到函数重载匹配项
```


#### call与apply

本文核心讨论以下几个问题
- `call` 和`apply`用来解决什么问题
- `call` 和 `apply`区别在哪里
- 什么情况下用`call`，什么情况下用`apply`
---

### `Function.prototype.call()`

`call`, 函数构造函数的原型方法，使用一个指定的`this`值和单独给出的一个或多个参数来调用一个函数。
> `function.call(thisArg, arg1, arg2, ...)`

- `thisArg`：可选。对象类型，指function运行时使用的`this`值。在*非严格模式*下，指定为`null`或`undefined`时会自动替换为全局对象。
- `arg1`，`arg2`，...：指定的参数列表，按`thisArg`指向函数的形参顺序一一枚举。

##### call的使用案例
1、第一个参数是`this`
```javascript
function Person(name, age) {
    this.name = name
    this.age = age
}
function Student(name, age, sex) {
    Person.call(this, name, age)
    this.sex = sex
}
// 实例化
let ming = new Student({ 'ming', 16, '男' })
let fang = new Student({ 'fang', 15, '女' })
```
2、第一个参数指定的目标环境
```javascript
function greet(name) {
    console.log('hello ' + name)
}
var person = { name: 'ming',  age: 16 }
// call指定上下文的‘this’
greet.call(person) // hello ming
```
3、第一个参数未指定或`undefined`，默认指向Window，非严格模式下将指向真正的`undefined`
```javascript
var superName = 'Wisen'
function sayHi() {
    console.log('Hi ', this.superName)
}
sayHi.call()
```
<br>

### `Function.prototype.apply()`
`apply`，函数构造函数的原型方法，调用一个具有给定`this`值的函数，以及以一个数组（或类数组对象）的形式提供的参数。

> `func.apply(thisArg, [argsArray])`
- `thisArg`：可选。对象类型，指function运行时使用的`this`值。在*非严格模式*下，指定为`null`或`undefined`时会自动替换为全局对象。
- `argsArray`：一个数组或者类数组对象。其中的数组元素将作为单独的参数传给函数。

?>需要强调的是，`apply`的参数虽然是一个数组格式，但调用`apply`的函数接收到的参数格式则是该数组解构后的一个个的参数，而不是数组。


##### apply使用案例
以下两个案例特别适合使用apply来执行。

1、第一个参数是目标环境  <br>

数组的`push`方法，支持每次压入一个值，也支持传入多个参数，一次性压入多个值，但是，如果参数是数组，则会将这个数组直接压入，而不会解构开后压入。<br>
如果要将某数组挨个添加到新数组，此时使用`apply`的自动解构功能则特别合适。该功能有些类似`concat`，但它是生成新数组。
```javascript
let array = ['a', 'b']
let elems = [0, 1, 2, 3]

array.push.apply(array, elems)
console.log(array) // ['a', 'b', 0, 1, 2, 3]
```

2、 第一个参数是`null`  <br>
当第一个参数是null时，表示不需要更换任何执行环境，函数只需要得到参数并执行返回结果即可。
对于一些需要写循环以遍历数组各项的需求，如果数组长度过大，可能造成卡顿，我们可以用`apply`完成以避免循环。
以下是找出最大值的案例。
```javascript
let numbers = [5, 8, 3, 7, 1]
let max = Math.max.apply(null, numbers) 
// 等同于 Math.max(5, 8, 3, 7, 1) 
```
##### apply的替代方案
`apply`的功能效果主要是接收一个数组参数，然后将数组的元素作为单独的参数一个个传给函数。因此，两种替代方案：<br>
（1）可以使用`call`来调用，接收参数时改造成[ES6-Function 剩余参数](/ES6/Function?id=rest参数)；<br>
（2）同样使用`call`，只是传参数时利用[ES6-Array 扩展运算符`...`](/ES6/Array?id=扩展运算符（）)，将数组每一项取出。


<br>

### 区别
`call()` 的语法和作用与 `apply()` 方法类似，只有一个区别，就是 `call()` 方法接受的是一个参数列表，而 `apply()` 方法接受的是一个包含多个参数的数组。

除此之外，其实他们还有些细微的差别，主要体现在使用场景上。

<br>

### 使用场景
&emsp; 首先观察我们的现有参数是数组类型还是单个变量，如果是数组或类数组，再观察调用`apply`的`Function`接收的形参列表，其参数顺序是否和现有参数数组一致，因为`apply`的参数数组是本质是一个个有序的取出的原因，如不一致则不适合使用`apply`。<br>
&emsp; `call`的使用限制比较少，主要是参数要一一列出比较麻烦。

<br>
---
<br>
&emsp;
<br>

#### 题外话：记忆联想
&emsp; 总有人记不住`call`和`apply`到底那个是一个参数，哪个是多个参数，这里做个简单的比喻：`call`是打电话叫朋友来家里玩，来的可以是多个朋友，记多个参数。而`apply`是去朋友家玩，你又不会影分身，一次只能去一个朋友家，记一个参数。


<br/>
<br/>

[下一篇：Array_like-Object](/JS_basic/Array_like-Object)

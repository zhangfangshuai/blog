#### ES6对函数的增强

##### 1、参数支持默认值
ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。 <br>
优势1: 能很明确的表示出参数可以省略不传，而不需要查看函数体内容 <br>
优势2: 有利于将来的代码优化，即便后续函数调用彻底拿掉参数了，此处也不会报错
```javascript
function log(x, y = 'World') {
  console.log(x, y);
}
log('Hello') // Hello World

// 使用参数默认值时，函数不能有同名参数。
function foo(x, x, y) {}  // 正常
function foo(x, x, y = 1) {}  // 报错

// 参数默认值是惰性求值。即每次执行函数时，会重新去计算下默认参数的值，而不是一直记住
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}
foo() // 100

x = 100;
foo() // 101 - 执行本函数时，会重新计算 x+1 的值而不是取上次的值
```
<br>

##### 2、与解构赋值结合使用
当函数未传入实参时，形参处会报错，但是结合解构赋值，可以避免这种报错
```javascript
function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5

// 注意：函数参数的默认值生效以后，参数解构赋值依然会进行。
function f({ a, b = 'world' } = { a: 'hello' }) {
  console.log(b);
}

f() // world
```
注意区分下如下函数执行结果
```javascript
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]
```
<br>

##### 3、默认值参数一般为尾参数
对于非尾部的参数设置默认值，实际上这个参数是没法省略的，必须手动输入`undefined`才能触发，`null`也不行
```javascript
// 例一
function foo(x = 1, y) {
  return [x, y];
}

foo(, 1) // 报错
foo(undefined, 1) // [1, 1]
foo(null, 1)  // [null, 1]
```
<br>

##### 4、函数length属性失真
&emsp; 因为length属性的含义是，该函数预期传入的参数个数。某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了。 
也就是说，函数的length属性，将返回没有指定默认值的参数个数

!> 当默认参数不是尾参数，将会阻断后续参数的查找
```javascript
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
// 参数length个数查找被默认值阻断
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
```
<br>

##### 5、默认参数作用域
&emsp; 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。

```javascript
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1
```
上面代码中，函数`f`调用时，参数`y = x`形成一个单独的作用域。这个作用域里面，变量`x`本身没有定义，所以指向外层的全局变量`x`。函数调用时，函数体内部的局部变量`x`影响不到默认值变量`x`。
```javascript

var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1
```
上面代码中，函数`foo`的参数形成一个单独作用域。这个作用域里面，首先声明了变量`x`，然后声明了变量`y`，`y`的默认值是一个匿名函数。这个匿名函数内部的变量`x`，指向同一个作用域的第一个参数`x`。函数`foo`内部又声明了一个内部变量`x`，该变量与第一个参数`x`由于不是同一个作用域，所以不是同一个变量，因此执行`y`后，内部变量`x`和外部全局变量`x`的值都没变。

如果将`var x = 3`的`var`去除，函数`foo`的内部变量`x`就指向第一个参数`x`，与匿名函数内部的`x`是一致的，所以最后输出的就是2，而外层的全局变量`x`依然不受影响。


<br>

### rest参数

意为：剩余的参数。形式：`...变量名`，该变量是一个数组。<br>

?> rest参数必须是最后一个，rest之后定义有参数将报错，rest参数自身不被`function`的`lenth`识别。
```javascript
function foo(first, ...others) {
    others.forEach(arg => {
        console.log(arg)
    })
}
foo(1, 2, 3, 4, 5)  // 2，3，4，5
foo.length // 1
```

`arguments`是一个部署了Interater接口的类数组对象，需要使用`Array.from()`来将其转化为数组后再遍历。而rest参数是真正的数组
```javascript
// arguments变量的写法
function sort1() {
  return Array.from(arguments).sort();
}

// rest参数的写法
const sort2 = (...args) => args.sort();
```
<br>

### name属性
函数的name属性，返回该函数的函数名。ES5就已支持，ES6正式写入标准。 <br>
对于匿名函数的字面量定义法，ES5返回空，而ES6返回真实函数名
```javascript
var f = function () {};
f.name // "" - ES5
f.name // "f" - ES6
```
<br>

### 箭头函数
ES6 一种新的定义函数的方式，即使用“箭头”（`=>`）定义函数。
- 如果只有一个参数，可以参略函数参数的圆括号
- 如果函数体只有一个执行逻辑且需要返回，可以参略函数体的花括号。如果不返回，花括号不可以省略。
- 如果要返回的是一个对象，由于对象本身具有花括号，而花括号会被解释为代码块。此时需要个返回对象添加圆括号，否则会报错。

```javascript
let f = v => v;  // 定义

let getTempItem = id => ({ id: id, name: "Temp" })   // 返回对象
// 等同于
let getTempItem2 = id => {
    return {id: id, name: "Temp"}
}

// 与rest 结合使用案例
const headAndTail = (head, ...tail) => [head, tail];

headAndTail(1, 2, 3, 4, 5)  // [1,[2,3,4,5]]
```

#### 使用注意点
1. **箭头函数没有自己的`this`对象，它的`this`就是定义时执行环境中的`this`，或者说是对定义时`this`的一个拷贝。也就是说，这个`this`是固定不变的，这点与普通函数可以通过`call`、`apply`、`bind`等方式改变`this`指向有很大的不同。**
2. **箭头函数里的`this`变量，是在箭头函数定义时决定，而普通函数里的`this`，由执行时所决定**
3. 箭头函数不能作为构造函数，不能使用`new` 关键字（也是因为它没有`this`）
4. 没有`arguments`对象，但可以使用`...rest`来代替。在它内部打印`arguments`时，本质是在打印外层的该值。
5. 不可以使用`yield`命令，因此箭头函数不能用作`Generator`函数

!> 绝大多数的回调函数内的`this`，都是指向的`Window`，原因是大多数回调函数都是利用**发布订阅者模式**实现

```javascript
var id = 21
// setTimeout内使用箭头函数定义，this本质是外层fn1的this，指向了定义时所在的作用域
function fn1() {
    console.log('fn1:', this.id)  // fn1: 42
    setTimeout(() => {
        console.log('fn1_inner:', this.id)  // fn1_inner: 42
    }, 100);
}
fn1.call({ id: 42 })

// setTimeout内使用普通函数定义，具有自身的this，指向了运行时所在的作用域.
// setTimeout方法本质上是 window.setTimeout()，所以其内部回调函数的this指向的是全局即Window，因此打印21.
function fn2() {
    console.log('fn2:', this.id) // fn2: 42
    setTimeout(function() {
        console.log('fn2_inner:', this.id)  // fn2_inner: 21
    }, 100);
}
fn2.call({ id: 42 }) 
```
?> 注意，以上案例中，`id`不能使用`let`定义，因为在延时回调函数`fn2`执行时，使用`let`定义的`id`参数已经被GC回收，因此会打印 `fn2_inner: undefined`。而var在全局上定义的，是全局变量，不会被回收


箭头函数实际上可以让`this`指向固定化，绑定`this`使得它不再可变，这种特性很有利于封装回调函数，如下，使用普通函数的逻辑就不是那么容易理解。
```javascript
function Timer() {
    this.s1 = 0
    this.s2 = 0
    // 箭头函数
    setInterval(() => {
        this.s1++
    }, 1000)
    // 普通函数
    setInterval(function () {
        console.log(this)  // Window
        this.s2++;  // 执行结果，undefined++  ==> NaN
    }, 1000)
}

var timer = new Timer()

setTimeout(() => console.log('s1: ', timer.s1), 3100);  // 3
setTimeout(() => console.log('s2: ', timer.s2), 3100);  // 0
```
又如

```javascript
var handler = {
    id: '123456',

    init: function() {
        document.addEventListener('click',
        // 这里如果使用普通函数，就不能直接调用doSomething方法了，或者就需要用_this来存储下handler的this
        event => this.doSomething(event.type), false);
    },

    doSomething: function(type) {
        console.log('Handling ' + type  + ' for ' + this.id);
    }
};
```

#### Babel转箭头函数里的this
其实很简单，正是平时我们使用的变量存储，这也再次说明了箭头函数内根本没有`this`，而是直接引用的外部`this`
```javascript
function foo() {  // ES6
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;
  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
```
<br>

#### 不适用场景
1. 由于箭头函数依赖外层的`this`，因此，当外层无法构成单独作用域时，如对象定义；就不适用了。
```javascript
const dog = {
    weight: 20,
    // 这里JS引擎执行逻辑是：先在全局空间下生产这个箭头函数，然后赋值给dog.grow属性，也就是说这里的this指向Window
    grow: () => {
        this.weight++  // 对象没有私有作用域（注意块级作用域并不是私有作用域），因此没有this
    }
}
```

2. 由于箭头函数的`this`是函数定义时决定的，因此当需要`this`动态改变时，就不适用了。
```javascript
var button = document.getElementById('press')
// 这里使用箭头函数，
button.addEventListener('click', () => {
    this.classList.toggle('on')  // 报错，this指向Window, this.classList是undefined
})
// 使用普通函数
button.addEventListener('click', function() {
    this.classList.toggle('on')  // 正确执行。this指向button对象
})
```
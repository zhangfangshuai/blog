#### Generator生成器，ES6提供的全新的实现异步编程解决方案

### 基本介绍

&emsp; Generator 本质上是一个函数，语法上，可以理解为它是一个状态机，封装了多个内部状态；调用该函数，会返回一个遍历器对象(Iterator Object)，可以一次遍历Gnerator函数内部的每一个状态。

&emsp; Generator函数与普通函数的区别：一是`function`关键字和函数名之间有一个星号，一般写法是`function* gen() {}`；二是函数体内部使用`yield`表达式(意为’产出‘)，用来定义不同的内部状态。

```javascript
function* generatorFn() {
    yield 'first'
    yield 'second'
    return 'end'
}

const gen = generatorFn()
```
以上代码声明了一个Generator函数 `gengratorFn`，并给该函数定义了三个状态：`first`、`second`和`return`语句(执行结束)；

&emsp; Generator函数的调用方法与普通函数一样，也是使用圆括号，不同的是，该函数并不会执行，返回的也不是函数运行结果，而是一个指向其内部状态的指针对象，即遍历器对象。必须手动调用遍历器对象的`next()`方法，使得指针指向下一个状态。也就是说：**每次调用`next()`方法，内部指针就从函数头部或上一次停下来的地方开始执行，知道遇到下一个`yield`表达式或`return`语句，返回`yield`后表达式的结果值或`return`语句的结果值**，Generator函数是分段执行的，`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行。

```javascript
gen.next()  // { value: 'first', done: false }
gen.next()  // { value: 'second', done: false }
gen.next()  // { value: 'end', done: true }
// done为true时，再调用next()，返回value都为undefined
gen.next()  // { value: undefined, done: true }
```
函数执行到`return`语句时，表示函数执行结束，如果没有`return`语句，就执行到函数结束。

---
<br>

### `yield`表达式

`yield`表达式是Generator函数执行暂停的标志，也是定义Generator函数状态的办法；`yield`表达式后面的表达式，只有当调用`next`方法、内部指针指向该语句时才会执行，也就是说，它为JS提供了“惰性求值”策略

遍历器对象的`next`方法的运行逻辑如下：<br>
（1）遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。<br>
（2）下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式。<br>
（3）如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。<br>
（4）如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`。<br>

如果Generator函数内部没有`yield`表达式，就成了一个单纯的暂缓执行函数，只有调用`next()`方法时，执行内部全部逻辑。
```javascript
function* f() {
    console.log('执行了！')
}

const generator = f()  // 调用时并不执行

setTimeout(function () {
    generator.next()  // ‘执行了’
}, 2000)
```

!> `yield`表达式本身没有返回值，它只是为Generator函数提供了暂停，并返回出了后面表达式的值到外部，但语句自身并不会返回内容，也就是说，不能通过 `let name = yield 'ming'` 赋值使得`name`等于`'ming'`，而是`undefined`

---
<br>

### `next`方法参数

上述提到，`yield`表达式本身没有返回值，当下一个状态需要依赖上一个状态产生的结果进行继续计算时，就需要用到`next`方法参数。将`yield`返回到调用层的值传回给内部，以达到目的。

```javascript
function* fn() {
    let name = yield 'lucy'
    let sayHi = yield `hello ${name}`
    return sayHi
}

const gen = fn()
let username = gen.next().value  // 'lucy'
gen.next(username).value  // 'hello lucy' - 传了参数，会以上一步的yield表达式执行结果执行赋值语句给name变量
gen.next().value  // undefined  - 没有传参数，第二个yield不会返回值给sayHi
```

!> 第一个`next()`方法传参数是无效的，因为没有上一个`yield`表达式来承接这个值。如果一开始就需要参数，可以通过Generator函数自己携带参数来实现。

---
<br>

### `for...of`遍历Generator

`for...of`是ES6提供的用来遍历具有Iterator接口的数据类型，因此也可以用来遍历Generator函数。由于Generator函数第一步就会生成一个Iterator对象，因此，`for...of`可以很容易的就取出内部所有状态，而无需调用`next()`方法（或者说相当于自动调用了所有`next()`方法）

```javascript
function* foo() {
    yield 1
    yield 2
    yield 3
    yield 4
    yield 5
    return 6
}

for (let v of foo()) {
    console.log(v)
}
// 1 2 3 4 5
```

下面是一个利用 Generator 函数和for...of循环，实现斐波那契数列的例子:

```javascript
function* fibonacci() {
    let [prev, curr] = [0, 1]
    for (;;) {
        yield curr
        [prev, curr] = [curr, prev + curr]
    }
}

for (let n of fibonacci()) {
    if (n > 1000) break
    console.log(n)
}
```

---
<br>

### `.throw()`

`Generator.prototype.throw()` 用于在函数体外抛出错误，然后在Generator内部捕获。

如果内部捕获异常语句已执行，外部再抛出异常时，内部将不再捕获，需要外部自行捕获

```javascript
const gen = function* () {
    try {
        yield
    } catch (e) {
        console.log('内部捕获: ', e)
    }
}

const i = gen()
i.next()  // .throw异常要被内部捕获，至少要执行一次next方法，这样才能找到yield所在位置，最后替换该表达式

try {
    i.throw(new Error('error A'))
    i.throw(new Error('error B'))
} catch (e) {
    console.log('外部捕获: ', e)
}
// 内部捕获: error A
// 外部捕获: error B
```

不要混淆`Generator.prototype.throw()`和全局的`thorw`命令

```javascript
const i = gen()
i.throw(new Error('generator err'))
throw(new Error('global err'))
```
!> `Generator.prototypr.throw()`方法抛出的错误要被内部捕获，前提是必须至少执行过一次`next`方法。因为`.throw()`方法执行的本质是恢复Generator函数继续执行，并立刻替换上一句`yield`表达式，抛出错误。

---
<br>

### `.return()`

`Generator.prototype.return()` 用于给Generator返回指定值，并立即结束函数执行（遍历器的done属性会变成`true`），再调用`next()`方法，`value`都会返回`undefined`

调用`return()`方法的语句本身会返回`return`里的参数

```javascript
function* gen() {
    yield 1
    yield 2
    yield 3
}

var g = gen()

g.next()   // { value: 1, done: false }
g.return()   // { value: undefined, done: true }
```

!> 同`.throw()`，本质上也是恢复了Generator函数继续执行，并立刻替换上一个`yield`表达式为`return`参数并结束函数执行。


---
<br>

### `yield*` 表达式

如果在 Generator 函数内部，调用另一个 Generator 函数，除了自己手动完成内部Generator函数返回的遍历器接口外，还可以使用 `yield*` 表达式

也就是说：`yield*` 表达式是用来在一个 Generator 函数里面执行另一个 Generator 函数。

```js
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```

---
<br>

### Generator实现异步

所谓"异步"，简单说就是一个任务不是连续完成的，可以理解成该任务被人为分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。
异步的发展大概分四个阶段：

- 回调函数
- 事件监听
- 发布/订阅
- Promise 对象

而Generator 函数将 JavaScript 异步编程带入了一个全新的阶段。


##### 回调函数

回调函数把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数。回调函数的英语名字`callback`，直译过来就是"重新调用"。

回调函数一般作为一个参数传入异步任务中，当异步任务执行完成，再调用该函数执行第二段逻辑。

经典的Ajax异步请求就是使用的回调函数策略，等待接口请求成功执行回调函数。


##### Promise

回调函数本身并没有问题，它的问题出现在多个回调函数嵌套，当多个回调函数进行嵌套时，出现了代码的横向发展，难以维护，且层层强耦合。这种情况被称作“回调函数地狱”

Promise 对象就是为了解决这个问题而提出的。它不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用。采用 Promise，连续读取多个文件，写法如下：

```javascript
var readFile = require('fs-readfile-promise');

readFile(fileA)
.then(function (data) {
    console.log(data.toString())
})
.then(function () {
    return readFile(fileB)
})
.then(function (data) {
    console.log(data.toString())
})
.catch(function (err) {
    console.log(err)
});
```

Promise 的写法只是回调函数的改进，使用`then`方法以后，异步任务的两段执行看得更清楚了，除此以外，并无新意。

---

#### Generator函数

##### `协程`

传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。其中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务。

协程有点像函数，又有点像线程。它的运行流程大致如下:

- 第一步，协程A开始执行。
- 第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
- 第三步，（一段时间后）协程B交还执行权。
- 第四步，协程A恢复执行。

上面流程的协程A，就是异步任务，因为它分成两段（或多段）执行。

Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用yield语句注明。

```javascript
function* gen(x) {
    var y = yield x + 2;
    return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
```


##### `异步任务的封装`

如下封装一个异步操作，该操作先读取一个远程接口，然后从 JSON 格式的数据解析信息

```javascript
let fetch = require('node-fetch')

function* gen(){
    let url = 'https://api.github.com/users/github'
    let result = yield fetch(url)
    console.log(result.bio)
}
```

执行这段代码的方法如下：

```javascript
const g = gen()
let result = g.next()

result.value.then(function(data){
    return data.json()
}).then(function(data){
    g.next(data)
})
```

上面代码中，首先执行 Generator 函数，获取遍历器对象，然后使用`next`方法（第二行），执行异步任务的第一阶段。由于`Fetch`模块返回的是一个 Promise 对象，因此要用then方法调用下一个`next`方法。




<br>
<br>

[下一篇：Async](/ES6/Async)

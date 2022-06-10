#### ES6-Promise

&emsp; Promise 是异步编程的一种解决方案，所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

&emsp; 有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

Promise也有缺点：<br>
（1）一旦新建它就会立即执行，无法中途取消。<br>
（2）如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。<br>
（3）当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

### 三种状态
&emsp; Promise对象有三种状态，它的状态不受外界影响，只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。分别是：
- `pending`（进行中）
- `fulfilled`（已成功）
- `rejected`（已失败）

一旦状态改变，就不会再变，任何时候都可以得到这个结果。

Promise对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 `resolved`（已定型）; <br>
这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

<br>

### 初始化
Promise本身是个构造函数，用来生成`promise`实例。

Promise 新建后就会**立即执行**后面的参数函数，也就是说，参数函数的代码是同步执行的。而`resolve`后的`.then`是异步执行的，后文介绍。
```js
const promise = new Promise(function(resolve, reject) {
    // ... some code

    if (/* 异步操作成功 */){
        resolve(value);  // 将Promise对象的状态从“未完成”变为“成功”
    } else {
        reject(error);  // 将Promise对象的状态从“未完成”变为“失败”
    }
})
```

<br>

### `Promise.prototype.then()`

为 Promise 实例添加状态改变时的回调函数。第一个参数是`resolved`状态的回调函数，第二个参数是`rejected`状态的回调函数，它们都是可选的。

`.then`方法返回的是一个新的Promise实例（不是原来的Promise），因此支持链式写法，即`.then`方法后面再调用另一个`.then`方法。

```js
getJSON("/post/1.json")
    .then(function(post) {
        return getJSON(post.commentURL);
    })
    .then(function (comments) {
        console.log("resolved: ", comments);
    }, function (err){
        console.log("rejected: ", err);
    });
```

<br>

### `Promise.prototype.catch()`
`Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。

用于执行Promise的状态由`pending`变成`rejected`时的回调函数，也会捕获`.then()`回调函数执行发生的错误，也会捕获Promise同步执行的函数内发生的错误。

Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个`catch`语句捕获。

```js
getJSON('/post/1.json').then(function(post) {
    return getJSON(post.commentURL);
}).then(function(comments) {
    // some code
}).catch(function(error) {
    // 处理前面三个Promise产生的错误
});
```

<br>

### `Promise.prototype.finally()`

ES2018 引入。`finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。

`finally`不接受参数，因此他不知道Promise执行结果。`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。
```js
promise
    .then(result => {···})
    .catch(error => {···})
    .finally(() => {···});
```

<br>

### `Promise.all()`

用于将多个 Promise 实例，包装成一个新的 Promise 实例。
```js
const p = Promise.all([p1, p2, p3]);
```
p的状态由`p1`、`p2`、`p3`决定，分成两种情况:
1. 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。
2. 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数.


<br>

### `Promise.race()`

```js
const p = Promise.race([p1, p2, p3]);
```
只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。


<br>

### `Promise.allSettled()`
等到一组异步操作都结束了，不管每一个操作是成功还是失败，再进行下一步操作
```js
const promises = [
    fetch('/api-1'),
    fetch('/api-2'),
    fetch('/api-3'),
];

await Promise.allSettled(promises);
removeLoadingIndicator();
```

<br>

### `Promise.any()`

ES2021 引入。
- 只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；
- 如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。

```js
const promises = [
    fetch('/endpoint-a').then(() => 'a'),
    fetch('/endpoint-b').then(() => 'b'),
    fetch('/endpoint-c').then(() => 'c'),
];

try {
    const first = await Promise.any(promises);
    console.log(first);
} catch (error) {
    console.log(error);
}
```

<br>

### 案例：实现图片预加载

将图片的加载写成一个Promise，一旦加载完成，Promise的状态就发生变化。
```js
const preloadImage = function (path) {
    return new Promise(function (resolve, reject) {
        const image = new Image()
        image.onload  = resolve
        image.onerror = reject
        image.src = path
    })
}


// 真实案例
var url='jsonp-master/0.jpg'
var url1='jsonp-master/1.jpg'
var url2='jsonp-master/2.jpg'
var img=document.createElement('img');
var img1=document.createElement('img');
var img2=document.createElement('img');
img.src=url;
img1.src=url1;
img2.src=url2;
 
function loading(img){
    return new Promise(function(resolve,reject){
        img.onload=function(){
            resolve(img)
        }
    })
}
//图片预加载  等所有图片都加载完毕后统一显示
Promise.all([
    loading(img),loading(img1),loading(img2)
]).then(function(res){
    for(var i=0;i<res.length;i++){
        document.body.appendChild(res[i])
    }
})
//谁加载的快就显示谁
Promise.race([
    loading(img),loading(img1),loading(img2)
]).then(function(res){
        document.body.appendChild(res)
})
```

<br>

### 手写Promise

手写Promise需要从Promise的用法入手，如下是一个基础的Promise案例
```js
let p = new Promise((resolve, reject) => {
    if (true) {
        resolve({ msg: '成功了' })
    } else {
        reject({ msg: '失败了' })
    }
})

p.then(res => {
    console.log(res)
}, err => {
    console.log(err)
})
```
观察Promise的用法，可以确定如下几个信息：
1. Promise自身是一个构造函数，接受一个函数类型的参数
2. 需要三个状态（status）: `pending、fulfilled、rejected`，且状态凝固后不可再改变
3. 需要两个方法 `resolve`、`reject`。
4. 需要一个返回值，用于执行成功之后作为`resolve`函数参数使用
5. 需要一个失败原因，用于执行失败之后，作为`reject`函数参数使用
6. 使用`new`关键字生成实例化对象时，需要立刻执行参数函数
7. 需要`then`函数，每一个实例化对象都需要继承该函数。支持接收两个参数，第一个是成功的回调，第二个是失败的回调
8. 需要`catch`函数，每一个实例化对象都需要继承该函数。支持接收一个参数，表示失败的回调
9. 链式调用本例不实现

```js
// 1. 定义Promise为一个函数
function MyPromise(callback) {
    // 2. 需要三个状态，一个成功返回的结果，和一个失败的原因
    this.status = 'pending'   // 当前执行状态
    this.value = null         // 成功之后返回数据
    this.reason = null        // 失败的原因

    // 5.1 解决异步问题，采用发布订阅模式，存储异步执行完成后的回调函数
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    resolve = (value) => {
        if (this.status === 'pending') {  // 保证状态凝固后，结果就不可改变
            this.value = value   // 存储成功的数据
            this.status = 'fulfilled'

            // 6.1 解决异步问题，状态发生变更，执行回调函数
            this.onFulfilledCallbacks.forEach(fn => fn(value))
        }
    }

    reject = (reason) => {
        if (this.status === 'pending') {
            this.reason = reason  // 存储失败的原因
            this.status = 'rejected'
            
            // 6.2 解决异步问题，状态发生变更，执行回调函数
            this.onRejectedCallbacks.forEach(fn => fn(reason))
        }
    }

    // 4. 当实例化对象时，需要立即执行回调函数参数
    callback && callback(resolve, reject)
}

// 3. then、catch方法需要被实例化对象继承，因此需要定义在原型上
MyPromise.prototype.then = function(onFulfilled, onRjected) {
    // 4. fulfilled之后，都会调用.then方法，
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (data) => { resolve(data) }
    onRejected = typeof onRejected === 'function' ? onRjected : (err) => { throw err }

    // 利用发布订阅模式实现回调
    // 5.2 解决异步问题，将回调函数存在暂存区，当状态发生变更时，再去执行回调函数
    if (this.status === 'pending') {
        this.onFulfilledCallbacks.push(onFulfilled)
        this.onRejectedCallbacks.push(onRejected)
    }
}

// 3.1 .catch是.then第二个参数的语法糖
MyPromise.prototype.catch = function(onRejcted) {
    this.then(null, onRejected)
}
```


#### ES6-Async

`async` 函数，本质上就是 Generator 函数的语法糖。用于使异步操作变得更加方便，将其改成同步写法，提供等待异步返回的办法。

`async`函数返回一个 Promise 对象，可以使用`then`方法添加回调函数。当函数执行的时候，一旦遇到`await`就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

### 语法

#### 返回 Promise 对象

&emsp; `async`函数返回一个 Promise 对象。函数内部`return`语句返回的值，会成为`then`方法回调函数的参数。内部抛出错误，会导致返回的 Promise 对象变为`reject`状态。抛出的错误对象会被`catch`方法回调函数接收到。

```js
// return 会被.then接收
async function f() {
    return 'hello world';
}
f().then(v => console.log(v)) // "hello world"

// 抛出的错误对象会被`catch`方法回调函数接收
async function f() {
    throw new Error('出错了');
}
f().then(
    v => console.log('resolve', v),
    e => console.log('reject', e)
)
//reject Error: 出错了
```


#### Promise 对象的状态变化

`async`函数返回的 Promise 对象，必须等到内部所有`await`命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到`return`语句或者抛出错误。也就是说，只有`async`函数内部的异步操作执行完，才会执行`then`方法指定的回调函数。

<br>

### await 命令
`await`命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
```js
async function f() {
    return await 123;  // 等同于return 123;
}

f().then(v => console.log(v))   // 123
```

<br>

### <div style="color: red">实现Js休眠器sleep()</div>
利用await实现一个休眠器
```js
// 休眠器
function sleep(interval) {
    return new Promise(resolve => {
        setTimeout(resolve, interval);
    })
}

// 用法
async function counter() {
    for(let i = 1; i <= 5; i++) {
        console.log(i);
        await sleep(1000);
    }
}

counter();
```

<br>

### 遍历异步函数顺序执行
使得异步函数得以顺序执行，可以使用`for...of`或者数组的`reduce()`方法，后者能实现很好理解，使用`for...of`能实现的原因是其本质是调用Iterator接口，而Iterator内部判断`done`为`true`时才继续执行`next()`。注意但不能使用forEach()方法

```js
// 使用for...of
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  for (let doc of docs) {
    await db.post(doc);
  }
}
```

```js
// 使用 reduce
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  await docs.reduce(async (_, doc) => {
    await _;
    await db.post(doc);
  }, undefined);
}
```

### 注意点

##### 1、添加try-catch
`await`命令后面的Promise对象，运行结果可能是`rejected`，所以最好把`await`命令放在`try...catch`代码块中。
```js
async function myFunction() {
    try {
        await somethingThatReturnsAPromise();
    } catch (err) {
        console.log(err);
    }
}

// 另一种写法
async function myFunction() {
    await somethingThatReturnsAPromise()
    .catch(function (err) {
        console.log(err);
    });
}
```


##### 2、多个await优化
多个`await`命令后面的异步操作，如果不存在继发关系（即后一个执行等待前一个执行完成），最好让它们并发执行，缩短等待。
```js
let foo = await getFoo();
let bar = await getBar();
// 改成
let [foo, bar] = await Promise.all([getFoo(), getBar()])
```


##### 3、await只能用在async函数中
`await`命令只能用在`async`函数之中，如果用在普通函数，就会报错


##### 4、async 函数可以保留运行堆栈
```js
const a = () => {
    b().then(() => c());
};
```
上面代码中，函数`a`内部运行了一个异步任务`b()`。当`b()`运行的时候，函数`a()`不会中断，而是继续执行。等到`b()`运行结束，可能`a()`早就运行结束了，`b()`所在的上下文环境已经消失了。如果`b()`或`c()`报错，错误堆栈将不包括`a()`。
```js
const a = async () => {
    await b();
    c();
};
```
改完后，执行`b()`时，`a`只是暂停，上下文都保留着，一旦`b()`或`c()`报错，错误堆栈将包括`a()`。


<br>
<br>

[下一篇](/ES6/Class)

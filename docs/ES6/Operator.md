#### ES6对运算符的扩展

### 指数运算符(`**`)
ES2016 新增了一个指数运算符`**`， 它是右结合的，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。
```js
2 ** 3 // 8
2 ** 3 ** 2 === 2 ** 9 // true
```
可以和等号结合运算
```js
let num = 2;
num **= 3; // 等同于 num = num * numb * num
console.log(num) // 8
```

### <span style="color: red">链判断运算符(`?.`)</span>

ES2020引入 <br>
&emsp; 对于一个深层对象，要一层层读取属性，如果属性的上层对象不存在，就会报错。我们需要提供安全写法来规避。
```js
// 错误的写法
const  firstName = message.body.user.firstName || 'default';

// 正确的写法
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';

// 或者使用三目表达式来兼容错误
```
这种写法相对来说还是太麻烦了

ES6提供了<b style="color: purple">链判断运算符`?.`</b>，可以**自动判断左侧对象是否为`null`或`undefined`，存在则读取属性，不存在停止计算返回`undefined`** 。那么以上案例可以修改成：

```js
const firstName = message?.body?.user?.firstName || 'default'
```

另外，同样可以用在属性表达式上

```js
let a = { y: 1 }
a?.[x]  // undefined
```


##### 对方法的判断
```js
// ES5
function foo(callback) {
    callback && callback()
}
// ES6 - 如果方法存在，则执行该方法
function foo(fn) {
    fn?.()
}
foo(() => { console.log('this is callback') })
// this is callback
```

链判断运算符的几个特征：
1. 短路机制 <br>
`?.`运算符相当于一种短路机制，只要不满足条件，就不再往下执行
2. 括号的影响 <br>
如果属性链有圆括号，则对圆括号外部没有影响，只对圆括号内部有影响。一般来说，使用?.运算符的场合，不应该使用圆括号。
3. 以下场景会报错：
    - 被用作构造函数 `new a?.()`
    - 运算符右侧有模板字符串  <span style="color: red">a?.\`(b)\`</span>
    - 用于赋值运算符左侧 `a?.b = c`; 它目的是用来取数，而非写数
4. 右侧不得为十进制数值
`foo?.3:0`将被解析成`foo ? .3 : 0`

<br>

### <span style="color: red">Null判断运算符(`??`)</span>

ES2020引入 <br>
&emsp; 在读取对象属性时，当属性值为 `null` 或 `undefined`，有时候需要为他们指定默认值，常见做法是通过`||`来实现。但是有个弊端，即当属性的值如果为空字符串或`false`或`0`时，默认值也会生效

&emsp;  `Null`判断运算符`??`行为类似`||`，但它解决了该问题，只有运算符左侧的值为`null`或`undefined`时，才会返回右侧的值。

&emsp; 这个运算符的一个目的，就是跟链判断运算符`?.`配合使用，为`null`或`undefined`的值设置默认值。
```js
const duration = res.settings?.duration ?? 300;
```
!> `??`它本质也是一种逻辑运算。如果`||`与`??`混合使用，或`&&`与`??`混合使用，必须使用圆括号括起来手动指定执行优先级

<br>

### 逻辑赋值运算符
ES2021引入三个新的逻辑赋值运算符，将逻辑运算符与赋值运算符进行结合，用于代码的简写 <br>

三个运算符分别为：`||=`、`&&=`、`??=`，相当于**先进行逻辑运算，然后根据运算结果，再视情况进行赋值运算。**

```js
// 或赋值运算符
x ||= y
// 等同于
x || (x = y)  // 先执行逻辑运算，再执行赋值运算

// 与赋值运算符
x &&= y
// 等同于
x && (x = y)

// Null 赋值运算符
x ??= y
// 等同于
x ?? (x = y)
```

##### 设置默认值
```js
// 老的写法
user.id = user.id || 1;

// 新的写法
user.id ||= 1;
```


<br>
<br>

[下一篇](/ES6/Symbol)
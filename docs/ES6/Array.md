#### ES6对数组的增强


### 扩展运算符 `...`
!> 扩展运算符内部实现本质是`for...of`

将一个数组转为用逗号分隔的参数序列。或者说是挨个取出数组的每一项；
```javascript
...[1, 2, 3]   // 1 2 3
```
可用于函数参数调用时，来取出函数剩余参数的每一项
```javascript
function push(array, ...items) {  // 剩余参数 ...rest
  array.push(...items)  // 扩展运算符
}
push([], 1, 2, 3)
console.log(array) // [1, 2, 3]
```
可以用来取代`apply()`方法
```javascript
const arr = [12, 4, 28]
Math.max.apply(null, arr)

// ES6写法
Math.max(...arr)
```

##### 扩展运算符的应用
###### 1、复制数组
以下两种方法都只实现了一层的数组的拷贝，数组成员都是对原数组成员的引用
```javascript
// ES5
const a1 = [1, 2]
const a2 = a1.concat()
a2[0] = 100
console.log(a1)  // 1, 2

// ES6
const a3 = [...a1]  // 或 [...a3] = a1
a3[0] = 200
console.log(a1)  // 1, 2
```

###### 2、合并数组
```javascript
const a1 = [1, 2], a2 = [3, 4]
const a3 = [...a1, ...a2]
```

###### 3、结合解构赋值
```javascript
const [first, ...rest] = [1, 2, 3, 4, 5]
console.log(first)  // 1
console.log(rest)  // [2, 3, 4, 5]
```
###### 4、转字符串为数组
```javascript
[...'hello']  // ['h', 'e', 'l', 'l', 'o']
```

###### 5、将类数组对象转化为数组
!> 该特性在ES6中非常有用。类数组不能用做`forEach`循环，经过扩展运算符转成正常数组后即可循环

```javascript
let nodeList = document.querySelectorAll('div')
let array = [...nodeList]
```

<br>

### `Array.from()`
##### 第一个参数：转换对象
&emsp; 用于将类数组对象和可遍历对象转为真正的数组。实际上，任何有`length`属性的对象，都可以通过`Array.from()`方法转换。
```javascript
// 类数组对象
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
}
// ES5
var arr1 = [].slice.call(arrayLike)  // ['a', 'b', 'c']
var arr2 = Array.prototype.slice.call(arrayLike)
// ES6
let arr3 = Array.from(arrayLike) // ['a', 'b', 'c']
```
没有部署该方法的浏览器可以使用如下方案替代：
```javascript
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();
```

##### 第二个参数：处理函数
&emsp; 支持接受一个函数作为第二个参数，作用类似于数组的`map()`方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
```javascript
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);
```
使用案例
```javascript
// 获取函数各个参数的数据类型
function typesOf () {
  return Array.from(arguments, value => typeof value)
}
typesOf(null, [], NaN)   // ['object', 'object', 'number']
```

<br>

### `Array.of()`
&emsp; 将一组值，转换为数组。<br>
&emsp; 该方法主要目的是弥补数组构造函数`Array()`的不足，即因为参数个数的不同，`Array()`的行为有差异。不传参数时返回一个空数组，传入一个参数`n`时表述创建数组的长度为`n`，而传入多个参数时，各参数又代表生成数组的每一项。<br>
&emsp; `Array.of()`总是返回参数值组成的数组。如果没有参数，就返回一个空数组。
```javascript
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```
&emsp; 对于没有部署该方法的浏览器可以用如下方法替代：
```javascript
function ArrayOf(){
  return [].slice.call(arguments);
}
```

<br>

### `.copyWithin()`
!> 会改变原数组自身

**实例方法**，接收三个参数：`arr.copyWithen(target, start = 0, end = this.length)`
- `target`（必需）：从该位置开始替换数据。如果为负值，表示倒数。
- `start`: 开始读取下标，默认为 0。如果为负值，表示从末尾开始计算。
- `end`: 停止读取位置，默认为数组长度。如果为负值，表示从末尾开始计算。

```javascript
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)   // [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)   // [4, 2, 3, 4, 5]
```

<br>


### `.find()、.findIndex()`
#### .find()
**实例方法**，用于找出**第一个**符合条件的数组成员，然后返回该成员。如果没找到则返回`undefined`。<br>

接收两个参数，分别为：
- 回调函数，针对每个元素依次执行，并找到符合条件的成员。支持接收三个参数分别：
    - 当前的值
    - 当前的位置
    - 原数组
- 绑定回调函数的`this`对象

```javascript
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
```

#### .findIndex()
**实例方法**：与`.find()`几乎相同，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1`。
```javascript
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

<br>


### `.fill()`
**实例方法**：使用给定值，填充一个数组。

支持三个参数分别为：
- 填充内容
- 起始填充位置（闭区间）
- 结束填充位置（开区间）
```javascript
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

<br>


### `.keys()`
**实例方法**：遍历数组：取出每一项的键进行遍历，返回Iterator对象，可以使用`for...of`遍历
```javascript
let array = ['a', 'b']
console.log(array.keys) // Array Iterator 
for (let index of array.keys()) {
  console.log(index);
}
// 0
// 1
```

### `.values()`
**实例方法**：遍历数组：取出每一项的值进行遍历，返回Iterator对象，可以使用`for...of`遍历
```javascript
let array = ['a', 'b']
for (let elem of array.values()) {
  console.log(elem);
}
// 'a'
// 'b'
```

### `.entries()`
**实例方法**：遍历数组：取出每一项键值对进行遍历：返回Iterator对象，可用`for...of`遍历
```javascript
for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

<br>


### `.includes()`
**实例方法**：查找数组是否包含给定的值，返回布尔值。

支持两个参数，分别为：
- 要查找的指定值
- 查找的起始位置，默认0；为负数表述倒数，整数超出长度检索永远为false，负数超出长度默认从0开始检索。
```javascript
[1, 2, 3].includes(3， 3);    // false
[1, 2, 3].includes(3, -4);   // true
```

<br>


### `.flat() 拉平数组`
**实例方法**：对于深层数组，`Array.prototype.flat()`用于将嵌套的数组“拉平”变成一维的数组。不改变原数组。

支持一个参数，表示要拉平的层级，不传代表只拉平一层。`Infinity`代表拉平所有层 <br>
原数组中有空位则跳过该项，因此拉平后的数组长度有可能比之前的还短。
```javascript
[1, 2, [3, [4, 5]]].flat()   // [1, 2, 3, [4, 5]]
[1, 2, [3, [4, 5]]].flat(2)   // [1, 2, 3, 4, 5]
[1, 2, [3, [4, [5, [6, [7, 8]]]]]].flat(Infinity)   // [1, 2, 3, 4, 5, 6, 7, 8]
[1, 2, , 4, 5].flat()  // [1, 2, 4, 5]
```

### `.flatMap()`
**实例方法**：`Array.prototype.flatMap()`用于拉平数组的前，针对每一项执行下回调函数（先`.map()`后`.flat()`），也不改变原数组。

支持两个参数，分别是：
- 遍历函数，该函数支持三个参数：
    - 当前数组成员
    - 成员位置下标
    - 原数组
- 绑定函数执行环境`this`

?> `.flatMap`只能展开一层数组，多层依旧会保留嵌套
```javascript
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])    // [2, 4, 3, 6, 4, 8]

arr.flatMap(function callback(currentValue[, index[, array]]) {
  // ...
}[, thisArg])
```

<br>


### `.at()`
**实例方法**：接受一个整数作为参数，返回对应位置的成员，支持负索引。 <br>
这个方法不仅可用于数组，也可用于字符串和类型数组（TypedArray）。
```javascript
const arr = [5, 12, 8, 130, 44];
arr.at(2) // 8
arr.at(-2) // 130
```

<br>


### `数组空位`
数组空位表示该位置上没有任何东西，不是`null`也不是`undefined`，就是啥也没有。<br>
ES5对空位的处理大部分都是跳过，如`forEach(), reduce(), every()`等；`map()`是跳过空位但保留这个值；`join`则视为`undefined`
ES6明确规范了空位转为`undefined`，这样，属于ES6的方法如`...`、`for...of`、`Array.from()`等都会将其处理为`undefined`
```javascript
// 构造函数生数组时，产生了一个长度为3的数组，且都是空位。
let arr = Array(3)   // [, , ,]

// values()
[...arr.values()] // [undefined, undefined, undefined]
```



&emsp; <br/>
&emsp; <br/>
[下一篇](/ES6/Object)
### Interator - 遍历器


&emsp; 遍历器（Iterator），它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

&emsp; 遍历器对象本质上，就是一个指针对象。

&emsp; JS有四种“集合”，分别为：数组（Array）,对象（Object），Map 和 Set。任意一种数据结构中都可以嵌套其他类型的集合，如数组的成员是Map，Map的成员是对象等。这种复杂的数据格式，在ES6之前无法进行遍历，而Iterator接口，就是为解决这个问题而出现。


Iterator的作用有三个：
- 各种数据结构提供一个统一的、简便的访问接口，即Iterator接口
- **使得数据结构的成员能够按某种次序排列**
- ES6创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。


#### 几种会调用遍历器接口的场合

- for...of
- Array.from()
- Map(): 如 new Map([['a', 1], ['b', 2]])
- Set()
- Promise.all()
- Promise.race()



#### 字符串的 Iterator 接口
字符串是一个类似数组的对象，也原生具有 Iterator 接口。
```js
...'hello'  // h e l l o
```

---
<br>

### `for...of`

ES6 `for...of`循环，作为遍历所有数据结构的统一的方法。

一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有 iterator 接口，就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的Symbol.iterator方法。如数组、Set 和 Map 结构、某些类似数组的对象

#### 数组使用`for...of`
```js
const arr = ['red', 'green', 'blue'];

for(let v of arr) {
  console.log(v)     // red green blue
}
```


#### 对象使用`for...of`
!> 普通的对象不能直接使用`for...of`循环，因为它没有部署`Symbol.iterator`接口
```js
const es6 = { a: 1, b: 'hello' }
for (let e in es6) {
    console.log(es6[e])  // 1, 'hello'
}
for (let attr of es6) {
    console.log(attr)   // TypeError: es6[Symbol.iterator] is not a function
}

// 给对象部署Symbol.iterator即可使用for...of循环
const arr = ['red', 'green', 'blue'];
const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

for(let v of obj) {
  console.log(v); // red green blue
}
```

<br>

### `for...of`对比其他循环

##### 1、`for...in`
`for...in`循环有几个缺点:
- 数组的键名是数字，但是`for...in`循环是以字符串作为键名“0”、“1”、“2”等等
- `for...in`循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至**包括原型链上的键**
- 某些情况下，`for...in`循环会以任意顺序遍历键名

总之，`for...in`循环主要是为遍历对象而设计的，不适用于遍历数组。

<br>

##### 2、`forEach`
无法中途跳出循环，`break`命令或`return`命令都不能奏效。


<br>

##### 3、`for...of`优势
- 有着同`for...in`一样的简洁语法，但是没有`for...in`那些缺点。
- 不同于`forEach`方法，它可以与`break`、`continue`、`return`配合使用。
- 提供了遍历所有数据结构的统一操作接口。


<br>
<br>

[下一篇：Async](/ES6/Async)

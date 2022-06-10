#### ES6 Set数据类型

### 概要总结 <!-- {docsify-ignore} -->
1. Set是ES6提供的新的数据类型，它类似于数组，但成员的值都是唯一的，没有重复，也不可以重复添加`add()`。
2. Set是Set，不是数组；它具有自己的原型方法如`keys`, `forEach`等，没有数组的原型方法如`map`，`filter`等，不能混淆调用。
3. Set取大小用`size`，不用数组的`length`。
4. Set没有`Key`，或者说它的`Key`和`Value`指向的是同一个内容，可以通过`keys()`、或`values()`获取。可以理解为`值-值`关系。
5. Set可以通过扩展操作符`[...set]`转化为数组；数组也可以通过`new Set(arr)`转化为Set。
6. Set可以做数组去重`[...new Set(arr)]`。
7. Set想调用数组方法如`filter`，可以先转为数组后调用，再转回Set即可。
8. 对于严格相等，`NaN !=== NaN`成立；而对于Set，不可以重复添加NaN，即认为他们是相等的。


### 初始化 <!-- {docsify-ignore} -->
本身是一个构造函数，用来生产Set数据结构。它可以接受一个数组，用作初始化参数。
```js
const set = new Set([10, 31, 26])
console.log(set)   // Set(3) {10, 31, 26}
console.log(set.size)   // 3  【size】返回Set实例的成员总数。
```


### size属性 <!-- {docsify-ignore} -->
`Set.prototype.size`：返回Set实例的成员总数。

---

### add()

`Set.prototype.add(value)`：用于添加某个值，会改变自身。返回Set结构本身，因此支持链式调用
```js
let set = new Set()
set.add(1)
set.add(2).add(3).add(4)  // Set(4) {1, 2, 3, 4}
```

### delete()
`Set.prototype.delete(value)`：用于删除某个值，会改变自身。返回Boolean，表示删除是否成功
```js
let set = new Set([1, 2, 3, 4])
set.delete(1)
set.delete(2)  // Set(2) {3, 4}
```

### has()
`Set.prototype.has(value)`：判断该值是否为Set的成员，返回一个布尔值。
```js
let set = new Set([1, 2, 3, 4])
set.has(4)   // true
set.has(5)   // false
```


### clear()
`Set.prototype.clear()`：清除所有成员，没有返回值。
```js
let set = new Set([1, 2, 3, 4])
set.clear()  // Set(0) {size: 0}
```

<br>

#### 遍历操作

Set 结构的实例有四个遍历方法，可以用于遍历成员。<br>

需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。 <br>

>也可以使用`for...of`直接遍历Set，得到的结果同`.Values()`


### values()
`Set.prototype.values()`：返回键值的遍历器
```js
let set = new Set([1, 2, 3, 4])
console.log(set.values()) // SetIterator {1, 2, 3, 4}
for (let item of set.values()) {
  console.log(item) // 1, 2, 3, 4
}
```


### keys()

`Set.prototype.keys()`：返回键名的遍历器
由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`方法和`values`方法的行为完全一致。
```js
let set = new Set(['red', 'green', 'blue']);
for (let item of set.values()) {
  console.log(item) // 'red' 'green' 'blue'
}
```


### entries()

`Set.prototype.entries()`：返回键值对的遍历器
```js
let set = new Set([1, 'a', 's', 3])
console.log(set.entries())   // SetIterator {1 => 1, 'a' => 'a', 's' => 's', 3 => 3}}
for (let item of set.entries()) {
  console.log(item) []  // [10, 10]  ['a', 'a']  ['s', 's']  ['3', '3']
}
```


### forEach()
Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。
```js
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + '对应值是 ' + value))
// 1 对应值是 1
// 4 对应值是 4
// 9 对应值是 9
```

---

<br>

#### Set的几个应用

###### 1. 去除数组的重复成员
```js
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
// [3, 5, 2]
```

##### 2. 间接使用map、filter等数组原型方法
```js
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}

let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}
```


##### 3. 实现并集（Union）、交集（Intersect）和差集（Difference）
```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

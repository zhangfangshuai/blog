#### ES6 Map数据类型

### 概要总结 <!-- {docsify-ignore} -->
1. Map是ES6提供的新的数据类型，它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，更适合键值对数据结构。
2. 对象键值对的键只能是字符串（或Symbol），用其他类型指定键也会被强转成字符串；而Map允许接收任意类型作为键使用，如一个数组、一个dom节点、一个函数，甚至是`undefined`。是一种 “值-值”对应的关系，也就是说，Map的键本质上也是一种“值”。
3. Map不能直接使用`.`符号获取某个值，而是需要通过Map的原型方法`get`获取，如`map.get(key)`。
4. Map可以通过`size`来获取数据长度，而不是使用`length`，这一点和Set相同。
5. 因为Map是一种“值-值”的关系，所以即便当键一致时，只要这个键所指向的地址空间不一样，那获取的值的结果也是不一样的。
6. Map有自己的原型方法如`set`、`keys`、`forEach`等，但没有数组和对象的原型方法如`filter`、`getOwnProperty`等
7. Map可以和数组，对象等数据类型进行转换。
8. 对于Map来说，`0`和`-0`是一个键，`NaN`和`NaN`是一个键，`undefined`和`null`是不同键。


### 初始化 <!-- {docsify-ignore} -->
&emsp; 本身是一个构造函数，用来生成Map数据结构。它可以接受一个数组，用作初始化参数。这个数组的格式是个二维数组，是个`entry Object`。
```js
const map = new Map([
    ['name', 'zhangfs'],
    ['height', 180]
])
console.log(Map)  // Map(2) {'name' => 'zhangfs', 'height' => '180'}
console.log(Map.size)  // 2
```

### size属性 <!-- {docsify-ignore} -->
`Map.prototype.size`：返回Map实例的成员总数。


### set()
`Map.prototype.set(key, value)`：设置键名`key`对应的键值为`value`，然后返回整个Map结构。如果`key`已经有值，则键值会被更新，否则就新生成该键。<br>
因为会返回整个Map结构，因此可以链式调用添加方法
```js
const map = new Map()
map.set('name', 'zhangfs')
map.set('weight', '65kg').set('height', 178)   // 链式设置
console.log(map.size)   // 3
```


### get()
`Map.prototype.get(key)`：读取`key`对应的键值，如果找不到`key`，返回`undefined`。
```js
const m = new Map()
const hello = function() {console.log('hello')}
m.set(hello, 'Hello ES6!') // 键是函数

m.get(hello)  // Hello ES6!
```


### has()
`Map.prototype.has(key)`：返回一个布尔值，表示某个键是否在当前 Map 对象之中。
```js
let map = new Map([
    ['hello', 'hello ES6'],
    [102, 'ok'],
    [undefined, 'oh my god']
])
map.has(undefined)  // true
map.has(null)       // false
```

### delete()
`Map.prototype.delete(key)`：返回一个Boolean值，表示是否删除成功
```js
const map = new Map([
    ['name', 'zhangfs'],
    ['height', 180]
])
map.delete('name')  // true
console.log(map.size)  // 1
map.delete('skin')  // false
```


### clear()
`Map.prototype.clear(key)`：清除所有成员，没有返回值。
```js
let map = new Map();
map.set('foo', true);
map.set('bar', false);
map.clear()
console.log(map.size) // 0
```
<br>

### 注意点
查看如下案例，发现输出为`undefined`，原因是`set`时的数组和`get`时的数组是两个完全不同的数组，只是数组内存放的数据一样罢了。
```js
const map = new Map();

map.set(['a'], 555);
let value = map.get(['a'])
console.log(value)  // undefined
```

<br>

#### 遍历方法

### keys()
`Map.prototype.keys()`：返回键名的遍历器。
```js
let map = new Map([
    [ 'name', 'zhangfs' ],
    [ 'height', 180 ]
])
console.log(map.keys())   // MapIterator {'name', 'height'}
for (let k of map.keys()) {
    console.log(k)  // 'name', 'height'
}
```


### values()
`Map.prototype.values()`：返回键值的遍历器。
```js
let map = new Map([
    [ 'name', 'zhangfs' ],
    [ 'height', 180 ]
])
console.log(map.values())   // MapIterator {'zhangfs', 180}
for (let k of map.values()) {
    console.log(k)  // 'name', 180
}
```


### entries()
`Map.prototype.entries()`：返回所有成员的遍历器。
```js
let map = new Map([
    [ 'name', 'zhangfs' ],
    [ 'height', 180 ]
])
console.log(map.entries())   // MapIterator {'name' => 'zhangfs', 'height' => 180}
for (let [k, v] of map.entries()) {
    console.log("%s=%s", k, v);  // name=zhangfs  height=180
}
```


### forEach()
`Map.prototype.forEach()`：遍历 Map 的所有成员。接受两个参数，分别是
- 遍历处理函数，该处理函数接受三个参数
    - 值
    - 键
    - Map对象自身
- 处理函数的执行环境`this`

```js
let map = new Map([
    [ 'name', 'zhangfs' ],
    [ 'height', 180 ]
])
map.forEach(function(value, key, map) {
    console.log("%s=%s", key, value)
})
// name=zhangfs
// height=180

const logger = {
    log: function(key, value) {
        console.log('logger: %s--%s', key, value)
    }
}
map.forEach(function(value, key, map) {
    this.log(key, value)
}, logger)
// logger:name--zhangfs
// logger:height--180
```


<br>
<br>

#### 与其他数据结构转换

##### 1. Map 转为数组
Map 转为数组最方便的方法，就是使用扩展运算符（`...`）。
```js
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc'])
 
[...myMap]  // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```


##### 2. 数组 转为 Map
将数组传入 Map 构造函数作为初始化参数，就可以转为 Map。
```js
const arr = [ [true, 3], [{foo: 3}, ['abc']] ]
const map = new Map(arr)
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }
```


##### 3. Map 转为对象
- 如果所有 Map 的键都是字符串，它可以无损地转为对象。<br>
- 如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。

```js
function strMapToObj(strMap) {
    let obj = Object.create(null)
    for (let [k, v] of strMap) {
        obj[k] = v
    }
    return obj
}

const myMap = new Map()
    .set('yes', true)
    .set('no', false);

strMapToObj(myMap)  // { yes: true, no: false }
```


##### 4. 对象 转为 Map
对象转为 Map 可以通过`Object.entries()`。
```js
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj))
```


##### 5. Map 转为JSON
Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。
```js
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)   // '{"yes":true,"no":false}'
```
另一种是Map 的键名有非字符串，这时可以选择转为数组 JSON。
```js
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)    // '[[true,7],[{"foo":3},["abc"]]]'
```


##### 5. JSON 转为 Map
JSON 转为 Map，正常情况下，所有键名都是字符串。
```js
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
```
但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。
```js
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```


<br>
<br>

[下一篇：Proxy](/ES6/Proxy)













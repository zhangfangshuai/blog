### 字符串解构
ES6 为字符串添加了 Iterable 遍历器接口，使得字符串也具备解构能力。

解构后得到一个类数组格式，需要用数组解构规则
```javascript
let str = 'abc'
const [x, y, z] = str
console.log(x, y, z)   // 'a', 'b', 'c'
```

&emsp;
### 数组解构
###### 1、利用数组解构给变量赋值
```javascript
let a = 1;
let b = 2;
let c = 3;

===> 改为
let [a, b, c] = [1, 2, 3];
```

###### 2、取数组中某一项
```javascript
let [ , , third] = ["foo", "bar", "baz"];
third // "baz"
```

###### 3、利用剩余操作符，取其他项
```javascript
let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]
```

###### 4、多层数组解构
> 多层数组解构，顺序解构！
- 数组变量的取值由他的位置、顺序决定
- 模式相同，变量名任意取
```javascript
let sourceArr = [[12, 30], [49, 91], 7]
const [[a0, b0], [c0, d0], e0] = sourceArr
console.log(a0, c0)  // 12, 49
```

###### 5、特殊用法
由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构
```javascript
let arr1 = [1, 2, 3, 4, 5,  6];
let {0 : first, [arr.length - 1] : last} = arr1;
first // 1
last // 6
```

&emsp;
### 对象解构
!> 对象解构本质是进行模式匹配，先找到同名属性，然后再赋给对应的变量。真正被赋值的是变量，而不是模式。

- 对象与数组不同，对象属性没有次序，变量必须与属性同名，才能取到正确的值
- 格式：{模式名:变量名}，如果变量名和模式名相同，则可省略变量名
- **模式名并不会被赋值，只有变量才会被赋值，当省略变量名时，本质上也是由JS引擎给变量赋值而非模式。**
- 结构赋值可以指定默认值，在变量后面添加等号即可。{ a = 1 } = obj

```javascript
let obj1 = { foo: 1, bar: 2 }
const { foo, bar } = obj1
console.log(foo) // 1

let obj2 = { noobivariable: 110, bar2: 21 }
const { noobivariable: noob, bar2 } = obj2
console.log(noob) // 110
// console.log(noobivariable) // 报错，模式名不会被赋值
```

##### 完整的对象解构赋值
```javascript
let { fob: fob, bap: bap } = { fob: 'aaa', bap: 'bbb' };
console.log(fob, bap)
```


##### 对象的多层结构
&emsp; 以下案例中，`out1`仅是模式，不会被赋值，且必须与属性名一致。外层属性如需要额外赋值，可以像`out2`这样获取。当然，`out2`书写位置无关，因为对象的属性本身就是没有顺序的。
```javascript
let sourceObj = {
    out1: { a2: 13, b2: 22 },
    out2: { h2: 20, g2: 18 },
    out3: 73
}
const { out1: {a2, b2}, out2, out2: {h2, g2}, out3 } = sourceObj
console.log(out2, a2)  // { h2: 20, g2: 18 },  13
```

##### 给对象解构赋值增加默认值
```javascript
let smObj = { s1: 1, s2: 2 }

const { s1, s2, s3 = 10 } = smObj
console.log(s1, s2, s3) // 1 2 10
```

##### 取剩余数据
```javascript
let book = { title: 'JS', author: 'zfs', pages: 280, price: 130 }
let { title, author, ...rest } = book
console.log(rest)   // { pages: 280, price: 130 }
```

&emsp;
### 使用技巧
##### 1、交换变量的值
```javascript
let o = 1, p = 2;
[o, p] = [p, o]
```

##### 2、从函数中返回多个值
```javascript
function example() {
    return [1, 2, 3]
}
let [u, v, w] = example()

function example2() {
    return {
        person: 'zhangfs',
        looks: 'handsome'
    }
}
let { person, looks } = example2()
```

##### 3、函数参数定义
```javascript
function foo([x, y, z]) {} // 有次序
foo([1, 2, 3])

function bar({j, p, g}) {} // 无次序
bar({g: 1, p: 2, j: 3})
```

##### 4、快速提取JSON数据
```javascript
let jsonData = {
    id: 42,
    status: 'OK',
    data: [210, 389]
};
let { id, status, data: nums } = jsonData
console.log(id, status, nums);  // 42, 'OK', [210, 389]
```

##### 5、给函数参数设置默认值
```javascript
function getInfo(id = '10001') {}
getInfo(id);
```

##### 6、使用for...of遍历Map(或具备Iterator接口的对象)
```javascript
const map = new Map()
map.set('first', 'hello')
map.set('second', 'world')

for (let [key, value] of map) {
    console.log(`${key} is ${value}`)
}
// 只提取键或提取值
for (let [key] of map) {}
for (let [, value] of map) {}
```

##### 7、按需加载引入模块的指定方法
```javascript
const { SourceMapConsumer, SourceNode } = require('source-map');
```


&emsp; <br/>
&emsp; <br/>
[下一篇：String](/ES6/String)
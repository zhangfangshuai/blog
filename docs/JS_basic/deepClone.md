#### 深拷贝

### JS的数据类型
JS一共有八种数据类型，分别为 `String`、`Number`、`Boolean`、`Array`、`Object`、`Map`、`Set`、`BigInt`，另外，还包括两个特殊数据`undefined`和`null`

JS的的数据类型分为两大类：基本数据类型 和 引用数据类型，在常规类型种，他们的归类如下：

基本数据类型有：
- `String`
- `Number`
- `Boolean`
- `undefined`
- `null`

引用数据类型
- `Array`
- `Object`
- `Function`
- `Date`
...


### JS对数据进行拷贝

JS对数据拷贝也分类两大类，分别是：深拷贝 和 浅拷贝。

**深拷贝：** 当对一个数据进行拷贝后，修改拷贝变量的值不影响原变量，也就是说两个变量互不影响没有牵连，拷贝的是数据真正的值，这种拷贝模式称作深拷贝。通常基本数据类型的拷贝都是深拷贝。

**浅拷贝：** 当拷贝一个数据后，对新变量的任意属性进行修改，可能影响到原变量的值，即新变量和原变量存在部分共享数据，或者说，，执行拷贝时，只是拷贝了数据值的地址的引用而不是真正的值，这种拷贝模式称作浅拷贝。它只会出现在引用数据类型的拷贝中。


### 几种拷贝方式

##### 1、解构赋值
解构赋值是浅拷贝。它只对最外层的值进行了值拷贝，其他层仍然是引用拷贝。
```javascript
let arr = [1, 2, 3]
let newArr = [...arr]
```

##### 2、JSON序列化
JSON序列化是深拷贝，它的本质是将引用数据类型直接转成了字符串这种基本数据类型，然后执行拷贝，再转回引用数据类型。
```javascript
let list = [
    { a: 1, b: 'zz' },
    { a: 2, b: 'zy' },
    { a: 3, b: 'zx', c: function() { console.log("I'm fn") } }
]
let listCopy = JSON.parse(JSON.stringify(list))
console.log('json序列化:', listCopy)
```


### 实现deepClone
```js
function deepClone(source) {
    // [] => Array(基类)，{} => Object(基类)
    const target = source.constructor === Array ? [] : {}
    // for..in 数组取出下标，对象取出键
    for (let key in source) {
        // for...in会取出原型链上的属性，因此这里要判断 hasOwnProperty
        if (source.hasOwnProperty(key)) {
            if (source[key] && typeof source[key] === 'object') {
                // 是对象或数组，递归查找。
                target[key] = source[key].constructor === Array ? [] : {}  // 维护层代码，起解释性作用
                target[key] = deepClone(source[key])
            } else {
                // 是基本数据类型,或者函数，直接赋值
                target[key] = source[key]
            }
        }
    }
    return target
}

// 测试 deep clone
let list2 = deepClone(list)
list2[1].name = 'second'
console.log(list, list2)
```

<br>
<br>

[下一篇：防抖与节流](/JS_basic/防抖与节流)

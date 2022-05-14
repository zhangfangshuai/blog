#### ES6-Proxy

### 指引 <!-- {docsify-ignore} -->
&emsp; Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”，即对编程语言进行编程。

&emsp; Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

```js
var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);  // Reflect.get()取值等同于 target.propKey的点取值，receiver是值的读取环境本例即代理对象obj
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver); // Reflect.set()取值等同于target.propKey = value设置值
  }
})
```

&emsp; 上面代码对一个空对象架设了一层拦截，重定义了属性的读取（`get`）和设置（`set`）行为，对设置了拦截行为的对象obj，去读写它的属性，就会得到下面的结果。
```js
obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2
```
&emsp; 也就是说，**Proxy 实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义。**

<br>

### 初始化
ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
```js
let proxy = new Proxy(target, handler);
```
语法中：<br>
`proxy`：Proxy实例，**代理对象**，当在此对象的操作都会被拦截并执行`handler`方法的逻辑，一般判断符合条件后人为将结果通向目标对象。<br>
`target`：**目标对象**，即属性原本挂载的那个对象。在此对象上的操作不会被拦截。<br>
`handler`拦截后代理的处理函数

如果没有设置拦截，那就等同于直接通向原对象
```js
var target = {}
var handler = {}  // 未定义拦截函数
var proxy = new Proxy(target, handler);
proxy.a = 'b'
target.a   // "b"
```


### 挂载到原型上

Proxy 实例也可以作为其他对象的原型对象，通过`Object.create(__proto__)`来设置。这样，当目标对象上不存在某个属性时，便会去原型上找，也就会被原型上的Proxy拦截
```js
var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time   // 35
```

### 支持的拦截操作
一共有13种拦截操作，使用的最多的还是`get`和`set`
- <b>`get(target, propKey, receiver)`</b>：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。

- <b>`set(target, propKey, value, receiver)`</b>：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。

- `has(target, propKey)`：拦截`propKey in proxy`的操作，返回一个布尔值。

- `deleteProperty(target, propKey)`：拦截`delete proxy[propKey]`的操作，返回一个布尔值。

- `ownKeys(target)`：拦截`Object.getOwnPropertyNames(proxy`)、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。

- `getOwnPropertyDescriptor(target, propKey)`：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。

- `defineProperty(target, propKey, propDesc)`：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.- defineProperties(proxy, propDescs)`，返回一个布尔值。

- `preventExtensions(target)`：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。

- `getPrototypeOf(target)`：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。

- `isExtensible(target)`：拦截`Object.isExtensible(proxy)`，返回一个布尔值。

- `setPrototypeOf(target, proto)`：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

- `apply(target, object, args)`：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。

- `construct(target, args)`：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。


---
<br>


### `get()`

`Proxy.prototype.get(target, propKey, receiver)`： 方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象(必选)、属性名(必选) 和 proxy 实例本身(可选)

!>如果一个属性不可配置（`configurable`）且不可写（`writable`），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。
```js
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
    get: function(target, propKey) {
        if (propKey in target) {
        return target[propKey];
        } else {
        throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
        }
    }
});

proxy.name // "张三"
proxy.age // 抛出一个错误
```

##### 2. `get`方法可以继承。
```js
let proto = new Proxy({}, {
    get(target, propertyKey, receiver) {
        console.log('GET ' + propertyKey);
        return target[propertyKey];
    }
})

let obj = Object.create(proto);
obj.foo    // "GET foo"
```

##### 3. 实现数组读取负数的索引
```js
function createArray(...elements) {
    let handler = {
        get(target, propKey, receiver) {
            let index = Number(propKey)
            if (index < 0) {
                propKey = String(target.length + index)
            }
            return Reflect.get(target, propKey, receiver)
        }
    };

    let target = []
    target.push(...elements)
    return new Proxy(target, handler)
}

let arr = createArray('a', 'b', 'c')
arr[-1]    // c
```

<br>

### `set()`

`Proxy.prototype.get(target, propKey, propValue, receiver)`：接受四个参数，依次为目标对象(必选)、属性名(必选)、属性值(必选)和 Proxy 实例本身(可选)。

!>如果目标对象自身的某个属性不可写，那么`set`方法将不起作用

##### 1. 内部属性防篡改
内部属性即以下划线开头的属性，不应该被外部使用，结合`get`、`set`方法可以做到放篡改。
```js
const handler = {
    get (target, key) {
        invariant(key, 'get')
        return target[key]
    },
    set (target, key, value) {
        invariant(key, 'set')
        target[key] = value
        return true
    }
};
function invariant (key, action) {
    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`)
    }
}
const target = {}
const proxy = new Proxy(target, handler)
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'
// Error: Invalid attempt to set private "_prop" property
```


##### 2. 数据验证
&emsp; 假定Person对象有一个age属性，该属性应该是一个不大于 200 的整数，那么可以使用Proxy保证`age`的属性值符合要求。
```js
let validator = {
    set: function(obj, prop, value) {
        if (prop === 'age') {
        if (!Number.isInteger(value)) {
            throw new TypeError('The age is not an integer');
        }
        if (value > 200) {
            throw new RangeError('The age seems invalid');
        }
        }

        // 对于满足条件的 age 属性以及其他属性，直接保存
        obj[prop] = value;
        return true;
    }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```
&emsp; 上面代码中，由于设置了存值函数`set`，任何不符合要求的`age`属性赋值，都会抛出一个错误，这是数据验证的一种实现方法。

利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新 DOM。

<br>

### Vue3.x双向绑定简版

vue3.x的双向数据绑定主要利用ES6的Proxy代理来实现，通过创建代理对象，对目标对象读取和设置更新之前进行一层“拦截”，读取时调用`get`方法，设置时调用`set`方法，并把值通向目标对象。

?>&emsp;Vue3.x双向绑定比Vue2.x优势在于：**Proxy是直接监听对象本身，而`Object.defineProperty`监听的是属性，监听对象和监听对象所有属性对比，性能直接由浏览器优化，优势明显**

以下是一个简化版的Vue3.x实现双向数据绑定原理的写法。
```js
let obj = { msg: 'vue3', count: 0 }
let vm3 = new Proxy(obj, { // 执行代理行为的函数
    get(target, key) {
        console.log('proxy get')
        return target[key]
    },
    set(target, key, value) {
        if (target[key] === value) return
        console.log('proxy set; key:', key, ', value: ', value)
        target[key] = value
        document.querySelector('#app').textContent = target[key]  // dom更新
    }
})
vm3.msg
// proxy get
// vue3  
vm3.count = 100
// proxy set; key: count, value: 100
```

<br>

### 对比Vue2.x双向绑定
&emsp; Vue2.x利用的是`Object.definedProperty`来实现，当对象某个属性被读取或者被设置前执行一层拦截，读取时调用`get`方法，设置时调用`set`方法。

&emsp; `Object.definedProperty`是针对对象属性的操作执行的一层拦截，因此，在检测时需要对每一个对象每一个属性进行观察。

!> `Object.definedProperty`定义 `descriptor`时，不允许`writable`和`set`方法同时存在，也不允许`value`和`set`方法同时存在。否则会报错。

```js
let data = { msg: 'vue2', count: 10 },
    vm2 = {}

proxyData(data)
// Vue2.x双向数据绑定实现原理
function proxyData(data) {
    Object.keys(data).forEach(key => {
        Object.defineProperty(vm2, key, {
            configurable: true,
            enumerable: true,
            get() {
                console.log('defineProperty getter, value是：', data[key])
                return data[key]
            },
            set(newVal) {
                console.log(`defineProperty setter, value:`, newVue)
                data[key] = newVal
                document.querySelector('#app').textContent = data[key] // dom更新
            }
        })
    })
}

vm2.msg
// defineProperty getter, value是：vue2
vm2.msg = 'hello vue3 '
// defineProperty setter, value: hello vue3
```









<br>
<br>

[下一篇：Promise](/ES6/Promise)



#### ES6对对象的增强


### 属性简写
&emsp; ES6中，如果对象的属性和变量名称一致，可以省略变量名。如果变量是方法，也可以简写。 这种写法对于函数传参，函数返回值都非常方便。
```javascript
// 属性简写
let name = 'zhangfs'
let person = { name }  // { name: 'zhangfs' } 

const obj = {
    // 方法简写
    foo() {
        return [1, 2]
    }
    // 等同于
    foo: function() {
        return [1, 2]
    }
}
```

### 属性表达式
在ES5中，如果对象的属性是数值，或者变量，可以用方括号括起来定义，但这种方式不支持字面量方式定义的对象。
```javascript
obj['a' + 'bc'] = 123;  // obj.abc = 123
```
在ES6中，增强了这一点，允许你如下定义属性和给属性赋值
```javascript
let propKey = 'foo';

let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
}
```
同样也支持变量形式定义函数名
```js
let person = {
    ['get' + 'Name']() {
        return 'zhangfs'
    }
}
person.getName()   // 'zhangfs'
```

!> 属性表达式和属性简洁写法不能同时使用，否则会报错。

<br>

### 属性的可枚举和遍历
对象定义一个新属性可以用`Object.definedProperty(obj, prop, descriptor)`实现，参数分别是：
- `obj`： 要定义属性的对象
- `prop`： 要新增或修改的属性名称
- `descriptor`：属性描述符
    - `value`
    - `writable`
    - `enumerable`: 该属性是否可枚举
    - `configurable`: 该属性配置是否可被修改

获取对象属性的描述信息：

```js
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
// { value: 123, writable: true, enumerable: true, configurable: true }
```
&emsp; 当属性描述符的`enumerable`为`true`时，该属性即可被对象的遍历方法查找出来，反之则会被忽略。为了避免如`for...in`把所有的属性和方法全部枚举出来，可以对应设置属性的描述配置`enumerable`为`false`。

#### 遍历
ES6遍历对象属性的方法有：
（1）`for...in`： 循环遍历对象自身的和继承的可枚举属性；<br>
（2）`Object.keys(obj)`： 返回数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol）的键名。 <br>
（3）`Object.getOwnPropertyNames(obj)`： 返回数组，包含对象自身的所有属性（含不可枚举不含Symbol）的键名。 <br>
（4）`Object.getOwnPropertySymbols(obj)`： 返回数组，用于专门返回Symbol属性的键名。<br>
（5）`Reflect.ownKeys(obj)`： 返回数组，返回对象自身（不含继承）属性 <br>

当遍历对象的属性时，有一定的优先顺序：
- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。

```js
var obj = { a: 1, 10: 3, d: 4 }
console.log(Object.keys(obj))  //  ['10', 'a', 'd' ]
```

<br>

### Super-父环境

`Super`, 并不是所谓的“超类”，而是ES6对比[`this`](/JS_basic/this)关键字做的一个扩充。`this`指向函数所在的当前对象，而`Super`则指向当前对象的原型对象。

```js
const proto = { foo: 'hello' }
const obj = {
    foo: 'world',
    find() {
        return super.foo
    }
};

Object.setPrototypeOf(obj, proto) // 设置原型对象
obj.find()   // "hello"
```
?> JavaScript 引擎内部，`super.foo`等同于`Object.getPrototypeOf(this).foo`

<br>

### 扩展运算符`...`
同数组类似，ES2018中扩充了对象也可以使用拓展运算符来获取对象中的项
##### 配合解构赋值使用
```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```
##### 自动的类型转换
&emsp; 在使用对象的扩展运算符时，如果后面的不是对象，则会自动调用`Object()`将其转换为对象，如果转换失败，则报错
```js
{ ...'hello' }
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}
{ ...true }      // {}
{...undefined}   // {}
let foo = { ...['a', 'b', 'c'] }  // {0: "a", 1: "b", 2: "c"}
```
##### 合并两个对象
?> 对象的扩展运算符等同于使用`Object.assign()`方法，也同样，如果有同名属性，后面的会覆盖之前。

```js
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```
```js
let preVersion = { name: 'v2.1.1', detail: 'app-version' }
let newVersion = {
    ...preVersion,
    name: 'v2.1.2' // 覆盖name属性
};
```
---
<br>

#### ES6增强对象新增方法
### `Object.is()`
实现“同值相等”算法，其效果与严格相等（`===`）类似，只有亮点区别：
- `+0` 不等于 `-0`；严格相等运算符下他俩是相等的。
- `NaN` 等于 `NaN`：严格相等运算符他俩是不等的。

```js
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```


### `Object.assign()`

- 用于对象的合并，将源对象的所有可枚举属性，复制到目标对象，返回新对象。
- 实行的是浅拷贝，而不是深拷贝。如果属性成员的值是对象，该属性拷贝的是地址引用。
- 第一个参数是目标对象，后面的参数都是源对象。
- 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
- 如果参数不是对象，则会先转成对象，然后返回。如果目标参数无法转成对象，则报错；如果源参数无法转对象，则跳过不报错

```js
const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

`Object.assign()`会把数组当作对象处理，进行合并

```js
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
```
?> 如果源对象中含有`get`或`set`方法，`Object.assign()`不会将`get`或`set`函数复制过去，而是得到值后复制过去。


### `Object.getOwnPropertyDescriptors()`
&emsp; 该方法返回某个对象所有属性的描述组成的对象。该方法的引入目的，主要是为了解决`Object.assign()`无法正确拷贝`get`属性和`set`属性的问题。
```js
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```

##### 实现Mixin(混入)模式
```js
// 实现对象a和b被混入了对象c的操作
let mix = (object) => ({
  with: (...mixins) => mixins.reduce(
    (c, mixin) => Object.create(
      c, Object.getOwnPropertyDescriptors(mixin)
    ), object)
});

// multiple mixins example
let a = {a: 'a'};
let b = {b: 'b'};
let c = {c: 'c'};
let d = mix(c).with(a, b);

d.c // "c"
d.b // "b"
d.a // "a"
```

<br>

### `__proto__`

&emsp; 用来读取或设置当前对象的原型对象（`prototype`）。目前所有浏览器都支持该属性，但其实它并没有被写入ES6正文，而是写入了附录。标准中只要求浏览器需部署该属性，其他运行环境可以不部署。

&emsp; 从兼容角度，建议不要使用该属性，而是使用`Object.setPrototypeOf()`（写操作）、`Object.getPrototypeOf()`（读操作）、`Object.create()`（生成操作）代替。

```js
const Person = function(name, age) {
    this.name = name
    this.age = age
}
Person.prototype = {
    getName() {
        return this.name
    }
}

let fang = new Person('ming', 16) 

fang.__proto__  // { getName: f ... }
fang.__proto__ === Person.prototype  // true
fang.__proto__ = {}  // 重置了实例fang的原型对象
fang.__proto__ === Person.prototype // false，重置后这俩就不相等了
```

<br>

### `Object.setPrototypeOf()`
&emsp; 作用与`__proto__`设置功能相同，用来设置一个对象的原型对象（`prototype`），返回参数对象本身。

它是 ES6 正式推荐的设置原型对象的方法。<br>
&emsp; **格式**： `Object.setPrototypeOf(object, prototype)`
```js
// 用法
const o = Object.setPrototypeOf({}, null);
// 等同于
function setPrototypeOf(obj, proto) {
    obj.__proto__ = proto;
    return obj;
}
```
使用案例
```js
let proto = {};
let obj = { x: 10 };
// 设置原型对象
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40
```

<br>

### `Object.getPrototypeOf()`
&emsp; 作用与`__proto__`读取功能相同，用来读取一个对象的原型对象（`prototype`），返回参数对象本身。

它是 ES6 正式推荐的读取原型对象的方法。

```js
const Person = function(name, age) {
    this.name = name
    this.age = age
}
Person.prototype = {
    getName() {
        return this.name
    }
}

let fang = new Person('ming', 16) 
Object.getPrototypeOf(fang) === Person.prototype  // true
```

<br>

### `Object.keys()`
ES5引入，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（`enumerable`）属性的键名。

当遍历对象的属性时，有一定的优先顺序：
- 首先遍历所有数值键，**按照数值升序排列**。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。
```js
var obj = { foo: 'bar', baz: 42, 12: 'tree', 8: 'big' };
Object.keys(obj)   // [8, 12, "foo", "baz"]
```

### `Object.values()`
ES2017引入，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（`enumerable`）属性的键值，返回顺序同上。
```js
const obj = { 100: 'a', 2: 'b', 7: 'c' };
Object.values(obj)    // ["b", "c", "a"]
```

### `Object.entries()`
ES2017引入，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（`enumerable`）属性的键值对数组，返回顺序同上。
```js
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)  // [ ["foo", "bar"], ["baz", 42] ]
```

### `Object.fromEntries()`
ES2017引入，`Object.entries()`的逆操作，用于将一个键值对数组转为对象。
```js
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
```

<br>
<br>

[下一篇](/ES6/Operator)
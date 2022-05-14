#### ES6-Symbol数据类型

#### JS所有数据类型
到目前为止，JS的数据类型共有八种，分别为：
- `undefined`
- `null`
- 布尔值（`Boolean`）
- 字符串（`String`）
- 数值（`Number`）
- 对象（`Object`）
    - 数组（`Array`）
    - 函数（`Function`）
- `Symbol`
- 大整数（`BigInt`）

<br>

#### 特别强调
!> Symbol 值作为变量属性名时，该属性还是公开属性，不是私有属性。因此在全局均可访问！！！

<br>

#### 功能及介绍

`Symbol`，一种新的原始数据类型，表示独一无二的值，属于 JavaScript 语言的数据类型之一。

&emsp; ES6引入`Symbol`数据类型的目的是为了**解决对象属性在命名是可能产生冲突**的问题。

&emsp; Symbol值通过`Symbol()`函数生成。函数前不能使用`new`命令，因为生成的Symbol是一个原始类型的值，不是对象，意味着也不能添加属性。基本上，它在使用上类似于字符串的数据类型。之所以说类似，是因为可以为Symbol添加一个描述，而这个描述是字符串格式的。


&emsp; 有了Symbol数据类型后，对象定义属性除了原来的字符串、数值类型外，还可以使用Symbol来定义，凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

```js
let s1 = Symbol();
typeof s1   // 'symbol'
let s2 = Symbol()
console.log(s1)  // Symbol()
console.log(s2)  // Symbol()
```
&emsp; 当Symbol生成时的函数不传参数，虽然生成后每个Symbol形式看起来一模一样，但实际上他们都是独一无个的个体变量； <br>

&emsp; 你也可以在生成时给函数添加参数，表示对Symbol实例的描述，使得他们在控制台上看起来不一样，但这个描述本质上并不会给Symbol本身带来什么变化。我们可以利用这个描述来具像的使用Symbol<br>
&emsp; 值的一提的是，使用`Symbol()`生成Symbol值时，即使两个Symbol的描述一致，其实他们也是两个不同的变量。但如果用`Symbol.for()`则会返回相同变量，具体见下文。
```js
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString()  // 'Symbol(foo)'
s2.toString()  // 'Symbol(bar)'
```


### `Symbol.prototype.description`

ES2019提供了一个实例属性`description`，用于返回Symbol的描述。使得原本抽象的Symbol，更直观和易用
```js
const sym = Symbol('foo');
sym.description // "foo"
```


### 主要用途
&emsp; 由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
```js
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

Symbol值作为对象属性名时，不能用点运算符，访问时也必须放在方括号内。
```js
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!' // 这里会被赋值给字符串'mySymbol' 而不是 Symbol的变量mySymbol
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
```


### 用于消除魔术字符串
&emsp; 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。
```js
function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
```
字符串`Triangle`多次出现，与代码形成“强耦合”，不利于将来的修改和维护，通用优化方案就是将其改写成变量，并把变量对象维护起来
```js
const shapeType = { // 变量对象
    triangle: 'Triangle'
}

function getArea(shape, options) {
    let area = 0
    switch (shape) {
        case shapeType.triangle
        area = .5 * options.width * options.height
        break
    }
    return area
}

getArea(shapeType.triangle, { width: 100, height: 100 })
```

&emsp; 如果仔细分析，可以发现`shapeType.triangle`等于哪个值并不重要，只要确保不会跟其他`shapeType`属性的值冲突即可。因此，这里就很适合改用 Symbol 值。

```js
const shapeType = {
    triangle: Symbol()
}
```

<br>

###  属性名的遍历
Symbol 作为属性名，遍历对象的时候，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。

可以通过`Object.getOwnPropertySymbols()`方法来获取。

<br>

### `Symbol.for()`-登记制度

&emsp; 有时需要对Symbol值的进行重新使用。可以用`Symbol.for()`来查找已经定义的Symbol，参数为它的描述。如果没有，则新建。
```js
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true
```

`Symbol.for()`有**登记制度**，`Symbol()`则没有

```js
Symbol.for("bar") === Symbol.for("bar")  // true
Symbol("bar") === Symbol("bar")  // false
```

### `Symbol.keyFor()`

`Symbol.keyFor()`方法返回一个已登记的 Symbol 类型值的key。
```js
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```


### 内置的Symbol值

ES6 提供了11个内置的Symbol值，指向语言内部使用的方法。
- `Symbol.hasInstance` <br>
当其他对象使用`instanceof`运算符，判断是否为该对象的实例时，会调用这个方法
- `Symbol.isConcatSpreadable` <br>
该属性等于一个布尔值，表示该对象用于`Array.prototype.concat()`时，是否可以展开
- `Symbol.species` <br>
指向一个构造函数。创建衍生对象时，会使用该属性。
- `Symbol.match` <br>
指向一个函数。当执行`str.match(myObject)`时，如果该属性存在，会调用它，返回该方法的返回值。
- `Symbol.replace` <br>
指向一个方法，当该对象被`String.prototype.replace`方法调用时，会返回该方法的返回值。
- `Symbol.search` <br>
指向一个方法，当该对象被`String.prototype.search`方法调用时，会返回该方法的返回值。
- `Symbol.split` <br>
指向一个方法，当该对象被`String.prototype.split`方法调用时，会返回该方法的返回值。
- `Symbol.iterator` <br>
指向该对象的默认遍历器方法。
- `Symbol.toPrimitive`
指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。
- `Symbol.toStringTag`
指向一个方法。在该对象上面调用`Object.prototype.toString`方法时，如果这个属性存在，它的返回值会出现在`toString`方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制`[object Object]`或`[object Array]`中`object`后面的那个字符串。
- `Symbol.unscopables`
指向一个对象。该对象指定了使用`with`关键字时，哪些属性会被`with`环境排除。




<br>
<br>

[下一篇：Set](/ES6/Set)

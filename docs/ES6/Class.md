#### ES6-Class

### 出现原因 <!-- {docsify-ignore} -->
&emsp; ES6提出了JS 类`class`的概念，它的绝大部分功能，ES5都能实现。它的出现是为了让JS与传统的面相对象语言（C++、Java）减小差异，降低新学者入门难度，更重要的是为了让对象原型的写法更加清晰、更像面向对象编程。

<br>

### 构造函数与类的转换

一个传统的构造函数如下：
```js
function Position(x, y) {
    this.x = x
    this.y = y
}
Position.prototype.toString = function() {
    return `(${this.x},${this.y})`
}
// 使用
let p1 = new Position(3, 4)
```

改写成类`class`写法，如下：
- `constructor`： 构造方法，默认方法，`new`时自动调用。常用于类内部初始化数据，用于接受实例化时的参数。
- `this`： 实例对象
- `{functions}`: 类的方法。定义时不需要加`function`关键字，方法之间不要有逗号。支持变量写法，用中括号标记。

```js
class Position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    toString() {    // 类的方法会被实例继承，类所有的方法都会被定义在类的原型方法
        return `(${this.x},${this.y})`
    }
}
// 使用
let p2 = new Position(3, 5)  // 参数会传入到构造方法中
p2.toString()  // (3, 5)

p2.hasOwnProperty('toString')   // false
p2.__proto__.hasOwnProperty('toString')   // true - 方法是挂在原型上的
```

去打印`p1` 和 `p2` 你会发现，他们俩结构一模一样

另外，值得关注的是，类属性同样支持属性表达式，即变量写法
```js
let selfFn = 'move'
class Pos {
    constructor() {
        // ...
    }
    [selfFn]() {
        // this is move fn
    }
}
```

<br>

### 类与构造函数等价关系
（1）类`Person`属于JS数据结构中的`function`，也就是说，`class`不是一种新的数据结构。<br>
（2）类`Person`符合构造函数的等式运算，即，类本质上就是一个构造函数。<br>
（3）类的实例具有原型属性`__proto__`，说明类的原型继续存在。<br>
（4）类的实例的构造方法，本身就指向构造函数的构造方法

!>类`class`不是一种新的数据结构，它是构造函数的一种语法糖，写法上与构造函数不一样，其本身就是指向构造函数。
**类相当于实例的原型，所有在类中定义的方法，都会被实例继承。**
```js
class Person {
    // ...
}
let p = new Person()

typeof Person   //  function
Person === Person.protorype.constructor   // true

p.__proto__ === Position.prototype  // true
p.constructor === Position.prototype.constructor  // true
```

<br>

### 类实现对象属性存读拦截

&emsp; 与ES5一样，在“类”的内部也拥有`set` 和 `get` 方法，对某个属性设置存储函数和取值函数，拦截该属性的存取行为。

!> `getter` 和 `setter` 是定义在Descriptor上的，而不是原型上。这也与ES5保持一致。

```js
class interceptClass {
    constructor(def) {
        this.proxyProp = def || ''
    }
    // getter
    get prop(val) {
        console.log('getter', this.proxyProp)
        return this.proxyProp
    }
    // setter
    set prop(val) {
        console.log('setter', val)
        this.proxyProp = val
    }
}

let inst = new interceptClass()
inst.prop = 'zz'  // 'setter zz'
inst.prop   // 'getter zz'
```

<br>

### 类的表达式定义法

与函数一致，类也可以使用表达式定义法，
```js
const Person = class {
    constructor(name) {
        this.name = name
    }
    sayHi() {
        console.log("Hi, I'm ", this.name)
    }
}

let suuci = new Person('suuci)
suuci.sayHi()  // Hi, I'm suuci
```

也可以为类定义一个类名，如下的`Me`，这个Me只能在类内部使用，外部访问不到

```js
const myClass = class Me { // Me只是内部变量，不可供外部引用
    getClassName() {
        return Me.name
    }
}

let inst = new myClass()
inst.getClassName() // Me
Me.name  // ReferenceError: Me is not defined
```

<br>

### 立即执行类表达式

与立即执行函数用法类似：

```js
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
```

<br>

### 静态方法`static`
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果希望类的某个方法不被继承，添加`static`标记为静态方法即可，此后该方法仅能在类内部使用，或被自己的子类继承`extends`
```js
class Foo {
    static bar() {
        this.baz()  // 静态方法里的this指向的是Foo类，而不是Foo实例
    }
    static baz() { // 静态方法可以与非静态方法重名
        console.log('hello')
    }
    baz() {
        console.log('world')
    }
}

class Sun extends Foo {}

Foo.bar() // hello
Sun.bar() // hello
```


### `in`属性
V8引擎改进，用来判断是类是否含有某个私有属性
```js
class A {
    use(obj) {
        if (#foo in obj) {
            // 私有属性 #foo 存在
        } else {
            // 私有属性 #foo 不存在
        }
    }
}
```

<br>

### `new.target`属性
用于返回构造函数自身，只有当实例是通过`new`来实例化生成（或`Reflect.construct()`方法生成）时有效，否则该属性返回`undefined`，因此也可以判断实例的的生成方式是不是如上两种。
```js
// 构造函数
function Person(name) {
    if (new.target === Person) {
        this.name = name;
    } else {
        throw new Error('必须使用 new 命令生成实例');
    }
}

// 类
class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle)
        this.length = length;
        this.width = width;
    }
}

var obj = new Rectangle(3, 4); // 输出 true
```
需要注意的是，子类继承父类时，`new.target`会返回子类。

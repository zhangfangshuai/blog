#### 上下文：this

### 概念与要点
`this`是在运行时基于函数的执行环境绑定的，指向函数所在的当前对象。

绝大多数情况下，函数的调用方式决定了`this`的值（运行时绑定），可以使用`call`或`apply`来修改函数执行时`this`的指向。

也可以使用ES5提供的`bind`方法，来绑定函数的`this`值，绑定后函数执行将不再受调用环境的影响，但仍然能响应`call`和`apply`的更改指向。另外，一个函数只能被`bind`一次。

函数在全局作用域被调用时，`this`指向的是Window对象(严格模式下为`undefined`)；当被某个对象的方法调用时，`this`就等于那个对象。如果`this`所在函数是匿名函数，也指向`window`

<br>

### `this`的大致分类

##### 1、全局上下文
无论是否在严格模式下，在全局执行环境中（在任何函数体外）`this`都指向全局对象，给`this`添加属性就相当于给Window添加
```javascript
console.log(this === window)  // true

this.name = 'zhangfs'
console.log(window.name)  // 'zhangfs'
```

##### 2、函数上下文
在函数内部，this 值的取值决定于函数被调用的方式
```javascript
window.name = 'zhangfs'

function foo() {
    console.log(this.name)  // 'zhangfs'
}
//函数在全局环境调用，上下文指向window，因此this.name值为window.name
foo()

let baz = {
    name: 'baz',
    getName: function() {
        console.log(this.name)
    }
}
// 函数在baz内部调用，上下文为baz作用域
baz.getName() // 'baz'

let closureObj = {
    name: 'closureObj',
    getName: function() {
        return function() {
            console.log(this.name)
        }
    }
}
// closureObj.getName是一个闭包，返回了一个函数，然后在全局环境执行了该方法，因此上下文为window
closureObj.getName()()   // 'zhangfs'
```

如果想要把`this`的值从一个环境传到另一个，就要用 `call` 或 `apply`方法 [见下文](/JS_basic/this?id=this与call、apply)。

##### 3、类上下文 - ES6
`this`在类中表现与在函数中类似，因为类本质也是函数，但也有一些区别和注意事项。

在类的构造函数中，`this`是一个常规对象，类中所有非静态的方法都会被添加到`this`的原型中
```javascript
class Person {
    constructor() {
        const proto = Object.getPrototypeOf(this)
        console.log(Object.getOwnPropertyNames(proto))
    }
    getName() {}
    setName() {}
    static sayName() {}
}

new Person()   // ['constructor', 'getName', 'setName']
```
!> 静态方法不是`this`属性，它们只是类自身的属性



<br>

### `this`与`call、apply`

&emsp; 如果说一个函数定义只能使用编写时的默认环境进行执行，那将大大限制了函数可复用性的价值。

&emsp; 前文已经提到，想要把`this`的值从一个环境传到另一个环境，或者说想更改函数执行时使用的上下文环境，可以使用`call` 和 `apply`来实现。关于 [call与apply的区别及用法](/JS_basic/call、apply) 详细见这里。

&emsp; 简单的来说，两者除了调用参数区别外，几乎无其他区别。`call`接受多个参数，其中第一个参数为上下文变量；`apply`接受两个参数，第一个是上下文变量，第二个是数组或类数组变量。

##### 改变`this`的指向

如下，我们通过 `call` 和 `apply` 来改变 `sayName` 的执行环境

```javascript
const Person = { name: 'zhangfs' }
const name = 'global name'

function sayName() {
    console.log(this.name)
}

sayName()  // 'global name'

sayName.call(Person)   // 'zhangfs' - 因为函数中的this被设置为Person
sayName.apply(Person)  // 'zhangfs' - 因为函数中的this被设置为Person
```

##### 多参数用法

如果要被改变`this`的执行函数接受多个参数，使用`call`传参还是使用`apply`传参还是比较有讲究，本处只讲用法，更具体请见 [call、apply](/JS_basic/call、apply) 章节。

简单来说就是：当参数是一个个零散的变量时，适用call；当参数是数组或类数组时，适用apply，因为apply会自动解构参数，并传入方法中执行

```javascript
function add(c, d) {
    return this.a + this.b + c + d
}

const env = { a: 1, b: 2}
add.call(env, 3, 4)

let paramsArr = [3, 4]  // 数组或类数组
add.apply(env, paramsArr)  // apply自带解构功能
```

<br>

### 函数`this`的绑定 - bind

&emsp; ES5提供了`Function.prototype.bind()`，调用`.bind(envObj)`方法返回一个新函数，该函数与原函数具有相同函数题和作用域，但是该函数的`this`将永久的被绑定到第一个参数即`envObj`，无论该函数是如何被调用的。

!> bind只能生效一次，但要注意如何使用

```javascript
function foo() {
    console.log(this.name)
}
const Person = { name: 'zhangfs' }

const baz = foo.bind(Person)
baz()   // 'zhangfs'
foo()   // 'zhangfs'
const bazr = baz.bind( { name: 'bazr' } )
bazr()  // 'zhangfs'  - baz已经是绑定过的，因此无法再次bind

const Person2 = { name: 'lizi' }
const bat = foo.bind(Person2)
bat()    // 'lizi'  - 新返回的函数会响应bind
foo()    // 'zhangfs'  - foo第一次bind已经生效，只能被bind一次

foo.call({name: 'callName'})   // ‘callName’  - 依旧可以响应call
foo()    // 'zhangfs' 
foo.apply({name: 'callName'})  // ‘callName’  - 依旧可以响应apply
foo()    // 'zhangfs'  - 响应后自身仍不受影响
```

<br>

### `this`与箭头函数

在箭头函数中，`this` 与封闭的词法环境的`this`一致，在全局中，它将被设置为全局对象。

?> 如果将`this`传递给`call`、`bind`、或者`apply`来调用箭头函数，它将被忽略。不过你仍然可以为调用添加参数，不过第一个参数（`thisArg`）应该设置为`null`。

```javascript
const _windowThis = this
const foo = () => this

const envObj = { name: 'zhangfs' }
foo.call(envObj) === _windowThis  // true - 箭头函数会忽略this的指派和绑定
```

需要特别注意箭头函数的执行环境，因为他的`this`与封闭环境息息相关
```javascript
this.name = 'window'
// 或 window.name = 'window'

const obj = {
    name: 'zhangfs',
    // 定义函数，内部返回箭头函数，箭头函数创建时它的this就被永久的绑定到它外层函数的this中
    foo: function() {
        const fn = () => {
            console.log(this.name)
        }
        return fn
    }
}

var foo1 = obj.foo()
foo1()    // 'zhangfs'

const baz = obj.foo
baz()()    // 'window'
```

<br>

### 原型链中的`this`

&emsp; 如果某个方法定义在原型链上，那么`this`指向的是调用这个方法的对象，就像该方法就在这个对象上一样。

```javascript
const o = {
    add: function() {
        console.log(this.a + this.b)
    }
}

const p = Object.create(o)  // create创建对象时会将参数作为原型对象赋值给目标对象 

p.a = 2
p.b = 3
p.add()  // 5  - p的原型方法里使用了this，这个this指向调用该方法的对象即p
```

<br>

### `this`与DOM

当函数被用作事件处理函数时，它的`this`指向触发事件的DOM元素，因此有时打印`this`时，能在控制台上看到元素自身。我们可以用`this`改变一些dom的样式或取值

```javascript
function bluify(e) {
    console.log(this === e.currentTarget)   // true

    console.log(this === e.target)  // currentTarge === target时成立
    this.style.backgroundColor = 'blue'  // 可以直接用this来修改样式
}

let elements = document.getElementByTagName('*')

// 将bluify作为元素的点击监听函数，当元素被点击时，就会变成蓝色
// elements满足iterator接口，因此可以用for...of遍历
for (let ele of elements) {
    ele.addEventListener('click', bluify, false)
}
```

<br>

### `this`与类

&emsp; 定义一个类，通常会在内部定义一些方法，当类被继承时，这些方法的`this`指向就会受调用环境影响，有时候，改写这个行为，让类中的`this`值总是指向类实例会很有用。为了做到这一点，我们可以在构造函数中绑定类类的方法`this`

```javascript
class Car {
    constructor() {
        // Bind sayBye but not sayHi to show the difference
        this.sayBye = this.sayBye.bind(this);
    }
    sayHi() {
        console.log(`Hello from ${this.name}`);
    }
    sayBye() {
        console.log(`Bye from ${this.name}`);
    }
    get name() {
        return 'Ferrari';
    }
}

class Bird {
    get name() {
        return 'Tweety';
    }
}

const car = new Car();
const bird = new Bird();

// 因为sayHi没有bindthis到实例类中，它的值取决于调用者
car.sayHi(); // Hello from Ferrari
bird.sayHi = car.sayHi;
bird.sayHi(); // Hello from Tweety

// 对于已绑定的sayBye方法，始终指向类实例，不受调用环境影响
bird.sayBye = car.sayBye;
bird.sayBye();  // Bye from Ferrari
```


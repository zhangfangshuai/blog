#### 类的继承 Extends

### 基本使用与要点

类的继承，主要是为了实现和简化原型链继承方法，同样为了更符合模块化思维。ES6 的继承机制，则是先将父类的属性和方法，加到一个空的对象上面，然后再将该对象作为子类的实例，即“继承在前，实例在后”。这与ES5先创造子类实例在添加父类方法的“实例在前，继承在后”机制不同。

一个案例如下：
```js
class Father {
    // 私有属性#attr
    #attr = 100；
    constructor(x, y) {
        console.log(`pos: (${x}, ${y})`)
    }
    // 父类静态方法
    static getPrivateAttr() {
        return this.#attr
    }
}

class Son extends Father {
    constructor(x, y, name) {
        super(x, y) // super会调用执行父类的构造方法
        this.name = name  // 必须先调用super生成this，才能再使用this对象
    }

    sayHi() {
        console.log('Hi, I am ', this.name)
    }
}

let ming = new Son(3, 5, 'ming')  // pos: (3, 5)  - super执行父类构造函数

let num = ming.getPrivateAttr()
console.log(num)  // 100  - 子类能继承父类的静态方法，但不能继承私有属性，可以通过方法返回获取私有属性
```
有几个注意点：
- 子类必须在构造方法`constructor()`中调用`super()`，用来为子类完成自己的`this`对象的塑造，以此得到与父类同样的实例属性和方法。如果不调用，子类就得不到自己的`this`对象，程序会报错。
- 子类必须先调用`super`后，才能使用`this`对象
- 子类中的`super()`会调用父类的`constructor()`方法，并执行其内部逻辑。也就是说，`super`就代表了父类的构造函数
- `super()`调用的是父类的构造函数，但返回的是子类的实例，相当于`Father.prototype.constructor.call(this)`
- 如果子类没有定义`constructor()`，JS引擎会为其默认添加，且在里面默认调用`super()`，并将自己所有参数`...args`传给`super(...args)`。
- 被继承后，父类的所有属性和方法，包括静态方法`static`，都会被子类继承。但是私有属性`#attr`不会被继承。这与私有属性只能在定义的类里使用观点一致。
- 子类想调用私有属性，可以通过父类包装方法，再由子类继承方法实现。这一思路与闭包如出一辙。

<br>

### `Object.getPrototypeOf()`
功能： 判断一个类是否继承了另一个类。

`getPrototypeOf()`方法其实就是浏览器统一实现了的非官方属性`__proto__`的官方用法，类的该方法与对象中用法一致，用于获取父类。

?> 回顾一下，类本质上与对象的原型对象是一致的。因此`getPrototypeOf()`得到的是类自身

```js
class Father { /*...*/ }
class Son extends Father { /*...*/ }
Object.getPrototypeOf(Son) === Father  // true
```


### `Super`
上文中已提到的关于`Super`的注意点本处不在赘述。

`super`这个关键字，既可以当作函数使用，也可以当作对象使用：<br>
（1）当函数使用时，就是取调用父类的构造函数，生成子类`this`对象，相当于在子类中执行了`Father.prototype.constructor.call(this)`。作为方法时只能在`constructor`中调用，其他方法调用会报错。<br>
（2）作为对象时，`super`指向父类的原型对象，因此可以用`super对象`来访问父类原型上的方法，但不能访问定义在父类`this`上的属性和方法

!>ES6 规定，在子类普通方法中通过`super`调用父类的方法时，方法内部的`this`指向当前的子类实例。

```js
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2
```

<br>

### 类的 `prototype` 属性和`__proto__`属性

大多数浏览器的 ES5 实现之中，每一个对象都有`__proto__`属性，指向对应的构造函数的`prototype`属性。Class 作为构造函数的语法糖，同时有`prototype`属性和`__proto__`属性，因此同时存在两条继承链。

（1）子类的__proto__属性，表示构造函数的继承，总是指向父类。

（2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
```js
class A {
}

class B extends A {
}

B.__proto__ === A   // true
B.prototype.__proto__ === A.prototype   // true
```
这两条继承链，可以这样理解：<br>
作为一个对象，子类（`B`）的原型（`__proto__`属性）是父类（`A`）； <br>
作为一个构造函数，子类（`B`）的原型对象（`prototype`属性）是父类的原型对象（`prototype`属性）的实例。
```js
B.prototype = Object.create(A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;
```

<br>

### 实例的 `__proto__` 属性

子类实例的`__proto__`属性的`__proto__`属性，指向父类实例的`__proto__`属性。也就是说，子类的原型的原型，是父类的原型。

```js
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__   // false
p2.__proto__.__proto__ === p1.__proto__   // true
```


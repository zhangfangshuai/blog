#### prototype

本文核心概念：工厂函数、构造函数、原型模式、原型、原型对象、继承、原型链、原型链等价表达式

<br>

### 构造函数
构造函数早期是为了创建对象而产生的，在构造函数前期，还有工厂函数和字面量定义法。

&emsp; **工厂函数**主要是为了用来生成实例，节约一些频繁使用却相同的代码片段，是一种代码的抽象，使用时时对函数的调用，利用函数返回值生成所需的实例。<br>
工厂函数最大的问题在于没有解决对象识别问题，即：怎样知道一个对象的类型。

&emsp; **构造函数**虽然也可以生成实例，但与工厂函数却完全不同。构造函数不需要显示的创建一个对象，也不需要`return`，而是使用`new`关键字进行实例化生成实例，使用`this`来访问实例属性和实例方法。同时构造函数解决了工厂函数识别对象的问题，使用`instanceof`操作符识别。<br>
&emsp; 构造函数要创建新的实例，需要使用`new`关键字，它主要经历了以下几个步骤：
1. 创建一个新对象
2. 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
3. 执行构造函数中的代码（为这个对象添加属性及方法）
4. 返回新对象

&emsp; 构造函数的属性和方法又被称为成员，成员分为两类：**静态成员** 和 **实例成员** <br>
**静态成员：** 在构造函数本身添加的成员。如 `Person.title = 'constructor_demo'`；静态成员只能通过构造函数本身访问。
**实例成员：** 构造函数内部通过`this`添加的成员，只能通过实例化的对象进行访问

```javascript
function Person(name, sex) {  // 构造函数使用大些开头
    this.name = name  // 实例成员
    this.sex = sex
    this.sayName = function() {
        console.log('My name is ', this.name)
    }
}
Person.title = 'constructor_demo'   // 静态成员
```

<br>

### 原型模式

&emsp; 虽然构造函数比起工厂函数有了极大优化，但仍然存在缺陷，就是每个方法（如`sayName`）都要在每个实例上重新创建一遍，而这些方法本质上只是为了执行其内部的逻辑罢了，且所有的实例的方法都相同，因此产生了原型模式。

##### 原型

&emsp; 我们创建的每个方法都有一个`prototype`(原型)属性，它是一个指针，指向一个对象，它包含了可以由特定类型的所有实例共享的属性和方法。因此利用原型，就可以避免所有的实例需重复创建方法的问题。

!> 原型是函数特有的属性，对象和数组等是没有原型的。构造函数Object的原型是null，是顶级构造函数；换句话说：所有的函数的默认原型都是Object的实例。


##### 原型对象
&emsp; 无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个`prototype`属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个`constructor`(构造函数)属性，这个属性是一个指向`prototype`属性所在函数的指针。
```javascript
function Foo() {}

Foo.prototype  // {constructor: f} - Foo函数的原型对象
Foo.prototype.constructor === Foo // true
```

<br>

### 继承

JS中实现继承主要是通过**原型链**实现，其基本思想是：利用原型让一个引用类型继承另一个引用类型的属性和方法。

##### 原型链
原型链的概念来自于构造函数中原型与实例的关系。每个构造函数都有一个原型对象`.prototype`，原型对象都包含一个指向构造函数的指针`.constructor`，而每个实例都包含一个指向原型对象的内部指针`__proto__`。

假设让原型对象等于另一个类的实例，那么此时的原型对象将包含一个指向另一个原型的指针，相应的，另一个原型中也包含着一个指向另一个构造函数的指针。又假如另一个原型又是另一个类的实例...，那么该关系依然成立，如此层层递进，就构成了实例与原型的链条关系，即所谓的原型链。

>注：该指针各大浏览器均已实现，但其实并没有写入ES规范里，也就是说它是非标准的。ES里提供的是`getPrototypeOf()`方法获取

```javascript
// 父类型
function Super() {
    this.property = 'super value'
}
Super.prtotype.getSuperVal = function() {
    return this.property
}
// 子类型
function Sub() {
    this.property = 'sub value'
}
// 继承
Sub.prototype = new Super()

Sub.prototype.getSubVal = function() {
    return this.property
}

const instance = new Sub()
console.log(instance.getSuperVal())  // 'sub value'
```

以上案例中，子类`Sub`通过将原型等于父类型`Super`的实例实现了原型链，从而实现了继承，因此在子类型`Sub`
的实例`instance`上可以调用父类型方法`getSuperVal()`。

但是，虽然实现了继承，但原型方法`getSuperVal()`的执行环境是实例`instance`的作用域，因此要满足作用域查找规则，即`就近原则`，查找顺序是：**先查找自身实例对象，没有找到就去自己的原型对象中查找，找到即停止，如果还没有找到，就顺着原型链去父类型的原型对象中查找，直到默认原型`Object.prototype`。**

本例中，因自身就有属性`property`，因此直接输出结果`sub value`而不再查找父类型的原型对象。


##### 原型链等价表达式
由原型链的产生规律，以上诉案例为基础，很容易得到以下等级啊表达式：

```javascript
Sub.__proto__ === Super.prototype
instance.__proto__ === Sub.prototype

instance.__proto__.__ptoto__ === Super.prototype
```

又因为构造函数Object的实例是任何函数的原型对象，因此又有以下等价表达式

```javascript
Super.__proto__ === Object.protorype
Sub.__proto__.__proto__ === Object.prototype

instance.__proto__.__proto__.__proto__ === Object.prototype
```

再结合构造函数与原型的关系，可以得到如下等价表达式

```javascript
Sub.__proto__.constructor === Super
instance.__proto__.constructor === Sub

instance.__ptoto__.__proto__.constructor === Super
```


<br>
<br>

[下一篇：call、apply](/JS_basic/call、apply)

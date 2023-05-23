#### TS中的类

在ES5时期，JS程序使用工厂函数，或基于原型的继承来创建可重用的组件，而在ES6或TS中，可以使用类来创建，它可以理解为模板，通过实例化创建对象。

### 类的基本使用

```js
class Person {
    // 属性
    name: string
    age: number
    gender: string
    
    // 构造函数
    constructor(name: string, age: number, gender: string) {
        // 构造函数用户实例化时的数据初始化
        this.name = name
        this.age = age
        this.gender = gender
    }

    // 定义一般方法（在原型对象上，供实例使用）
    sayHi(): string {
        return `你好，我叫${this.name}, 今年${this.age}, 是个${this.gender}孩子`
    }

    // 静态方法（在类自身，供类使用，实例访问不到）
    static selfGreeter(): string {
        return '你好，我是内部方法'
    }
}

// 实例化
const ming = new Person('小明', 18, '男')
const tong = new Person('小童', 17, '女')
```

### 类的继承

在基于类的设计模式中，一种最基本的模式是允许使用继承来扩展现有的类，以满足开放封闭原则。<br>
**继承**：使用`extends`实现类的继承，A继承了B，此时，A叫子类（派生类），B叫父类（基类）。<br>
**重写**：子类可以使用`super(props)`调用父类中的构造方法，也可以使用`super.一般方法()`调用父类的一般方法。子类还能重写父类一般方法。<br>
**多态**：父类的引用指向了子类的对象，不同类型的对象调用相同的方法，产生了不同的行为。<br>

?>A类继承了B类，此时A类叫子类，B叫基类<br>子类： 派生类<br>基类： 超类、父类<br>

如下案例中实现了<br>
（1）定义`Animal`基类，包含`name`属性和`move`方法，可复用；<br>
（2）定义`Dog`类，继承`Animal`，并拥有自己的方法`bark`；<br>
（3）定义`Snake`类，继承`Animal`，并重写`move`方法，该方法中通过`super`关键字复用基类Animal的`move`方法

```js
class Animal {
    name: string
    constructor(name: string) {
        this.name = name
    }
    move(distance: number = 0) {
        console.log(`${this.name} moved ${distance}m`)
    }
}

// 继承Animal，并定义自己的方法bark
class Dog extends Animal {
    constructor(name: string) {
        super(name)
    }
    bark() {
        console.log('woof! woof')
    }
}

// 继承Animal，重写move方法，并通过super复用父类的move方法
class Snake extends Animal {
    constructor(name: string) {
        super(name)
    }
    move(distance: number = 5) {
        distance += 10
        super.move(distance)
    }
}

// 实例化与应用
const dog: Dog = new Dog('dog')
dog.move(5)  // dog moved 5m
const snake: Snake = new Snake('snake')
snake.move()  // snake moved 15m
```

### 类的多态

多态：父类型引用指向子类型的实例，产生了不同的行为；<br>
继续上面的案例，在以下场景中，都是父类的类型，但调用`run()`方法时本质上调用的是子类的方法，产生了不同的行为。

```js
const dog2: Animal = new Dog('dog2')
dog2.move(20)
const snake2: Animal = new Snake('snake2')
snake2.move(5)
```

如果子类型没有扩展的方法, 可以让子类型引用指向父类型的实例
```js
// Snake类所需的所有属性和方法Animal都有
const snake3: Snake = new Animal('snake3')  // OK
```
有新增的方法，则不能让子类型引用指向父类型的实例
```js
// Dog新增bark方法，Animal的实例就不满足Dog类的要求了
const dog: Dog = new Animal('duke') // Property 'bark' is missing in type 'Animal' but required in type 'Dog'
```


### 类的修饰符

在ES6和TS中，类的修饰符分：`public（默认）`、`private`、`protected`、`readonly`
- **public**：公共属性，所有成员默认都是public，外部都可以访问；
- **private**：私有属性，除了定义它的类自身可以访问，外部不可访问
- **protected**：受保护的属性：定义的类可用，派生的类可用，其他外部不可用
- **readonly**：只读的属性，除了定义它的类的构造函数可以修改，其他地方均不可修改，包括定义它的类中的一般方法

```js
class Person {
    public name: string // 默认的公共属性
    private age: number // 私有属性
    readonly country: string = 'china' // 只读属性
    public constructor(name: string, age: number, country: string) {
        this.name = name
        this.age = age
        this.country = country // 只读属性仅在此处可以修改
    }

    protected eat(food: string) { // 受保护的方法
        console.log(`${food}真好吃`)
    }
    // 未标记的属性或方法默认为public
    changeCountry() {
        this.country = '米国' // Error, Cannot assign to 'country' because it is a read-only property
    }
}

class Student extends Person {
    constructor(name: string, age: number, country: string) {
        super(name, age, country)
    }
    playOrEat() {
        console.log(`我比较贪吃`)
        this.eat('西瓜') // OK，基类的protected方法在派生类中可以访问
    }
}
```
再看下使用上的限制以及会报的错
```js
const Ming = new Person('小明', 16 )
const MingName = Ming.name  // 小明
const MingAge = Ming.age  // Property 'age' is private and only accessible within class 'Person'
Ming.country = 'America' // Cannot assign to 'country' because it is a read-only property

const Mei = new Person('小美', 18, 'America' )
const MeiCountry = Mei.country // America ===> 类的构造函数是可以修改read-only属性的

const Wang = new Student('小王', 19, 'china')
Wang.playOrEat() // OK
Wang.eat() // Property 'eat' is protected and only accessible within class 'Person' and its subclasses
```


### 构造函数的修饰符

如果一个类的构造函数被标记上了`protected`，因为实例化类时，会默认的调用构造函数，这不符合`protected`的限定规则，所以说，此时该类不可被实例化。<br>
又因为`protected`允许被派生类中调用，即可以在派生类的构造函数中调用`super()`，因此可以被继承。

```js
class Person {
    protected constructor(readonly name: string, protected age: number, protected gender: string) {
        // 构造函数中的参数如果用readonly、private、protected进行修饰
        // 那么该类会自动添加这些参数到它的属性上，无需在手动定义声明
        this.name = name
        this.age = age
        this.gender = gender
    }
}

class Student extends Person {
    constructor(readonly name: string, protected age: number, protected gender: string) {
        super(name, age, gender)
    }
}

const Dan = new Person('小丹', 18, '女') // Error: Constructor of class 'Person' is protected and only accessible within the class declaration.
const Li = new Student('小李', 16, '女') // OK
```


### 存取器

类中，使用 `getter/setter` 来**拦截**对属性成员的访问

在一个常规类中，用户可以轻松的读取和设置类中的属性，这也可能带来一定的风险。例如，用户性能不能随意被更改，需要用户先输入变更密码后再允许修改姓名

```js
let passCode = '8633'

class Employee {
    private _fullName: string

    get fullName(): string {
        return this._fullName
    }

    set fullName(name: string) {
        if (passCode && passCode === '8633') {
            this._fullName = name
        } else {
            console.log('Error: Unauthorized update of employee!')
        }
    }
}

let employee = new Employee()
employee.fullName = 'Bob Smith'
if (employee.fullName) {
    alert(employee.fullName)
}
```


### 类的静态属性 static

一个类，包含**实例部分**和**静态部分**，用`static`声明的所有属性和方法都存放在静态部分<br>
静态属性是挂载在类自身身上的而非类原型对象上，因此类的实例无法访问到它们

```js
class Person {
    // static name: string = 'class Person' // Static property 'name' conflicts with built-in property 'Function.name' of constructor function 'Person'.
    // 类中有个默认属性name，因此不能自定义关键字name，此处改名为myName
    static myName: string = 'I am class Person'
    age: number = 18
    // 构造函数，必须被实例调用，不能使用static修饰
    constructor(name:string) {
        // myName是静态属性，不可被实例调用，即不能被this访问到
        this.myName = name // Property 'myName' does not exist on type 'Person'
    }
    sayHi() {
        console.log('Hello, I am class Person')
    }
    // 静态方法
    static sayBye() {
        console.log('Bye Bye')
    }
}
const person = new Person('judy')
// 实例上没有静态属性
// console.log(person.myName) // Property 'myName' does not exist on type 'Person'
console.log(Person.myName) // I am class Person - 静态属性在类自身
person.sayHi() // Hello, I am Person
// 实例上没有静态方法
// person.sayBye()  // Property 'sayBye' does not exist on type 'Person'

// ts中class式类不可访问原型链，但js中可以
// console.log(person.__proto__) // Property '__proto__' does not exist on type 'Person4'
function FuncClass() {
    this.myName = 'Person2'
}
const fc = new FuncClass()
console.log(fc.__proto__ = FuncClass.constructor)  // FuncClass  ===> ts中函数式的类可以访问
```


### 抽象类 abstract class
抽象类做为其它派生类的基类使用。它们一般不会直接被实例化，也不能被实例化。<br>
不同于接口，抽象类可以包含成员的实现细节。 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
?>React.Component类就是一个大的抽象类！！！

```js
abstract class Animal {
    // abstract name: string = 'dog'  // Property 'name' cannot have an initializer because it is marked abstract.
    // abstract eat() {   // Method 'eat' cannot have an implementation because it is marked abstract.
    //     console.log('吃饭')
    // }
    abstract makeSound(): void
    move(): void {
        console.log('动物移动了')
    }
}
```
抽象类中的抽象方法不能有具体的实现，并且必须在派生类中实现，这一点与接口相似，两者都是定义方法签名但不包含方法体。然而，抽象方法必须包含 `abstract` 关键字并且可以包含访问修饰符.

!> 在抽象类的派生类中，不允许出现抽象类未声明的方法，否则报错“方法在声明的抽象类中不存在”

```js
abstract class Department {
    constructor(public name: string) {}
    printName(): void {
        console.log('Department name: ' + this.name);
    }
    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {
    constructor() {
        super('Accounting and Auditing')
    }
    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.')
    }
    generateReports(): void {
        console.log('Generating accounting reports...')
    }
}

let department: Department    // 创建一个对抽象类型的引用
department = new Department() // Error: Cannot create an instance of an abstract class
department = new AccountingDepartment() // 允许对一个抽象子类进行实例化和赋值
department.printName()
department.printMeeting()
department.generateReports() // Error: Property 'generateReports' does not exist on type 'Department'
```


### 类当作接口使用

在接口一章节也提到，接口是可以用于类的，类和接口之间是实现`implements`关系

```js
class Point {
    x: number
    y: number
}

interface Point3d extends Point {
    z: number
}

let point3d: Point3d = {x: 1, y: 2, z: 3}
```



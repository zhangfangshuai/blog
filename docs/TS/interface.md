#### 接口

TypeScript的核心原则之一是对值所具有的**结构**进行类型检查，在TS里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义*契约*，它是一种规范，一种约束。

### 接口用于对象

接口用于对象，描述对象所有属性的类型及可选性；通常情况下，使用接口定义的属性，多了或少了都不允许。

> 接口可以定义对象的状态(属性)和行为(方法)的抽象(描述)，它可以作为对象的类型去使用

```js
// 定义一个接口，来约束人这个对象的属性
interface IPerson {
    readonly id: number // 数值类型，必须，只读
    name: string        // 字符串类型，必须
    age: number         // 数值类型，必须
    sex?: string        // 字符串类型，可选
}

// 定义人对象，使用接口作为类型
const person: IPerson = {
    id: 1,
    name: 'lucy',
    age: 18,
    sex: '女'
}
```


### 接口用于函数

接口用于函数：描述函数类型(参数的类型与返回的类型)，用来作为函数的类型使用

为了使用接口表示函数类型，我们需要给接口定义一个**调用签名**。它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```js
// 定义接口，定义调用签名
interface ISearchFunc {
    (source: string, subString: string): boolean
}

const mySearch: ISearchFunc = function(source: string, sub: string): boolean {
    return source.search(sub) > 1
}
mySearch('abcd', 'bc')
```


### 接口用于类

接口用于描述类的类型，类中定义的属性和方法，类可以实现`implements`多个接口，此时这些接口中的内容都要实现

```js
interface IFly {
    fly(): any
}
interface ISwim {
    swim(): any
}

// 定义类，实现上诉两个接口
class Person implements IFly, ISwim {
    fly() {
        console.log('我会飞')
    }
    swim() {
        console.log('我会游泳‘)
    }
}

const person = new Person()
person.fly()
person.swim()
```


### 接口用于继承

接口和接口之间是继承`extends`关系，类和接口之间是实现`implements`关系

```js
// 定义新接口，继承IFly和ISwim
interface IFlyAndSwim extends IFly, ISwim {}
// 实现新接口
class Person implements IFlyAndSwim {
    fly() {
        console.log('我会飞')
    }
    swim() {
        console.log('我会游泳')
    }
}
const person = new Person()
person.fly()
person.swim()
```




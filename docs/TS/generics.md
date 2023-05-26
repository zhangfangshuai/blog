#### TS中的范型

在定义函数、接口、类的时候，不能预先指定具体的类型，而在使用的时候再指定具体类型的一种特性。<br>
范型是一个规范，是一种**类型变量**，用 `T` 表示，与普通变量不同，它是一种特殊的变量，只用于表示类型，而不是值。

### 范型的产生与写法

TS中，一个普通的带有类型注解的函数，可以传入参数类型，和返回值类型，这就限制了该函数只能按此类型使用，非常不利于[函数重载](/TS/function?id=函数重载)，如下：

```js
// 此函数只能返回number类型
function identify(arg: number): number {
    return arg
}
```
为解决单个类型问题，您可以选择使用`any`类型来定义，但因`any`允许传入任意类型，这就丢失了一些信息，对于输入和输出的类型注解没有关联关系，换句话说，这种写法和没限制，其实区别不大。如下：

```js
// 此函数参数和返回值都是任意类型
function identify(arg: any): any {
    return arg
}
```

因此，我们需要一种方法使返回值的类型与传入参数的类型是相同的。而TS的范型，正是为解决该问题而产生，如下：

```js
function identify<T>(arg: T): T {
    return arg
}
```

以上，`T`是 identify 的范型变量，它帮助我们不活用户传入的类型（比如：`number`），并替代此变量，应用在函数中。<br>
我们把此版本的 identify 函数称作**范型**，它可以适用于多个类型。

?> `T` 是TS推荐优先使用的范型类型变量名称，意为`type`，单并不是只能使用它，如 `A`、`B`一样能可用，但语义不强。


### 多个类型参数

在上诉范型中，还是会丢失一些信息，即虽然能限制参数和函数返回值为同一个类型，且支持传入时决定，但如果要求入参类型和返回值类型不一致时又该怎么办呢？此时就需要用到多个类型参数；

```js
// K 和 V 是两种入参类型
function getMsg<K, V>(key: K, value: V): [K, V] {
    return [key, value]
}
```

### 范型的用法

有了如上 identify 范型后，可以有两种使用办法

##### 1、传入所有参数，包含类型参数

```js
let output = identify<string>('hello')  // output会被推断为string
```
这里我们明确的指定了`T`是`string`类型，并做为一个参数传给函数，使用了`<>`括起来而不是`()`，后者的`()`代表函数执行，和传入参数`hello`。

##### 2、借用类型推断

编译器会根据传入的参数自动地帮助我们确定`T`的类型

```js
let output = identity('hello');  // output会被推断为string
```
注意我们没必要使用尖括号（`<>`）来明确地传入类型；编译器可以查看 `hello` 的值，然后把`T` 设置为它的类型。 类型推论帮助我们保持代码精简和高可读性。

如果编译器不能够自动地推断出类型的话，只能像上面那样明确的传入`T`的类型，在一些复杂的情况下，这是可能出现的。

如，需要传入多个范型参数时，TS则无法自动推断，需要手动编写

```js
function getMsg<K, V>(key: K, value: V): [K, V] {
    return [key, value]
}

let output = getMsg<number, string>(1, 'hello')
```

### 范型变量

在以上的描述中，`T`就范型变量，由于它的值在使用时才被决定，因此可能引发如下问题

```js
function identify<T>(arg: T): T {
    console.log(arg.length)  // Error: T doesn't have .length
    return arg
}
```
在未传入数组类型或字符串等类型时，`arg.length`方法是不存在的

##### 范型变量用作类型一部分

范型变量`T`也可以用来指代类型变量的一部分，而不是必须成为整个类型，这可以增加范型变量在范型函数中使用的灵活性。如下

```js
function identify<T>(arg: T[]): T[] {
    console.log(arg.length)  // OK
    return arg
}
// 或
function identify<T>(arg: Array<T>): Array<T> {
    console.log(arg.length)  // OK
    return arg
}
```

这样，在使用范型时无需任何改变，即可解决以上问题


### 范型类型

范型类型一般指范型函数类型，它与非范型函数的类型区别不大，只是在最前面多了一个类型参数，像函数声明一样

```js
function identify<T></T>(arg: T): T {
    return arg
}
let myIdentify: <T>(arg: T) => T = identify
// 类型上可以使用任何替代范型参数名，如
// let myIdentify: <U>(arg: U) => U = identify
```

这里，`<T>(arg: T) => T`就是范型函数类型，而普通的函数类型举例如：`(arg: number) => number`；


### 范型接口

如果我们把上面的案例进行改造，定义一个接口来实现范型函数类型的表示，那么就可以改写成如下形式
```js
interface CreateIdentifyFn {
    <T>(arg: T): T
}
// 带有范型接口的完整范型函数

let myIdentify: CreateIdentifyFn = identify
```

这就引出了范型接口的概念，只不过如上这个接口有点不伦不类，接口内有范型变量，又没有地方识别它；<br>
正确的范型接口应该是让接口自身去接收范型变量；

```js
// 普通接口
interface ICreateIdentifyFn {
    arg: number: number
}
// 范型接口
interface ICreateIdentifyFn<T> {
    (arg: T): T
}
```

再结合范型函数案例，就可以写出正确的运用范型接口的范型函数代码

```js
interface ICreateIdentifyFn<T> {
    (arg: T): T
}
let myIdentify: ICreateIdentifyFn<string> = identify
```

#### 范型接口的应用案例

1、定义一个用户信息类，用于实例化用户数据
```js
class User {
    readonly id: number  // ?表示可选属性
    name: string
    age?: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}
```

2、定义一个操作类，可以存储用户数据，和增加及查询用户数据对象的操作<br>
这里用`CRUD ---> create|Read|Update|Delete`来表示操作

```js
class UserCRUD implements IBaseCRUD<User> {
    data: Array<User> = []
    // 给用户添加id，并追加到用户列表中
    add(user: User): User {
        // 产生ID，构建新的user
        user = { ...user, id: Date.now()}
        this.data.push(user)
        return user
    }
    // 根据用户id查找用户并返回
    getUserId(id: number): User {
        const user = this.data.find(item => item.id = id)
        return user
    }
}
```

3、为了规范与约束，我们可以定义一个泛型接口`IBaseCRUD`，用于约束此类的实现过程及智能提示；`IBaseCRUD`实现如下

```js
interface IBaseCRUD<T> {
    data: Array<T>
    add: (t: T) => T
    getUserId: (id: number) => T
}
```

4、使用

```js
const userOp = new UserCRUD()
const { id } = userOp.add(new User('小明', 18))
console.log(userOp.data) // [{ name: '小明', age: 18, id: 1679831644914 }]
console.log(userOp.getUserId(id))  // { name: '小明', age: 18, id: 1679831644914 }
```


### 范型类

知道了范型函数、范型接口后，范型类也就不难了，与前两者一样，范型类使用`<>`接收范型变量，跟在类名后面。

```js
// 普通类
class Number {
    defaultValue: number
    constructor(val: number) {
        this.defaultValue = val
    }
    add: (x: number, y: number) => number = (x: number, y: number): number => {
        return x + y
    }
}

// 范型类
class GenericNumber<T> {
    defaultValue: T
    add: (x: T, y: T) => T
}
```

>范型类与普通类不同的是，它的方法不需要有具体的实现，只需要定义范型类型即可。


##### 使用范型类

同样使用`new`关键字对范型类进行实例化，不同的是，实例需要对范型类中的属性和方法先进行实现，才能使用。
```js
const g1: GenericNumber<number> = new GenericNumber<number>()
// 实现
g1.defaultValue = 5
g1.add = function(x, y) {
    // return 'hello'  // Error，必须是number类型，因为你在范型类中规定了它
    return x + y
}
// 使用
g1.add(g1.defaultValue, 12)
```

### 范型约束

范型约束可以告知此范型，必须要有某些规则，否则给出智能提示；

如果我们直接对一个泛型参数取 `length` 属性, 会报错, 因为这个泛型根本就不知道它有这个属性

```js
function fn<T>(x: T): void {
    console.log(x.length)  // Property 'length' does not exist on type 'T'
}
```

使用接口来约束泛型必须要有`length`属性

```js
interface ILength {
    length: number
}
function fn2<T extends ILength>(x: T): void {
    console.log(x.length)
}
fn2('abc')
fn2(123) // Argument of type 'number' is not assignable to parameter of type 'ILength'
```

##### 在泛型约束中使用类型参数

你可以声明一个类型参数，且它被另一个类型参数所约束。 比如，现在我们想要用属性名从对象里获取这个属性。 并且我们想要确保这个属性存在于对象 obj上，因此我们需要在这两个类型之间使用约束。

```js
function getProperty(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, 'a'); // okay
getProperty(x, 'm'); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```


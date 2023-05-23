#### 基本数据类型

TS 的核心原则之一是对值所具有的结构进行类型检查，通常来说定义某种类型后不可被赋值为其他类型（any除外）

### 布尔类型

```js
let flag: boolean = true
```

### 数值类型
```js
let a1: number = 10  // 十进制
let a2: number = 0b1010  // 0b二进制    - 10
let a3: number = 0o12    //0o八进制    - 10
let a4: number = 0xa  // 0x十六进制   - 10
```

### 字符串类型
```js
let str: string = 'lucy'
let join: string
join =`${str} ${a1}岁` // lucy 10
```

### Null 和 Undefined
TS中，`undefined`和`null`都有自己的类型，分别叫`undefined`和`null`。他们本身的类型作用不是很大。

默认情况下，他们是所有类型的**子类型**，也就是说，你可以它们赋值给所有其他类型的变量。除非设置了`--stringNullChecks`标记，官方鼓励打开此标记，这个建议多少有点官方了。
```js
let und: undefined = undefined
let nll: null = null
let numUnd: number = und // 严格模式下：Error: Type 'undefined' is not assignable to type 'number'
```

### 数组类型

TS有两种定义数组的方式：<br>
（1）使用数组类型，`元素类型[]`，表示由此类型的多个元素组成一个数组；<br>
（2）使用数组范型， `Array<元素类型>`;
```js
// 元素类型 + []
let list: number[] = [1, 2, 3]
// 数组范型
let arr: Array<string> = ['math', 'english', 'physics']

// any类型元素的数组 - 见下方
let anyArr: any[] = [1, 'cool', true]
```

### 元组 Tuple

以上前两个数组都有一个相同的特性，即所有的元素都是同一种数据类型；后一个虽然支持多种类型组合，但基本失去了数组类型检查的功能，只要是个数组就能通过检查；为了解决这个问题，TS提出了`元组`的概念。

元组类型允许表示一个**已知元素数量和元素类型**的数组，各元素的类型不必相同，但类型必须有序；他有以下几个特性：
1. 可以定义数组的各个元素的类型；
2. 对于已定义类型的元素，支持静态语法分析；
3. 访问或赋值越界的元素时，会使用`联合类型`替代和执行静态语法分析（联合类型后面介绍）；
4. 支持数组原型链上的各种方法；

```js
let tup: [string, number]
tup = ['hello', 10]
tup[0].slice(1) // OK
tup[1].slice(1) // Error, 'number' does not have 'slice'
tup[5] = 'world' // OK, 越界使用联合类型（string | number）执行检查
tup[6] = true   // Error, 布尔类型不是联合类型中的一种
```


### 枚举类型 enum  

>枚举类型`enum`（`/ɪˌnjuːm/`）是TS对JS标准数据类型的一个补充，作用是为一组值赋予一个友好的名字。

你可能有过相同的操作，将一系列长而难记的常量定义在一个配置文件中，自定义一个好记的`key`来承载这个变量，相对麻烦。<br>
TS为了简化这种操作，提供了枚举类型`enum`，使用**元素编号**替代配置对象的`key`，它是一个可自定义的“下标”，同`key`一样可用于读取枚举的元素，甚至修改元素的值（一般不常用，枚举的值大部分是常量或配置内容）。<br>
1. 默认情况下，枚举元素的编号从`0`开始，这一点与数组的下标类似；
2. 支持自定义元素编号，且修改某个元素编号后，其后面的元素以此为基础继续递增；
3. 支持双向取值，即可通过元素编号取出元素，也可以通过元素取出元素编号；

```js
// 定义一个枚举类型的变量，它好比是一个配置文件，配置了一系列枚举值
enum Color {
    Red, // 默认元素编号从0开始递增
    Green,
    Blue = 8, // 自定义元素编号后,后续的以此递增
    Purple
}
// 读取某个枚举元素的元素编号
let c1No: Color = Color.Red     // 0
let c2: Color = Color[1]        // Green
let c3: Color = Color[8]        // Blue
let c4No: Color = Color.Purple  // 9，以前一个元素8递增加1得到
```
为了加深理解这个新类型探其原理，我们对其进行编译，可以看到，本质上还是对对象的特殊处理，利用给属性默认赋值的特性设置自定义元素编号，再给元素编号设置元素值，最终，得到了`Color`对象拥有8个属性，分别是下标和元素值
```js
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 8] = "Blue";
    Color[Color["Purple"] = 9] = "Purple";
})(Color || (Color = {}));
```

### Any类型

一些值可能来自于动态的内容，或者第三方库，或者暂不清楚变量是什么类型。我们不希望也不需要类型检查器对其进行检查而是直接通过编译阶段，这时候就可以使用Any类型。

Any类型对于现有代码的改造是非常有用的，它允许我们选择性的包含或移除类型检查，支持变量调用各种各样的方法；

```js
let notSure: any = 20  // OK
notSure = 'maybe a string instead'  // OK
notSure = false  // OK
```

### Void类型

某种程度上来说，void类型像是与any类型相反，它表示“没有类型”，即除 undefined 和 null 外，不能是其他任意类型。

Void类型常用于对函数返回值的类型注解，表示该函数没有返回值，或返回值是 undefined 和 null；也可以给变量做类型注解，不过一般不这么用。
```js
function fn(): void {
    console.log('this function without return')
    // return 'undefined' // 或者手动写了undefined的return，一般不会这么写
}
```

### Never类型
该类型比较抽象，表示哪些永远不存在的值的类型，它是任何类型的子类型，也可以赋值给任何类型，没有类型void是never的子类型，注意any类型不是never子类型，恰恰相反，never是any的子类型。

```js
// 返回never的函数必须存在无法到达的终点
function error(message: string): never {
    throw new Error(message)
}
function infiniteLoop(): never {
    while(true) {
    }
}
```

### <span style="color: red">Object</span>类型
!> Object类型不是表示对象类型，而是表示**非原始类型**，即除`number, string, boolean, symbol, null` 或 `undefined`之外的类型

```js
function foo (p:object): object {
    return {
        name: 'foo',
        result: 'objType'
    }
}
foo({name: 'fooName'})  // OK
foo([a: 1])  // OK
```

### 联合类型
联合类型（Union Types）使用竖线将多个类型联合使用，允许开发者设置多个类型中的某一种即可

```js
function bar(x: string|number):string {
    return '联合类型测试'
}
bar(100)  // OK
bar('one hundred') // OK
```


### 类型断言

TS认为，有时候开发者会比TS更了解某个值的详细信息，如清楚的知道某个实体在某些具体情况下会发生什么逻辑，此时就可以使用类型断言来告诉TS编译器，“相信我，我知道我在干什么”。编译器遇到类型断言会假设开发者已经进行了必要的检查。

定义类型断言有两种形式<br>
（1）<类型>值；<br>
（2）值 as 类型；在tsx中只能用这种方式；

```js
function getLength(x: string|number): number {
    let resultLen: number
    if ((x as string).length) {
        resultLen = (<string>x).length
    } else {
        resultLen = (x as number).toString().length
    }
    return resultLen
}
getLength('abcd')  // OK
getLength(1234)    // OK
```

### 类型推断

TS会在没有明确指定类型的时候，推测出一个类型
- 定义变量时赋值了，推断为当前值的类型；
- 定义变量时没有赋值，推断为any类型；

```js
let txt = 10 // ==> number
txt = 'smart' // Error： Type 'string' is not assignable to type 'number'

let txt2 // ==> any
txt2 = 100
txt2 = 'smart'
```


### 使用let

ES6推出`let`和`const`，因为TS是JS的超集，所以天然的支持了它们。当用`let`声明一个变量，它使用的是词法作用于或**块作用域**，在声明该变量之前的区域都属于**暂时性死区**，它用来说明我们不能在`let`之前访问它们。TS的出现，支持了ES6这一初心.

```js
a++  // illegal to use 'a' before it's declared;
let a
```
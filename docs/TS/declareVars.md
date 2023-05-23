#### 变量声明

### 解构的数组

对解构的数组进行变量声明时，使用元组对其进行类型约束
```js
function func([first, second]: [number, number]) {
    console.log(first)
    console.log(second)
}
let input = [1, 2]
f(input)
```


### 解构的对象

容易混淆的是，对象解构支持重命名，也是使用冒号表示

```js
// 解构重命名
let obj = { a: 100, b: 'cool' }
const { a: aNew, b: bNew } = obj
```
注意，以上的冒号不是指示类型的。 如果你想指定它的类型， 仍然需要在其后写上完整的模式。
```js
// TS解构类型约束
let {a, b}: {a: string, b: number} = o;
```


### 默认值

```js
type C = { a: string, b?: number }
function keep(obj: C): void {
    let { a, b = 1001 } = obj
}
```
以上，即使 `b` 为 `undefined` ， `keep` 函数的变量 `obj` 的属性 `a` 和 `b` 都会有值。


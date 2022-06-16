#### 类数组对象 Array_like Object
### 引言 <!-- {docsify-ignore} -->
&emsp; 我们知道数组和对象都是复合型数据类型（引用类型），即数组成员或对象成员存放的是指向变量值所在地址空间的指针。
<br>

<div style="display: flex; justify-content: space-around;">
    <img src="/static/image/code/array_struct.png" />
    <img src="/static/image/code/object_struct.png" />
</div>

&emsp; 在控制台上可以很清晰的看到，数组的存放逻辑本质上和对象是一样的，数组的下标类同于对象的`key`，数组的值类同于对象的`value`。数组上有`length`，挂有数组的原型方法；对象挂有对象的原型方法。

### 定义
`Array_like Object`，又称**类数组对象**；指的是数据结构类似数组，却又不是数组的一类特殊对象。
<div style="display: flex; justify-content: space-around;">
    <img src="/static/image/code/array_like-object_struct.png" />
</div>

&emsp; 从结构上可以得到两点信息：
- 类数组对象在自身属性结构上和数组一致，有索引值，也有`length`属性，<b style="color: blue">（【本质特征】）</b>
- 但原型方法上挂载的全是对象的原型方法。也就是说，他没有数组的原型方法如`push`、`forEach`、`indexOf`等。意味着众多的数组方法它都不能直接用。

<br>

### 转换为数组

##### 1、`let arr = Array.prototype.slice.call(arrayLike);`
该方案是ES5的解决思路。也可以简写为 `let arr = [].slice.call(arrayLike);`<br>
&emsp; `call`方法一个参数表示目标执行环境，在数组调用`slice`方法时，去执行类数组对象`arrayLike`并返回结果。 <br>
&emsp; `slice`方法未传入参数表示：从第0个开始，到数组末尾结束切割获取子数组；不改变原数组，返回新数组。

> 该方案巧妙的利用了`call`改变了`slice`方法的执行环境。通俗的说就是，我`arrayLike`虽然没有数组原型方法`slice`，但我可以利用`call`去`Array`的原型对象里借用执行
<br>

##### 2、`Array.from(arrayLike);`
该方案来源于ES6。<br>
&emsp; ES6增强了数组方法，提供了`from()`方法专门用于将类数组对象和可遍历（Iterable）对象转化为真正的数组。该方法不仅支持将类数组对象转化为数组，且任何有`length`属性的对象，都可以转换。
<br>

##### 3、数组的扩展运算符`...`
&emsp; 需要注意的是，扩展运算符背后调用的是遍历器接口（`Symbol.iterator`），如果一个对象没有部署这个接口，就无法转换.
```javascript
function fn() {
    console.log(...arguments) // 将输出一个参数列表数组
}
```

<br>

### 典型的类数组对象

##### 1、函数参数对象 arguments
```javascript
function foo() {
    console.log(arguments)  // 类数组对象
}
```
##### 2、获取dom元素操作
```javascript
let ps = document.querySelectorAll('p')
console.log(ps)  // 类数组对象
```



<br>

### 与Iterator对象区别
!> 类数组对象和可遍历（Iterable）对象不是一回事，直观区别就是类数组对象有`lenth`属性，但可遍历对象没有；<br>
可遍历对象属于`Symbol`类型，在控制台上无法打印出其内部的数据结构，只能看到如 `Array Iterator {}`，而类数组对象本质还是Object，可以很清晰的看到变量存储的数据信息。

控制台信息如下：
<div style="display: flex; justify-content: space-around;">
    <img src="/static/image/code/symbol_iterator_struct.png" />
</div>
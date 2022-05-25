#### 闭包Closure

### 什么是闭包

关于闭包是什么，官方并没有给明确说法。<br>
字面意思；函数中返回函数。<br>
民间说法：沟通内外部方法的桥梁（见下方）

```javascript
function fn() {
    let name = 'zfs'
    return function() {
        console.log(name)
    }
}
```

<br>

### 作用域空间

作用域空间也可以描述为当前的执行环境上下文，限定了能够被访问到的变量、方法和属性；

JS作用域空间分为几大类：
- **全局作用域：** 在全局范围内都可以访问，会造成内存泄漏
- **私有作用域：** 在私有局部空间内可以访问；外部无法访问私有作用域内的方法和属性。
- **块所用域：** 如对象内部，Class内部等

```javascript
let user = 'zfs'    // user是全局变量，它保存在全局作用域的Script属性里面，是全局可访问的。
function scope() {
    let height = '177'  // height是局部变量，它保存在全局作用域的Local属性里面，是局部可访问的。
    console.log(user)   // zfs     
}
scope() // 此时该方法的this指向window，因为该方法定义在window里调用
console.log(height)     // undefined
```

<br>

### 活动对象 Active Object(`AO`)

活动对象：AO（Active Object）：计算机用来决定可访问变量的策略；
1. 用于存储运行时的方法及局部变量（注全局变量不会存储在AO中）
2. 只有当前可以被访问的方法和局部变量才会被储存到AO中，当方法执行完成，属于该方法的局部变量也会在AO中销毁，因此外部无法访问该方法的局部变量
3. 当变量被AO剔除时，就会被GC回收
4. 全局变量不会被GC回收，会永久存在内存当中（Script属性里），因此他会污染其他局部变量，也因此不建议定义全局变量

<br>

### 作用域链

因为作用域可以存在嵌套关系，子作用域会继承父作用域属性和方法；<br>
JS在多层作用域在查找变量时，会从自身沿着作用域链一层一层的往上查找，找到即停止（就近原则）
```javascript
let color = 'white'
function fn1() {
    let color = 'blue'
    function fn2() {
        let color = 'red'
        console.log(color)   // red
    }
    fn2()
}
fn1()
```

<br>


### 闭包

沟通内外部方法的桥梁
- 闭包会延长变量的生命周期：闭包会使变量常驻在内存中，就像全局变量一样，因此需要慎用（但他不会污染其他局部变量），闭包里的变量用完后，可以手动回收，如清空。
- 闭包创建一个私有作用域。
- 闭包诠释了面向对象编程的好处：数据的隐藏和封装。


```javascript
function outer() {  // 外部方法
    let name = 'zfs'
    let height = '177'
    return function inner() {  // 内部方法
        return name
    }
}

function fn3() {
    let getInnerData = outer()
    console.dir(getInnerData)    // f inner()
fn3()
```
在控制台上可以看到，`fn3`除Script作用域外，还有一个Closure作用域即闭包：它包含了 `{ name: 'zfs' }`，是通过outer的内部方法`inner` `return`而来


?> Vue中的 data() 为什么是一个函数？<br>**答**：Vue中的data是通过闭包实现的一个私有作用域空间，保证不同组件之间的data相互独立不干扰。


<br>

### 闭包中的`this`

`this`是在运行时基于函数的执行环境绑定的，在全局函数中，`this`等于`window`（在严格模式下等于null），而当被某个对象的方法调用时，`this`就等于那个对象。如果是匿名函数，`this`也指向`window`

```javascript
var name = 'the window'

let obj = {
    name: 'zhangfs',

    getName: () => {
        return function() {
            return this.name
        }
    }
}
console.log(obj.name)  // 'zhangfs'
console.log(obj.getName()())  // 'the window'
```

<br>

### 闭包内存泄漏与解决

&emsp; 由于闭包设计的特殊性，即在作用域内部始终保持着某个函数对某个变量的引用，因此该变量的引用数至少为1，也就无法被GC回收。虽然V8开始尝试回收被闭包所占用的内存，但大家还是谨慎使用闭包。

&emsp; 我们也可以优化代码，以便闭包占用内存的回收。例如，代码中创建一个dom元素，可以做如下修改：
```javascript
// 问题代码
function createElement() {
    var ele = document.getElementById('ele')
    ele.onclick = function() {
        console.log(ele.id)
    }
}

// 改进后
function createElement() {
    var ele = document.getElementById('ele')
    var id = ele.id

    ele.onclick = function() {
        console.log(id)
    }
    ele = null
}
```

以上代码我们做了两步优化，<br>
（1）我们把`ele.id`保存在副本变量中，避免了直接对dom元素`ele`直接的访问 <br>
（2）有了第一步，闭包就不再引用`ele`元素了，但仍然存在一个引用。因此手动将dom元素设置为null，来释放内存空间

<br>

### 模仿块级作用域
使用闭包实现计数器，以下代码虽然是使用`var`来定义`count`，但对于不同的调用方，`count`之间是不会相互影响的。
```javascript
function makeCounter() {
    var count = 0
    function changeBy(num) {
        count += num
    }
    // 外部无法访问count和changeBy，我return什么，外部才能用什么，这很好的保护的内部的属性和方法
    return {
        add: function() {
            changeBy(1)
        },
        reduce: function() {
            changeBy(-1)
        },
        value: function() {
            return num
        }
    }
}

let counter1 = makeCounter()
let counter2 = makeCounter()

console.log(counter1.value())
counter1.add()
counter1.add()
counter2.add()
console.log(counter1.value())  // 2
console.log(counter2.value())  // 1
```
两个计数器都是通过闭包来生成，他们拥有自己的词法环境，且互相独立不干扰，即：`counter1`里的属性和方法是它所私有的，所以当我们去改变它时，`counter2`是不受影响的。



<br>
<br>

[下一篇：this](/JS_basic/this)

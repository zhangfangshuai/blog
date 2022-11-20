
### 为什么需要JSX

JSX全称 JavaSript XML，是React定义的一种类似于XML的JS扩展语法：JS+XML。

JSX被创造出来，就只为了解决一个问题，那就是 <span style="background: lightgreen; padding: 2px 6px;">React原生创建虚拟DOM太繁琐，有了JSX可以让开发人员以熟悉的HTML编码方式更简单的创建虚拟DOM。</span>

看一个例子：实现一个如下需求的HTML
```html
<div id="app">
    <!-- 需要用虚拟DOM实现的HTML部分 - start -->
    <div id="title">
        <span>Hello,React</span>
    </div>
    <!-- 需要用虚拟DOM实现的HTML部分 - end -->
</div>
```

##### 使用React原生创建虚拟DOM

`document.createElement()`是用于创建真实DOM，而React提供了`React.createElement()`用于创建虚拟DOM。

【语法】`React.createElement(标签名, 标签属性集对象，标签体内容)`
```javascript
// 使用React的API创建，使用javascript语法编写 type="text/javascript"
const SubVDOM = React.createElement('span', {}, 'Hello,React')
const VDOM = React.createElement('div', { 'id': 'title', SubVDOM })

// 使用ReactDOM将虚拟DOM渲染到真实DOM上
ReactDOM.render(VDOM, document.getElementById('app'))
```

##### 使用JSX创建虚拟DOM
```jsx
// 使用JSX创建，需要babel插件做语法转换成浏览器认识的js； type="text/babel"
const VDOM = (
    <div id="title">
        <span>Hello,React</span>
    </div>
)

// 使用ReactDOM将虚拟DOM渲染到真实DOM上
ReactDOM.render(VDOM, document.getElementById('app'))
```
#### 总结
1. JSX本质是JS的语法糖，是React.createElement(component, props, ...children)的JS+XML写法；它对于开发人员来说，更友好，且理解成本低
2. 通过babel的转化，JSX创建虚拟DOM的写法可以转化成为JS的写法
3. 作用是用来创建虚拟DOM，写法 `var ele = <h1>Hello JSX<h1>`
4. 它不是字符串，也不是HTML/XML标签，最终产生的就是一个一般对象
5. 标签名定义与XML类似，是任意的，并不规定必须是有意义的HTML标签。React规定如果虚拟ODM里的标签是小写开头，则直接转化为HTML的同名标签，没找到会报错。如果标签首字母是大写开头，则会去找React组件，当然找不到也会报错。

!> 可以把JSX代码复制粘贴到[babel官网-试一试](https://www.babeljs.cn/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.20.4&externalPlugins=&assumptions=%7B%7D)中，查看babel转化结果。


&emsp;

### 什么是虚拟DOM，和真实DOM的区别

React中的虚拟DOM，是由React定义和创建，为了提高动态页面加载和更新性能的一个一般对象。

通过代码观察
```html
<div id="app">
    <div id="virtualDOM">提供给虚拟DOM插入使用</div>
    <div id="realDOM">真实DOM案例</div>
</div>
```

```javascript
// 创建虚拟DOM和插入页面
const VDOM = <span>虚拟DOM创建的HTML标签</span>
ReactDOM.render(VDOM, document.getElementById('virtialDOM'))

// 获取真实ODM
const RDOM = document.getElementById('realDOM)

console.log(VDOM) // Object
console.log(VDOM instanceof Object) // true
console.log(RDOM) // <div>真实DOM案例</div>
debugger;
```
可以看到虚拟DOM本质上就是一个普通对象，而真实DOM浏览器会打印出一个HTML节点。
**为了可以查看真实DOM的内容，可以插入debugger语句，在控制台使用鼠标移入RDOM变量观察详情。**，加入debugger后，对比两个DOM发现，虚拟DOM的属性不过十来个，而真实DOM几乎上百个属性

#### 总结
1. 关于虚拟DOM，本质上是一个一般对象
2. 虚拟DOM比较轻，真实DOM比较重；因为虚拟DOM是React内部在用，很多真实DOM所需要的操作并不需要。
3. 虚拟DOM最终会被React转化为真实DOM，渲染在页面上。


&emsp;

### JSX相比于JS有哪些语法规则

1. 定义虚拟DOM时，不要使用引号
2. 标签中混入JS表达式时需要使用`{}`。这是React定义的语法。如果在`{}`的JS表达式逻辑内，还有需要表示变量的，依旧用`{}`再包裹。
3. 样式的类名指定不能用`class`，要用`className`
4. 内联样式，要用`style={{key:value}}`形式写，两个花括号外部一个表示React内嵌JS的语法，内部一个表示样式属性集合是一个对象。内联样式多个单词用小驼峰。
5. 虚拟DOM只能有一个根标签
6. 标签必须闭合，可以是自闭合
7. 标签首字母
    - 如果是小写开头，则React会直接转化为html的同名标签，如果该html标签不存在，则报错；
    - 如果是大写开头，则找项目中的React组件渲染，找不到同样报错


&emsp;

### JSX中可以写什么JS代码

在JSX中可以使用花括号`{ }`内嵌JS内容，但只能写 **JS表达式**，不能写 **JS语句** 等其他JS代码，JS语句主要包括如下内容

##### JS表达式
一个JS表达式会产生一个值，可以放在任何一个需要值的地方

- `a`
- `a + b`
- `demo(1)`
- `arr.map()`
- `function() {}`
- ...

##### JS语句
一个JS语句更多的是控制代码的走向

- `if() {} else {}`
- `for() {}`
- `switch() { case XXX }`


#### React三大属性之一 · state（状态）

### 理解

1. `state`是组件对象最重要的属性，值是对象（可以包含多个key-value组合），用来存放React动态视图所需要的数据。
2. 组件被称为"状态机"，通过更新组件的`state`来更新对应的页面显示（利用`render`函数重新渲染组件）

&emsp;

### 注意

1. 组件中的 `render` 方法中的 `this` 为组件实例对象。
2. 组件自定义的方法中的 `this` 为undefined，解决办法有两个：
    - 强制绑定`this`：在构造器中通过函数对象的`bind()`实现。 `this.fn = this.fn.bind(this)`
    - 箭头函数
3. 状态数据，不能直接修改或更新。必须通过内置API-`setState`进行更新。

&emsp;

### 为什么必须命名为state

因为React规定只能使用`setState` 来修改状态，该方法为ReactDO内置的API，在该方法中，写死了状态的变量名为`state`

&emsp;

### 为什么必须通过setState修改state

会发现直接修改`this.state.var`也能获取到值，但视图并不更新。

React在setState方法中要执行render函数，保证页面刷新，而直接修改的方式并没有调用该方法。


&emsp;

### 自定义方法为什么不能用function定义

&emsp; 如代码注释中所述：自定义函数不能用`function`，写了`function`就有私有作用域，就又引入类的实例对象的实例方法被直接赋值给回调函数：回调函数不是由类实例调用，且在类的局部开启严格模式后`this`丢失的问题。只不过是从原型对象改成了实例对象而已，并没有质的改变。

&emsp; 箭头函数自身不存在`this`，因此必定指向上层作用域，即`Weather`实例，所以能保证回调函数调用时this指向正确。

```js
class Weather extends React.Component {
    // 干掉构造器函数
    // constructor(props) {
    //     super(props)
    //     // 标准的写法，初始化数据在构造器函数中定义
    //     this.state = { isHot: true, wind: '微风' }
    //     // 解决原型对象上的函数被回调函数直接赋值后，以及类中的方法开启部分严格模式的原因，导致this丢失，为undifined问题
    //     this.changeWeather = this.changeWeather.bind(this)
    // }

    // 1. 初始化状态
    // 如下代码的含义是：给类的实例对象添加一个属性state，值为一个对象。
    state = { isHot: true, wind: '微风' }

    render() {
        const { isHot, wind } = this.state
        return <h2 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}, {wind}</h2>
    }
    
    // 2. 自定义方法 - 要用赋值语句 + 箭头函数
    // 如下代码的含义是：给类的实例对象添加一个属性changeWeather，值为一个函数。
    // 注意这里一定不能用function，写了function就有私有作用域，就又引入类的实例对象的实例方法被直接赋值给回调函数：回调函数不是由类实例调用，且在类的局部开启严格模式后this丢失的问题。只不过是从原型对象改成了实例对象而已，并没有质的改变。
    // 箭头函数自身不存在this，因此必定指向上层作用域，即Weather实例，所以能保证回调函数调用时this指向正确。
    changeWeather = () => {
        const { isHot } = this.state
        this.setState({
            isHot: !isHot
        })
    }
}

// 渲染虚拟DOM到真实DOM
ReactDOM.render(<Weather/>, document.getElementById('app'))
```


&emsp;

### 执行ReactDOM.render(<Weather/>,...)之后，都发生了什么？

这个`render`与类式组件中的`render`方法没有任何关系。

当页面执行 `ReactDOM.render(<Weather/>,...)`之后：
1. React解析代码，发现需要渲染一个首字母大写的名为`Weather`的自定义组件（首字母小写它会去寻找html组件）
2. 发现`Weather`是使用类式定义的，React随后`new`出该类的实例，并通过该实例调用到原型上的render方法，通过开发人员编写的JSX代码生成虚拟DOM并返回
3. 将返回的虚拟DOM转为真实DOM，随后呈现在视图中。


&emsp;

### ReactDOM.render 与类式组件中的render方法什么关系？

没任何关系，仅是同名而已。

类式组件中的`render`方法是用于将开发者编写的JSX生成虚拟DOM并返回；而`ReactDOM.render`的作用是将返回的虚拟DOM渲染到真实DOM上。




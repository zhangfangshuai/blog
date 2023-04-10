#### React扩展知识

### 1、setState的两种写法
##### （1）传一个对象
```js
state = { count: 1 }
this.setState({ count: 100 })
console.log(this.state.count) // 1
```
其实虽然setState是同步的方法，但setState引起的状态的更新，是异步的。因此上面输出了`1`而不是`100`，setState还支持第二个参数
```js
this.setState({ count: 100 }, () => {
    // 该方法在setState完成异步更新后，即render函数调用完成后执行
    console.log(count)  // 100
})
```
##### （2）传一个函数
如果给setState传了一个函数，则入参中可以接收两个参数，分别为state和props。函数的返回值是一个对象，表示要更新的state集合
```js
this.setState((state, props) => {
    return { count: state.count + 1 }
})
// 如果不用props参数，则改写成如下
this.setState(state => ({ count: state.count + 1 }))
```

对象式写法是函数式写法的简写方式，推荐使用



### 2、路由懒加载：lazyload

```jsx
import React, { Component, lazy } from 'react'
// 按需引入组件
// import About from './components/About.jsx'
// import Home from  './components/Home.jsx'
const About = lazy(() => import('./components/About.jsx'))
const Home = lazy(() => import('./components/Home.jsx'))
```
这么引入之后，需要在注册路由的位置，添加`<Suspese fallback={替换组件}></Suspese>`用来表示当懒加载的组件未加载回来时，显示的内容。
```jsx
import Loading from './components/Loading.jsx'
<Suspense fallback={<Loading />}>
    <Route path="/about" component={About} />
    <Route path="/home" component={Home} />
</Suspense>
```


### 3、函数式组件Hooks
#### 3.1 State Hooks
State Hooks允许在函数式组件中，使用state。<br />
- 函数式组件使用state更新后，Demo函数相当于render函数，被执行了n+1次
- 但是state hooks这一行代码，react内部做了处理，会缓存之前执行的state，避免被函数执行时多次初始化
- 有几个状态，就定义几个React.useState()
  
```js
function Demo() {
    /**
     * @func React.useState在函数式组件中创建状态
     * @param {any} 状态的初始化值
     * @return {Array} 返回一个数组，数组第一项是状态，第二项是改变状态的方法。
     */
    const [count, setCount] = React.useState(0)
    const [name, setName] = React.useState('tom')

    function add() {
        // setCount(count + 1) // 写法一
        setCount(count => count + 1) // 写法二
    }

    function changeName() {
        setName('jack)
    }

    return (
        <div>
            <h2>当前求和为: { count }</h2>
            <h2>我的名字是: { name }</h2>
            <button onClick={add}>点我+1</button>
            <button onClick={changeName}>点我改名</button>
        </div>
    )
}
```

#### 3.2 Effect Hooks
`React.useEffect()`可以模拟三个生命周期钩子： componentDidMount + componentDidUpdate，componentWillUnmount
- 第二个参数数组不传，相当于检测所有属性
- React.useEffect第一个参数回调函数中，返回的函数，相当于 componentWillUnmount
```js
function Demo() {
    const [count, setCount] = React.useState(0)

    /**
     * @func React.useEffect用于模拟生命周期钩子
     * @param {Function} 检测属性发生变化时的回调函数
     * @param {Array} 要监听变化的属性数组
     */
    React.useEffect(() => {
        console.log('这里的内容，相当于componentDidMount + componentDidUpdate执行的内容')
        let timer = setInterval(() => {
            setCount(count => count + 1 )
        }, 1000)
        return () => {
            console.log('这里的内容，相当于componentWillUnmount执行的内容')
            clearInterval(timer)
        }
    }, [])

    function add() {
        setCount(count => count + 1 )
    }

    return (
        <div>
            <h2>当前求和为: { count }</h2>
            <button onClick={add}>点我+1</button>
        </div>
    )
}
```

#### 3.2 Ref Hooks
`React.useRef()`可以在函数式组件中存储/查找组件内部标签的任意其他数据，保存标签对象，功能与React.createRef()一样
- 语法：`const refContainer = React.useRef()`
- 需要多少个ref，就定义多少个useRef

```js
function Demo() {
    /**
     * @func React.useRef用于保存标签对象
     */
    const myRef = React.useRef()

    function show() {
        alert(`当前输入的数据为：${this.myRef.current.value}`)
    }
    return (
        <div>
            <input type="text" ref={myRef} />
            <button onClick={show}>点我提示数据</button>
        </div>
    )
}
```



### 3、与Vue的对比

#### 3.1、JSX与SFC
JSX全称 JavaSript XML，是React定义的一种类似于XML的JS扩展语法；JSX被创造出来，就只为了解决一个问题，那就是 <span class="highlight">React原生创建虚拟DOM太繁琐，有了JSX可以让开发人员以熟悉的HTML编码方式更简单的创建虚拟DOM。</span>

SFC全称 Single-File Component，单文件组件；是Vue提供的、用于编写Vue组件的一种特殊的文件格式，它将`<template>、<script> 和 <style>` 三个块在同一个文件中封装、组合了组件的视图、逻辑和样式，让强相关的关注点自然内聚，同时支持局部样式等。SFC最终也会被vue创建虚拟DOM。

#### 3.2. Vuex与Redux
vuex是vue官方提供的状态管理机，由官方更新和维护。
而Redux则是民间作品，并得到React官方支持和使用的一种统一状态管理方案，react最终提出了react-redux的插件，替代了Redux的使用


#### 3.3、renderProps与插槽技术
React的renderProps预留空间，动态的渲染子组件，**相当于Vue的插槽slot**

1. 使用`render`这个props属性来接收一个函数，函数返回值为一个组件。
2. 在组件中，使用`this.props.render()`来渲染接收到的renderProps.
3. render可以接收参数，用于给要渲染的组件传递参数

```js
export default class Parent extends Component {
    render() {
        return (
            <div>
                <h3>我是Parent组件</h3>
                // 使用renderProps来传递一个子组件
                <A render={(name) => <B name={name}/>
            </div>
        )
    }
}
class A extends Component {
    state = { name: 'tom' }
    render() {
        return (
            <div>
                <h3>我是A组件</h3>
                { this.props.render(name) }
            </div>
        )
    }
}
class B extends Component {
    render() {
        return (
            <div>
                <h3>我是B组件</h3>
            </div>
        )
    }
}
```

#### 3.4、Fragment与template
为了避免生成过多的包裹性却没实际意义的标签，react可以使用`<Fragment>`，vue可以使用`<template>`标签
`Fragment`最终会被React丢弃。且该标签可以接收一个key属性，用于如果需要遍历时使用。相同的功能还有空标签`<></>`，但空标签不能接收`key`属性参与遍历

```js
<Fragment>
    <h3>Hello</h3>
    <span>this is react</span>
</Fragment>
```

#### 3.5、Context与Provider

Context是React提供的一种组件间的通信方式，常用于【祖组件】与【后代组件】间的通信
Provider是Vue提供的注入技术，使用provider-inject，可以有【祖组件】向任意【后代组件】通信
```js
const MyContext = React.createContext()
// const { Provider, Consumer } = MyContext 也可以先解构出来，后续使用时MyContext.Provider改成Provider
export default class A extends Component {
    state = { username: 'A-Component', age: 18 }

    render() {
        const { username, age } = this.state
        return (
            <div>
                <h3>我是A组件</h3>
                // A组件提供出要Provide的属性
                <MyContext.Provider value={{ username, age }}>
                    <B />
                </MyContext.Provider>
            </div>
        )
    }
}

class B extend Component {
    render() {
        return (
            <div>
                <h3>我是B组件</h3>
                <C />
            </div>
        )
    }
}

class C extend Component {
    // C组件（后代组件）如果要接收context，需要先声明接收。和vue的inject一样
    static contextType = myContext
    render() {
        const { username, age } = this.context
        return (
            <div>
                <h3>我是C组件</h3>
                <h4>我从A组件接收到的用户名是：{username}, 年龄是：${age}</h4>
            </div>
        )
    }
}
// MyContext.Consumer用在函数式组件中取出MyContext.Provider的值，在要使用的地方使用MyContext.Consumer标签包裹
```


### 4、错误边界
如果某个组件的子组件发生了错误，则把错误限制在子组件中，不要影响其他组件或父组件。一般组件错误后，可以设置友好的用户交互，如"网络不稳定，请稍后重试"
!> 错误边界只适用于生产环境，测试环境依旧会提示出错误，强提示程序员进行修改。

```js
export default class Parent extends Component {

    state = { hasError: '' } // 用于标识错误

    // 当Parent的子组件发生报错时，会触发getDerivedStateFromError调用，并携带错误信息。
    // 注：（1）只能捕获子组件生命周期产生的错误；
    //    （2）只有在生产环境有效，测试环境还是会吧错误报出来。
    //    （3）只有生命周期中的错误才能捕获
    static getDerivedStateFromError(error) {
        return { hasError: error }
    }

    // 子组件出错时，调用该钩子
    componentDidCatch() {
        // 统计错误次数，发送给后台，埋点，或短信提示程序运维人员
        console.log('渲染子组件时出错了')
    }

    render() {
        return (
            <div>
                <h3>我是Parent组件</h3>
                { this.state.hasError ? <h3>当前网络不稳定，请稍后再试</h3> : <Child /> }
            </div>
        )
    }
}

class Child extends Component {
    render() {
        return (
            <div>
                <h3>我是Child组件</h3>
            </div>
        )
    }
}
```

### 5、组件渲染优化：PureComponent
在创建组件时，通常都是使用 `class A extends Component {}`创建组件.<br>
这种方式有个小问题就是，当用户调用`setState()`，无论页面有没有发生状态的改变，React都会重新调用`render`函数执行更新，其根本原因是因为组件的生命周期钩子`shouldComponentUpdate`默认总是返回`true`
```js
shouldComponentUpdate(nextProps, nextState) {
    return true
}
```
当state不发生改变，页面不让它更新时，我们只需要在该钩子中，对`nextState` 和`this.state`进行对比判断是否变更，来动态控制即可。然而这个过程，React也有其他实现办法，即: 用`PureComponent`替代`Component`

```js
import React, { Component, PureComponent } from 'react'

export default class A extend PureComponent {
    state = { carName: '奔驰C63' }

    changeCar = () => {
        // this.setState({ carName: '迈巴赫' }) // state发生改变，正常更新
        this.setState({}) // state没改变，不更新
    }

    render() {
        return (
            // 空标签效果类似Fragment，但不可传入任何属性
            <>
                <div>我的车是：{this.state.carName}</div>
                <button onClick={changeCar}>换车</button>
            </>
        )
    }
}
```
需要注意的是：react在做state是否发生变更时，只是做的浅比较，如果只是数据对象内部数据变了，返回false，正确的修改方式应该是返回一个新对象或新数组<br>
不要直接修改state数据，而是要产生新的数据
```js
import React, { PureComponent } from 'react'

export default class A extend PureComponent {
    state = { userList: ['小张', '小李', '小王'] }

    addUser = () => {
        const { userList } = this.state
        // 错误的处理方式 - 该方式不会更新
        userList.unshift('小刘‘)
        this.setState({ userList })
        // 正确的处理方式
        this.setState({ userList: ['小刘', ...userList] })
    }

    render() {
        return (
            // 空标签效果类似Fragment，但不可传入任何属性
            <>
                <div>我的车是：{this.state.carName}</div>
                <button onClick={changeCar}>换车</button>
            </>
        )
    }
}
```

#### React的生命周期钩子

### 生命周期钩子图【旧版】

<img src="。/../../static/image/react/lifeCircle.png" />

&emsp;
### 生命周期几条流程【旧版】
#### 初始化阶段
由`ReactDOM.render()`触发---初次渲染
```
1. constructor()
2. conponentWillMount()
3. render()
4. componentDidMount()
```
常会在`componentDidMount`中 开启定时器，发送请求，订阅消息等初始化事件。
<span style="background: lightgreen; padding: 3px 6px;">常会在 componentDidMount 中开启定时器，发送请求，订阅消息等初始化事件。</span>



#### 更新阶段
由组件内部`this.setState()`或父组件`render`触发
```
1. shouldComponentUpdate() // 首次不触发
2. componentWillUpdate()
3. render()
4. componentDidUpdate()
```

#### 卸载组件
由`ReactDOM.unmountComponentAtNode()`触发
```
1. componentWillUnmount()
```
<span style="background: lightgreen; padding: 3px 6px;">常会在 componentWillUnmount 中关闭定时器，取消消息订阅等事件</span>

&emsp;

### 生命周期几条流程【新版】
#### 初始化阶段
由`ReactDOM.render()`触发---初次渲染
```
1. constructor()
2. static getDerivedStateFromProps() // 静态方法 从props获取派生的state对象
3. render()
4. componentDidMount()
```


#### 更新阶段
由组件内部`this.setState()`或父组件`render`触发
```
1. static getDerivedSatteFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate() // 更新前获取快照的最后机会
5. componentDidUpdate()
```

#### 卸载组件
由`ReactDOM.unmountComponentAtNode()`触发
```
1. componentWillUnmount()
```


&emsp;

### 生命周期测试【旧版】
```js
class Count extends React.Component {
    // 构造器
    constructor(props) {
        console.log('Count---constructor');
        super(props)

        this.state = { num: 1 } // 有了构造器，state初始化就写到构造器里，合适点；因为构造器就是拿来初始化数据的。
    }

    // 加1按钮回调 --- 自定义函数使用：赋值语句 + 箭头函数
    add = () => {
        const { num } = this.state
        this.setState({ num: num + 1 })
    }
    // 触发卸载组件按钮回调
    death = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('app'))
    }
    // 出发强制更新按钮回调
    force = () => {
        this.forceUpdate()
    }

    // 组件即将挂载的钩子
    UNSAFE_componentWillMount() {
        console.log('Count---componentWillMount')
    }

    // 组件挂载完毕的钩子
    componentDidMount() {
        console.log('Count---componentDidMount')
    }

    // 组件是否应该被更新的钩子 - 控制组件是否更新的阀门
    // 如果该钩子返回true-则更新执行render，如果返回false-更新被取消
    // 如果该钩子没写，则React会自动补一个且返回值为true。如果需要有自定义逻辑，则覆写次钩子即可。
    shouldComponentUpdate() {
        console.log('Count---shouldComponentUpdate: ', this.state.num < 3)
        return this.state.num < 3
    }

    // 组件即将被更新的钩子
    UNSAFE_componentWillUpdate() {
        console.log('Count---componentWillUpdate')
    }

    // 组件即将被更新的钩子
    componentDidUpdate() {
        console.log('Count---componentDidUpdate')
    }

    // 组件即将卸载的钩子
    componentWillUnmount() {
        console.log('Count---componentWillUnmount')
    }

    // 组件已经卸载的钩子 -- ！！！不存在该钩子
    componentDidUnmounted() {
        console.log('Count---componentDidUnmounted')
    }

    // 组件渲染时调用的钩子
    render() { // 调用次数 1 + n 次
        console.log('Count---render');
        return (
            <div>
                <h2>当前求和为：{this.state.num}</h2>
                <button onClick={this.add}>点我+1</button>&emsp;
                <button onClick={this.death}>点我卸载组件</button>&emsp;
                <button onClick={this.force}>不更新状态，强制更新组件</button>
            </div>
        )
    }
}
```

##### 父子组件生命周期顺序测试
```js
class A extends React.Component {
    state = { num: 0 }

    // 加1按钮回调 --- 自定义函数使用：赋值语句 + 箭头函数
    add = () => {
        const { num } = this.state
        this.setState({ num: num + 1 })
    }

    // 组件渲染时调用的钩子
    render() { // 调用次数 1 + n 次
        console.log('A---render');
        return (
            <div>
                <h2>我是A组件</h2>
                <button onClick={this.add}>点我+1</button>&emsp;
                <B currNum={this.state.num} />
            </div>
        )
    }
}

// 创建子组件B
class B extends React.Component {
    // 组件接瘦到新的props值时触发该钩子
    // 【注意坑】首次接受到prop时不触发，仅再次接收到新props时才出发
    UNSAFE_componentWillReceiveProps() {
        console.log('B---componentWillReceiveProps')
    }

    // 组件是否应该被更新的钩子 - 控制组件是否更新的阀门
    // 如果该钩子返回true-则更新执行render，如果返回false-更新被取消
    // 如果该钩子没写，则React会自动补一个且返回值为true。如果需要有自定义逻辑，则覆写次钩子即可。
    shouldComponentUpdate() {
        console.log('B---shouldComponentUpdate: ', this.props.currNum < 3)
        return this.props.currNum < 3
    }

    // 组件即将被更新的钩子
    UNSAFE_componentWillUpdate() {
        console.log('B---componentWillUpdate')
    }

    // 组件即将被更新的钩子
    componentDidUpdate() {
        console.log('B---componentDidUpdate')
    }

    render() {
        console.log('B---render')
        return (
            <div>
                <h3>我是B组件，接收到的数据是：{this.props.currNum}</h3>
            </div>
        )
    }
}
```

&emsp;

### 生命周期钩子图【新版】

<img src="./../../static/image/react/lifeCircle-new.png" />

&emsp;

### 新旧版本不同的钩子

废弃三个，新增两个。这几个生命周期钩子都在开发过程中极少用到。

#### 即将废弃的钩子

[官网对即将过时的三个生命周期钩子的介绍](https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html)

```
- componentWillMount
- componentWillReceiveProps
- componentWillUpdate
```
&emsp; 【React官方】这些生命周期方法经常被误解和滥用；此外，我们预计，在异步渲染中，它们潜在的误用问题可能更大。我们将在即将发布的版本中为这些生命周期添加 “UNSAFE_” 前缀。（这里的 “unsafe” 不是指安全性，而是表示使用这些生命周期的代码在 React 的未来版本中更有可能出现 bug，尤其是在启用异步渲染之后。）

因此更新钩子为 (即将废弃)
```
- UNSAFE_componentWillMount
- UNSAFE_componentWillReceiveProps
- UNSAFE_componentWillUpdate
```

#### 新增的钩子

```
- getDerivedStateFromProps // 从props中获取派生的state对象。可以返回null
- getSnapshotBeforeUpdate
```
`getDerivedStateFromProps` 横跨挂载和更新两条流程。此方法用于一种极罕见的情形，即任何时候，state的值，都取决于props的值

`getSnapshotBeforeUpdate()` 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期方法的任何返回值将作为参数传递给 `componentDidUpdate()`。

&emsp;

### 新旧对比图

<img src="./../../static/image/react/lifeCircle-compare.png" />

&emsp;

<img src="./../../static/image/react/lifeCircle-compare2.png" />


### 生命周期测试【新版】
```js
class Count extends React.Component {
    // 构造器
    constructor(props) {
        console.log('Count---constructor');
        super(props)

        this.state = { num: 1 } // 有了构造器，state初始化就写到构造器里，合适点；因为构造器就是拿来初始化数据的。
    }

    // 加1按钮回调 --- 自定义函数使用：赋值语句 + 箭头函数
    add = () => {
        const { num } = this.state
        this.setState({ num: num + 1 })
    }
    // 触发卸载组件按钮回调
    death = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('app'))
    }
    // 出发强制更新按钮回调
    force = () => {
        this.forceUpdate()
    }

    // 若任何时候，state都取决于props，则可以使用本钩子，但不推荐
    // 获取派生的状态对象 -- 必须加到类自身上
    // 必须返回null 或 状态对象
    // 能接收参数props
    static getDerivedStateFromProps(props, state) {
        console.log('Count---getDerivedStateFromProps')
        console.log('props:', props)
        console.log('state:', state)
        return null
        // return { num: 102 }
        // return props
    }

    // 更新前获取快照-更新前获取上次状态的最后机会
    // 值传给componentDidMount()第三个参数
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('Count---getSnapshotBeforeUpdate')
        // return null
        return "任何想要获取的东西，可以是任意值，比如浏览器高度"
    }

    // 组件挂载完毕的钩子
    componentDidMount(prevProps, prevState, snapshotValue) {
        console.log('Count---componentDidMount', prevProps, prevState, snapshotValue)
    }

    // 组件是否应该被更新的钩子 - 控制组件是否更新的阀门
    mponentUpdate() {
        console.log('Count---shouldComponentUpdate: ', this.state.num < 3)
        return this.state.num < 3
    }

    // 组件即将被更新的钩子
    componentDidUpdate() {
        console.log('Count---componentDidUpdate')
    }

    // 组件即将卸载的钩子
    componentWillUnmount() {
        console.log('Count---componentWillUnmount')
    }

    // 组件渲染时调用的钩子
    render() { // 调用次数 1 + n 次
        console.log('Count---render');
        return (
            <div>
                <h2>当前求和为：{this.state.num}</h2>
                <button onClick={this.add}>点我+1</button>&emsp;
                <button onClick={this.death}>点我卸载组件</button>&emsp;
                <button onClick={this.force}>不更新状态，强制更新组件</button>
            </div>
        )
    }
}
```
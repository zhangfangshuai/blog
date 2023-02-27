#### React扩展知识

### 与Vue的对比

#### 1、JSX与SFC
JSX全称 JavaSript XML，是React定义的一种类似于XML的JS扩展语法；JSX被创造出来，就只为了解决一个问题，那就是 <span class="highlight">React原生创建虚拟DOM太繁琐，有了JSX可以让开发人员以熟悉的HTML编码方式更简单的创建虚拟DOM。</span>

SFC全称 Single-File Component，单文件组件；是Vue提供的、用于编写Vue组件的一种特殊的文件格式，它将`<template>、<script> 和 <style>` 三个块在同一个文件中封装、组合了组件的视图、逻辑和样式，让强相关的关注点自然内聚，同时支持局部样式等。SFC最终也会被vue创建虚拟DOM。

#### 2. Vuex与Redux
vuex是vue官方提供的状态管理机，由官方更新和维护。
而Redux则是民间作品，并得到React官方支持和使用的一种统一状态管理方案。


#### 2、renderProps与插槽技术
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

#### 3、Fragment与template
为了避免生成过多的包裹性却没实际意义的标签，react可以使用`<Fragment>`，vue可以使用`<template>`标签

```js
<Fragment>
    <h3>Hello</h3>
    <span>this is react</span>
</Fragment>
```



### 错误边界
如果某个组件的子组件发生了错误，则把错误限制在子组件中，不要影响其他组件或付组件
```js
export default class Parent extends Component {

    state = { hasError: '' } // 用于标识错误

    // 当Parent的子组件发生报错时，会触发getDerivedStateFromError调用，并携带错误信息。
    // 注：（1）只能捕获子组件生命周期产生的错误；（2）只有在生产环境有效，测试环境还是会吧错误报出来
    static getDerivedStateFromError(error) {
        return { hasError: error }
    }

    // 子组件出错时，调用该钩子
    componentDidCatch() {
        // 统计错误次数，发送给后台
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

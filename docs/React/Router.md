#### React Router路由

React Router的BrowserRouter本质是利用了浏览器BOM的history对象来实现。由于BOM上的history对象原生API对开发者不太友好，React Router借助了history库的功能。

> history库当前稳定版为history@5，被React Router@6所依赖；history库的版本@4，被React Router的@4、React Router@5所依赖。

### 核心依赖库：history库
[history库](https://github.com/remix-run/history/tree/v4/docs)GitHub地址

#### 1、history库介绍
1. 它是原生history的超集，扩展了如`location`、`canGo`、`block`、`listen`等功能、
2. 提供了3种类型的history，`browserHistory`、`hashHistory`、`memoryHistory`，并保持统一的API
3. 支持发布/订阅功能，当history发生改变时，自动触发订阅函数
4. 提供跳转拦截、跳转确认`basename`等实用功能


#### 2、history库是React Router的核心依赖
history库虽然时React Router的核心依赖，但它跟React本身没有依赖关系。如果项目中有需要操作history场景，可以单独引入实用

通常情况下我们不会使用到，可作为扩展了解

```bash
# 安装
$ npm install --save history
```

```js
// 引入
import { createBrowserHistory } from "history";

var createBrowserHistory = require("history").createBrowserHistory;
```

```html
<!-- 测试包 -->
<script src="https://unpkg.com/history/umd/history.production.min.js"></script>

<!-- 生产包 -->
<script src="https://unpkg.com/history/history.production.min.js"></script>
```

```js
// 使用
// Create your own history instance.
import { createBrowserHistory } from "history";
let history = createBrowserHistory();

// ... or just import the browser history singleton instance.
import history from "history/browser";

// Alternatively, if you're using hash history import
// the hash history singleton instance.
// import history from 'history/hash';

// Get the current location.
let location = history.location;

// Listen for changes to the current location.
let unlisten = history.listen(({ location, action }) => {
  console.log(action, location.pathname, location.state);
});

// Use push to push a new entry onto the history stack.
history.push("/home", { some: "state" });

// Use replace to replace the current entry in the stack.
history.replace("/logged-in");

// Use back/forward to navigate one entry back or forward.
history.back();

// To stop listening, call the function returned from listen().
unlisten();
```

&emsp;

### 路由的安装与使用
React Router有三类，分别是
- 适用于Web开发的`react-router-dom`
- 适用于React Native的`react-router-native`
- 和通用的路由`react-router-anywhere`
其中，`react-router-dom`常用的有两种类型路由：
- history路由
- hash路由

本文以history为例作为讲解。了解更多： [React-Router](https://react-router.docschina.org/)
```bash
# 安装
npm i react-router-dom
```
```js
// 引入
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
```
```jsx
// 使用
class App extends Component {
    render() {
        return (
            <Router>
                <div>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/topics">Topics</Link></li>
                </ul>

                <hr/>
                {/* 注册路由 */}
                <Route path="/home" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/topics" component={Topics}/>
                </div>
            </Router> 
        )
    }
}
```


&emsp;

### 路由组件与一般组件区别

##### 1、 写法不同
一般组件 `<Demo />`
路由组件 `<Router path=demo" component={Demo} />`

##### 2、存放位置不同
一般组件：放在components文件夹下
路由组件：放在pages文件夹下

##### 3、接收到的props不同
一般组件：写组件标签是传递了什么，就能收到什么
路由组件，接收到三个固定属性`history`、`location`、`match`，其中比较重要的参数有
```js
history:
    go(n): // 前往某一个记录
    goBack(): // 回退一个记录
    goForward(); // 前进一个记录
    push(path, state); // 往history栈中压入一个记录
    replace(path, state); // 在history栈中替换一个记录
location：
    pathname: '/home'; // 当前路由path
    search: ''; // 当前路由参数
    state: ''; // 当前路由参数
match:
    params: {}
    path: '/home'
    url: '/home'
```

&emsp;

### 导航组件NavLink的二次封装
react-router-dom 提供了`<Link>`组件，用作路由的导航功能，同时提供了`<NavLink>`组件可以实现路由链接的高亮，通过添加`activeClassName="router-active"`表示当路由被选中时自动插入的类名，默认为`active`。

由于`<NavLink>`有多个通用的参数属性，使得代码冗余，因此二次封装成`MyNavLink`

```jsx
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class MyNavLink extends Component {
  render() {
    return (
      <NavLink activeClassName="router-active" className="your-class" {...this.props} />
    )
  }
}

// 二次封装前NavLink用法：
// <NavLink activeClassName="router-active" className="your-class" to="/home">Home</NavLink>
// MyNavLink用法：
// <MyNavLink to="/home">Home</MyNavLink>
```

&emsp;

### 禁止路由全遍历，找到匹配即停止


React Router会在定义的路由列表对路由进行挨个遍历查找匹配，并不会在找到一个的情况下就停止查找。通常情况下，`path`和`component`都是一一对应的。开发者不会为同一个`path`定义两个组件，因此该功能显得鸡肋。

为了提高效率，我们可以使用`switch`来阻止此事件

```jsx
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <div>
        {/* 注册路由 */}
        <switch>
            <Route path="/about" component={About}>
            <Route path="/home" component={Home}>
            {/* 外层包裹<switch>后，上述匹配到home，就不再继续向下查找。否则Home和Test都会被显示 */}
            <Route path="/home" component={Text}>
            {/* Redirect写在最下方，如果都没匹配上，则执行他 */}
            <Redirect to="/home" />
        </switch>
      </div>
    )
  }
}
```

&emsp;

### 多级历史路由引入样式丢失问题

#### 场景
在历史路由下，配置了一个公共的品牌路由路径`brand`，当用户点击About导航到About组件后，此时执行浏览器刷新按钮，发现在index.html上引入的css文件丢失了，代码如下：
```js
// 配置路由部分
<MyNavLink to="/brand/about">About</MyNavLink>
<MyNavLink to="/brand/home">Home</MyNavLink>
```
```html
<!-- html文件部分 -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <!-- 在html文件中引入公共css文件：多级历史路由导航后刷新浏览器情况下会丢失 -->
        <link rel="stylesheet" href="./assets/css/index.css">
        <title>Hello React</title>
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
    </body>
</html>
```

#### 原因
这是因为多级路由下，当导航到某个路由下后浏览器地址切换为了`http://xxx/brand/about`，刷新页面后再请求css资源时，浏览器会误以为服务地址是`http://xxx/brand`，因此去该地址下寻找css文件，也就是说寻址地址成了`http://xxx/brand/assets/css/index.css`，因此找不到该文件，就把兜底的index.html文件返回出去。

<img src="./static/image/react/router-err-path.png">

可以再控制台上查看index.css请求的响应结果，是index.html的内容：

<img src="./static/image/react/router-style-err.png">


#### 解决方案
既然是相对路径导致的文件找不到的问题，那么就有如下三种方案：
1. 取消从当前地址开始寻址的点号`.`，即 `<link rel="stylesheet" href="/assets/css/index.css">`
2. 如果在React脚手架里，利用`%PUBLIC_URL%`变量改成绝对路径。即：`<link rel="stylesheet" href="%PUBLIC_URL%/assets/css/index.css">`
3. 改成hash路由模式。因为hash路由在服务地址后加`#`号，刷新后能正确识别哪部分是路由哪部分是服务地址。

&emsp;


### 嵌套路由

当页面出现如下需求时，即：在Topic导航下，又出现了子导航项，那么就需要用到嵌套路由
<img src="./static/image/react/inner-router.png">
&emsp;

此时，需要设计路由如下：
```jsx
// 在App.jsx页面上注册一级路由
export default class App extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <div className="app-nav">
                        <MyNavLink to="/home">Home</MyNavLink>
                        <MyNavLink to="/about">About</MyNavLink>
                        <MyNavLink to="/topic">Topic</MyNavLink>
                    </div>
                    <div className="app-container">
                        {/* Switch禁止路由全查询，找到即停止 */}
                        <Switch>
                            {/* exact表示精确匹配，不需要就不要用，开启了严格匹配后，该路由下的所有嵌套路由都无法使用 */}
                            <Route path="/home" component={Home} />
                            <Route path="/about" component={About} />
                            <Route path="/topic" component={Topic} />
                            {/* Redirect写在最下方，如果都没匹配上，则执行他 */}
                            <Redirect to="/home" />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}
```

```jsx
// 在Topic.jsx下注册二级路由
export default class Topic extends Component {
    render() {
        return (
            <div className="app-topic">
                <h3>Topic Page</h3>
                <div className="topic-nav">
                    <MyNavLink to="/topic/news">News</MyNavLink>
                    <MyNavLink to="/topic/message">Messages</MyNavLink>
                </div>
                <div className='topic-container'>
                    <Switch>
                        <Route path="/topic/news" component={News} />
                        <Route path="/topic/message" component={Messages} />
                        <Redirect to="/topic/news" />
                    </Switch>
                </div>
            </div>
        )
    }
}
```
#### 嵌套路由的检查过程
1. 在挂载App组件时，发现有注册路由，于是新增了路由注册表，添加了`path`与`component`的映射关系
2. 用户点击页面Topic导航，url的路径更新为`/topic`， React Router开始与路由注册表进行对比，找到了匹配为`conponent={Topic}`，进入Topic组件
3. 挂载Topic组件后，在组件中发现又有路由注册，于是在有需要时会继续匹配
4. 用户点击Topic组件内部的Message导航时，url路径更新为`/topic/message`，React Router监测（history.listen）到路径更新，于是触发路由匹配，再重复1、2、3的规则，
5. 执行完3之后，发现`/topic`后还有路由，于是继续匹配，值得注意的是，React此时依旧拿着`/topic/message`整个串与内部的路由注册表进行匹配，因此，要求二级路由必须包含着一级路由路径。


#### 几个需要注意的点
1. 在一级路由注册时，千万别给`<Route path="/topic" ... />`添加精确匹配，否则在耳机页面点击导航时，无法无法匹配嵌套的路由。
2. React Router的路由匹配是按照路由注册的顺序执行的。


&emsp;

### 给路由组件传参

<img src="./static/image/react/route-params.png">

#### 1、向路由组件传params参数（使用最多）
这种传递参数方式与Ajax的params参数类似
1. 路由链接（携带参数）：`<Link to={`/topic/message/detail/${msg.id}/${msg.title}`}>{msg.title}</Link>`
2. 注册路由（声明接收）：`<Route path='/topic/message/detail/:id/:title' component={Detail} />`
3. 读取参数（路由组件内）：`const { match: { params: { id, title } } } = this.props`




#### 2、向路由组件传search参数
这种传递参数方式与Ajax的query参数类似
1. 路由链接（携带参数）：`<Link to={`/topic/message/detail/?id=${msg.id}&title=${msg.title}`}>{msg.title}</Link>`
2. 注册路由（search参数无需声明，正常接收即可）
3. 读取参数（路由组件内）：`const str = this.props.location.search`，是个字符串，需要解析
   
备注：获取到的search是urlencoded编码字符串，可以借助如querystring进行解析。


#### 3、向路由传递state参数
注意这个`state`与React的`状态state`没有关系。
1. 路由链接（携带参数）：`<Link to={{ pathname: '/topic/message/detail', state: {id: msg.id, title: msg.title}}}>{msg.title}</Link>`
2. 注册路由（state参数无需声明，正常接收即可）
3. 读取参数（路由组件内）：`this.state.location.state`
   
备注：参数没有在地址栏上体现，没有改变url，但因为state保存在浏览器history对象中，刷新也可以保留数据，但清除浏览器缓存后会丢失数据。**这种方式传参数不会留下历史记录，因为其没有改变url**

>这三种传参办法根据业务需求选择即可，在params使用最多，state主要用于参数不希望显示在url上。他们也可以组合使用。

&emsp;

### 路由的push与replace

路由默认是使用push模式，会留下history历史记录，如果需要开启replace模式，则如下使用
```jsx
<Link replace to='/topic/news/detail'>开启replace模式</Link>
```

&emsp; 

### 路由的编程式导航

使用`this.props.history.push()` 和 `this.props.history.replace()`来实现

```js
// 编程式导航写法
pushShow = (id, title) => {
    // params传递参数
    // this.props.history.push(`/home/news/detail/${id}/${title}`)

    // search传递参数
    // this.props.history.push(`/home/news/detail/?id=${id}&title=${title}`)

    // state传递参数
    this.props.history.push({ pathname: '/home/news/detail', state: {id, title}})
}

replaceShow = (id, title) => {
    // params传递参数
    // this.props.history.replace(`/home/news/detail/${id}/${title}`)

    // search传递参数
    // this.props.history.replace(`/home/news/detail/?id=${id}&title=${title}`)

    // state传递参数
    this.props.history.replace({ pathname: '/home/news/detail', state: { id, title } })
}
```

&emsp;

### withRouter加工一般组件

1. withRouter 可以用来加工一般组件，让一般组件具备路由组件所特有的API，即：`history、location、match`三个属性。
2. withRouter的返回值是一个新组件
   
```js
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
class Header extends Component {

    // 一般组件没有路由组件所特有的history、location、match三个属性，需要使用withRouter来加工
    back = () => {
        this.props.history.goBack()
    }

    forward = () => {
        this.props.history.goForward()
    }

    render() {
        return (
            <div>
                <p>React Router Demo</p>

                {/* 回退与前进 */}
                <button onClick={this.back}>Back</button> &emsp;
                <button onClick={this.forward}>Forward</button> &emsp;
            </div>
        )
    }
}
// withRouter 可以用来加工一般组件，让一般组件具备路由组件所特有的API
// withRouter的返回值是一个新组件
// 经过这么加工后，暴露出去的组件就叫高阶组件
export default withRouter(Header)
```

&emsp;

### BrowserRouter与hashRouter区别

##### 1、底层原理不一样
1. BrowserRouter工作中，一直在调用H5-history身上的API，不兼容IE9及以下版本
2. HashRouter使用的是URL的哈希值，他没有直接操作history上的api。hash值即#号后的值发生变化，这些数据不会发送给服务器，他们就是页面的锚点，点锚点不会给服务器发请求，但是锚点留下历史记录，这就是hash路由能工作生效的原因。

##### 2、path表现形式不一样
1. BrowserRouter路径中没有#，例如`http://localhost:3000/demo/test`
2. HashRouter路径中包含#，例如`http://localhost:3000/#/demo/test`

##### 3、刷新后对路由组件state参数的影响
1. BrowserRouter没有任何影响，因为state保存在history对象中。
2. HashRouter刷新后会导致路由state参数丢失，因为HashRouter不会去读取history对象，没用上history对象。
   
##### 4、 备注：HashRouter可以用于解决一些路径错误相关问题

【推荐使用 BrowserRouter】

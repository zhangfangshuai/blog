#### 非受控组件与受控组件

### 非受控组件
&emsp; 页面中所有输入类的DOM（如input、checkbox、radio等），数据是现用现取，则称这类的组件为非受控的组件。

非受控组件值基本上都需要通过`ref`获取。这与原生的`document.getElementById('id')`获取值类似

```js
class Login extends React.Component {
// 提交表单
handleSubmit = () => {
    event.preventDefault() // 阻止表单提交，阻止默认事件即action跳转
    const { usernameEle, passwordEle } = this
    // username 和 password的值都是现用现取的
    alert(`你输入的姓名是${usernameEle.value}，密码是${passwordEle.value}`)
}

render() {
    return (
        // form表单submit默认是GET请求
        <form action="https://www.baidu.com" onSubmit={this.handleSubmit}>
            用户名：<input ref={c => this.usernameEle = c} type="text" name="username" />
            密码： <input ref={c=> this.passwordEle = c} type="password" name="password" />
            <button>登录</button>
        </form>
    )
}
}
```

### 受控组件

&emsp; 页面中所有输入类的DOM（如input、checkbox、radio等），随着数据的输入，数据实时维护到状态中，当需要使用数据时，从状态中获取即可。

<span style="background: lightgreen; padding: 3px 6px;">在Vue中用 <font style="color:red;" >v-model</font> 实现了双向数据绑定，但React没有实现，需要开发者自己通过受控组件思想实现。</span>

```js
class Login extends React.Component {
    // 初始化状态
    state = {
        username: '', // 用户名
        password: '', // 密码
    }

    // 存储用户名到状态中
    saveUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    // 存储密码到状态中
    savePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    // 表单提交回调
    handleSubmit = () => {
        event.preventDefault() // 阻止表单提交，阻止默认事件即action跳转
        const { username, password } = this.state
        // 需要使用数据时，从实时维护更新的状态中获取已经更新好的数据
        alert(`你输入的姓名是${username}，密码是${password}`)
    }

    render() {
        return (
            // form表单submit默认是GET请求
            <form action="https://www.baidu.com" className="form" onSubmit={this.handleSubmit}>
                用户名：<input onChange={this.saveUsername} type="text" name="username" /> <br /><br />
                密码： <input onChange={this.savePassword} type="password" name="password" /> <br /><br />
                <button>登录</button>
            </form>
        )
    }
}
```

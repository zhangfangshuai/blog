#### 纯函数、高阶函数与柯里化方案

### 纯函数

- 一类特殊的函数：不论什么时候调用，只要是同样的输入（实参），必定得到同样的输出（参会）
- 必须遵守以下一些约束：
  - 不得改写参数数据 如`function(a) { a = 1 }`就改写了参数
  - 不会产生任何副作用，例如网络请求，输入和输出设备。
  - 不能调用`Date.now()`或者`Math.random()`等不纯的方法。不同时机调用返回值不一样


&emsp;

### 高阶函数

- 如果一个函数符合以下2个规范中的一个，那该函数就是高阶函数
    - 若A函数，接收的参数时一个函数，
    - 若A函数，调用后返回值依然是一个函数；
- 常见的高阶函数：`Promise`、`setTimeout`、`arr.map()`等、`闭包`
    - `Promise   new Promise(() => {})`
    - `setTimeout  setTimeout(() => {}, wait)`

&emsp;

### 函数的柯里化

通过函数调用继续返回函数的方式，实现多次接收参数，最后统一处理的函数编码形式

```js
function sum(a, b, c) {
    return a + b + c
}

sum(1, 2, 3)
```
改成 
```js
// 柯里化
function sum(a) { 
    return (b) => {
        return (c) => {
            return a + b + c
        }
    }
}

sum(1)(2)(3)
```

&emsp;

### 高阶函数与柯里化在React中的应用

```js
class Login extends React.Component {
    // 初始化状态
    state = {
        username: '', // 用户名
        password: '', // 密码
    }

    /**
     * @func saveFormData就是高阶函数
     * @func 这里用的函数的柯里化技术
     */
    // 存储表单数据
    saveFormData = (dataType) => {
        return (event) => {
            // 读dataType使用方括号。对象获取变量属性的知识。
            this.setState({
                [dataType]: event.target.value
            })
        }
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
            <form className="form" onSubmit={this.handleSubmit}>
                用户名：<input onChange={this.saveFormData('username')} type="text" name="username" /> <br /><br />
                密码： <input onChange={this.saveFormData('password')} type="password" name="password" />
                <br /><br />
                <button>登录</button>
            </form>
        )
    }
}
```


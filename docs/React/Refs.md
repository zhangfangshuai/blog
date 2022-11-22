#### React使用ref属性来定义标签的标识

### 理解
1. React使用ref属性来定义和标识节点，就像HTML会用id来唯一标识一个节点一样。
2. 这个实例对象里存放的不是虚拟DOM的节点，而是虚拟DON对应真实DOM的真实的HTML节点.

&emsp;

### 字符串形式Ref
字符串形式的Ref时最简单的一种，但由于其存在性能问题，已被React官网发出废弃预告，能不用就不用。
```js
class MyComponent extends React.Component {
    showData = () => {
        const { ele } = this.refs
        alert(ele.value)
    }

    render() {
        return (
            <input ref="ele" onBlur={this.showData} placeholder="请输入" />
        )
    }
}
```

### 回调函数形式的Ref
回调函数形式的Ref存在两种写法：（1）内联形式的回调函数Ref；（2）类绑定形式的回调函数Ref；


##### 1. 内联形式的回调函数Ref <span style="color: red;">【主推】</span>

该形式表现直观，容易理解。但有个无关紧要的小缺陷，即：在组件实例更新的时候，内联的回调函数会被执行两次。这是因为在更新视图时，React无法确定上一次的回调函数状态及执行的内容，因为这个回调函数执行完成后就被释放了，所以需要提前给ref设置成null，再赋值上新的回调函数。

>【官方说法】如果 ref 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以React清空旧的ref并且设置新的。通过将ref的回调函数定义成class的绑定函数的方式可以避免上述问题,但是大多数情况下它是无关紧要的.

```js
class MyComponent extends React.Component {
    showData = () => {
        const { ele } = this
        alert(ele.value)
    }

    render() {
        return(
            <input ref={cNode => this.ele = cNode} onBlur={this.showData} placeholder="请输入" />
        )
    }
}
```

##### 2. 类绑定形式回调函数Ref
该形式主要就是为了解决内联形式回调函数那个无关紧要小问题所提出来的。比较繁琐，并不推荐。

```js
class MyComponent extends React.Component {
    // 首次就把回调函数写到组件实例上，React就知道该回调函数的函数体所有内容
    bindInputRef = (cNode) => {
        this.ele = cNode
    }

    showData = () => {
        const { ele } = this
        alert(ele.value)
    }

    render() {
        return(
            <input ref={this.bindInputRef} onBlur={this.showData} placeholder="请输入" />
        )
    }
}
```

&emsp;

### 内置API：createRef
<span style="color: red; font-weight: bold">【V16.3版本及以上】</span>

虽然该方案是新版本中提供，但由于其“专人专用”的特性，每一个所需要标识的节点都需要一个`createRef`来创建ref容器变量，相对繁琐，也不太推荐使用。

>【注】React官方推荐使用此方案

```js
class MyComponent extends React.Component {
    inputRef = React.createRef() // 只能给第一个input用
    inputRef2 = React.createRef() // 只能给第二个input用。

    showData = () => {
        alert(this.inputRef.current.value)
    }

    showData2 = () => {
        alert(this.inputRef2.current.value)
    }

    render() {
        // 如果input中第二个ref定义和第一个相同，将覆盖第一个节点
        return(
            <input ref={this.inputRef} onBlur={this.showData} placeholder="请输入" />
            <input ref={this.inputRef2} onBlur={this.showData2} placeholder="请输入" />
        )
    }
}
```

&emsp;

### 可以不使用ref情形

React官网警告我们，应当避免过多的使用Ref

当发生事件的元素和要操作的元素是同一个元素时，我们可以省略ref，替换为`event.target`来获取节点

```js
class MyComponent extends React.Component {
    showData = (event) => {
        // event是原生提供的参数，React把它合成了
        alert(event.target.value)
    }

    render() {
        return(
            <input onBlur={this.showData} placeholder="请输入" />
        )
    }
}
```
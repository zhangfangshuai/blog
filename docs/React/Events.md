#### 事件处理

### 为什么要封装原生事件
React针对原生的事件`onclick`重新封装成了`onClick`，`onblur`重新封装成了`obBlur`，为什么呢？

1. React使用的是自定义（合成）事件，而不是使用原生的DOM事件 -- 为了更好的兼容性，处理了兼容性问题
2. React中的事件是通过事件委托的方式处理的（委托给事件的最外层）-- 为了事件处理更加高效


### 通过原生event.target处理事件
&emsp; React同样具备原生触发事件的event参数，能够通过`event.target`方式获取到当前元素节点。此时，就可以不定义ref了。

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

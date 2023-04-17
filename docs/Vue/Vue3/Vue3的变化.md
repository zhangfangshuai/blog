#### Vue3的变化与基本使用

### 创建实例的变化
在Vue2中，是用Vue**构造函数**创建Vue实例，而在Vue3中，新增 `createApp()`**工厂函数**创建vue实例。并且Vue3中不再存在Vue这个构造函数

```js
// Vue2
import Vue from 'vue'
import App from './App.vue'
const vm = new Vue({
    el: '#app',
    render: h => h(App)
})  // 或
new Vue({ render: h => h(App) }).$mount('#app')


// Vue3
import { createApp } from 'vue'
import App from './App.vue'
// app类似于Vue2中的vm，但app比vm更“轻”
const app = createApp('App)
app.$mount('#app')
// createApp('App').$mount('#app)
```



### 组件根节点的变化
在Vue2中，模版中需要设置根标签，可能会产生一些不必要的嵌套。在Vue3中，模版可以不使用根标签，Vue3默认用`<fragment></fragment>`标签对模版进行包裹，它表示文档碎片，是一个虚拟DOM，不会渲染为真实的DOM元素。

<div> <img alt="fragment是一个文档碎片" src="https://img-blog.csdnimg.cn/img_convert/07f030e5a33c9759d9cedb00e370ce5d.png" /></div>



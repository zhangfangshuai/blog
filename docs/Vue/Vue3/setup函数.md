### setup函数

在Vue2中，我们如下定义一个组件结构
```js
export default {
    components: { // ... },
    data() { return { //... } },
    computed() { //... },
    watch() { // ...  },
    methods: { // ... },
    ...
}
```

而在vue3中，虽然也可以使用vue2的语法去定义，但更推荐使用**组合式API**。vue3更强调按需引入，需要使用哪个API，就引入相对应的工厂函数，并在setup中使用，setup是所有 Composition API（组合API）表演的舞台

1. setup是Vue3中新增的一个钩子函数，它会在`beforeCreate`之前被调用;
2. setup默认接收两个参数：
   - `props`: 表示父组件传递的参数对象
   - `context`：表示组件上下文对象，这个有点类似vue2构造函数中的this。他主要有以下几个属性
     - **attrs**：父组件传递过来的但没在props中声明的值，相当于vue2中的`this.$attrs`
     - **emit**：父组件传递过来的函数，相当于vue2中的`this.$emit()`方法，需先使用`emits`配置项指定为自定义事件
     - **slots**：父组件传递过来的插槽，相当于vue2中的`this.$slots()`方法。注意vue3具名插槽不支持`slot="test"`写法


```vue
<template>
    <h1>父组件</h1>
    <h2 v-show="visible">我是父组件元素，子组件通过context.emit来控制我的visible值</h2>

    <Demo :name="person.name" @hello="sayHello" v-model:visible="visible">
        <template v-slot:test> <!-- Vue3不支持 slot="test" 的写法 -->
            <div>插槽内容</div>
        </template>
    </Demo>
</template>

<script>
import { ref, reactive } from 'vue' // Vue3中建议按需引入所需的工厂函数
import Demo from './components/Demo'
export default {
    name: 'App',
    components: { Demo },
    setup() {
        const visible = ref(true) // ref定义值类型数据，返回RefImpl的实例对象 - reference implement（引用实现对象-引用对象）
        const person = reactive({ // 返回ES6 Proxy代理后的响应式数据
            name: '张三',
            age: 18
        })

        function sayHello() {
            console.log('你好，我是服组件身上的函数，当前visible的值是：', visible.value) // ref响应式数据，在setup中获取时需要.value，在模版中vue3帮你实现了该过程，直接使用visible即可
        }
        
        return {
            visible,
            person,
            change
        }
    }
}
</script>
```

```vue
<template>
    <h2>姓名: {{ name }}</h2>
    <button @click="handleParentHelloFn">点击调用自定义hello事件</button>
    <button @click="updateParentVisible">点击更新父亲组件的visible属性</button>
    <slot name="test"></slot>
</template>

<script>
export default {
    props: {
        name: String,
        visible: Boolean
    },
    // 父组件传递过来的函数，必须在这里先注册，setup中才能调用
    // emits未指定的剩余的父组件事件会被认为是原生事件，相当于Vue2中使用.native修饰的效果，vue3移除了.native
    // emits: [hello] // emits 的数组形式
    emits: {
        hello: Function
    },
    // props：父组件传递过来的参数，用props接收的那部分。props未接收的部分在context.attrs中
    // context: 上下文，有点像vue2中的this
    setup(props, context) {
        function updateParentVisible() {
            context.emit('update:visible', !props.visible)
        }
        function handleParentHelloFn() {
            context.emit('hello')
        }
        return {
            updateParentVisible,
            handleParentHelloFn
        }
    }
}
</script>
```

##### 关于setup有如下几点需要注意：
（1）Vue3中支持写Vue2的语法，但并不推荐Vue2如`data`等配置项与setup混用，可能导致一些问题。
（2）在vue2写法`methods`中能访问到setup函数`return`的数据，但setup中无法访问`data`中的数据。如果`data`与setup重名，则优先使用setup数据。<br>
（3）生命周期钩子，如`onMounted`和V`mounted`同时定义，则两者都会执行，且先触发setup中的`onMounted`<br>
（4）`emits`用于指定来自父组件版定的事件哪些是自定义事件，且只有使用emits指定的事件才能在子组件中调用，而未指定的哪部分事件相当于Vue2中`.native`修饰事件即原生事件。vue3中也移除了`.native`

&emsp;


### `<script setup>`

在 `setup()` 函数中手动暴露大量的状态和方法非常繁琐。幸运的是，我们可以通过使用构建工具来简化该操作。当使用单文件组件（SFC）时，我们可以使用 `<script setup>` 来大幅度地简化代码。

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```

`<script setup>` 中的顶层的导入和变量声明可在同一组件的模板中直接使用。你可以理解为模板中的表达式和 `<script setup>` 中的代码处在同一个作用域中。也正因为这个特性，使得
1. `<script setup>`不再需要编写return，作用域中的变量和函数可以直接互相调用，
2. 模板也可以直接使用这些变量和函数


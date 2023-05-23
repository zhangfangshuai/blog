#### Vue的注入功能：provide与inject

### Prop 逐级透传问题
（1）对于一个多层级的祖孙组件进行数据传递，如果使用props，这将会非常麻烦，且容易出错。<br>
（2）中间组件其实并不关心这些数据，但却需要处理，这也给他们带来了压力。<br>

<div><img alt="props逐级传递问题" src="https://cn.vuejs.org/assets/prop-drilling.11201220.png" /></div>

provide 和 inject 可以帮助我们解决这一问题。 一个父组件相对于其所有的后代组件，会作为依赖提供者。任何后代的组件树，无论层级有多深，都可以注入由父组件提供给整条链路的依赖。

<div><img alt="使用注入后的数据链路" src="https://cn.vuejs.org/assets/provide-inject.3e0505e4.png" /></div>


### provide()：祖组件向后代组件提供数据
祖组件使用 `provide()`为后代组件提供数据

```vue
<script setup>
import { ref, provide } from 'vue'

const userName = ref('张三')
provide('userName', userName)
</script>
```

### 全局注入
在应用级别提供的数据在该应用内的所有组件中都可以注入。这在你编写插件时会特别有用，因为插件一般都不会使用组件形式来提供值。

```vue
<script setup>
import { createApp } from 'vue'

const app = createApp({})
app.provide('appName', 'Vue3_App')
</script>
```

&emsp;

### Inject (注入)
后代组件注入祖先组件提供的数据，使用`inject()`

```vue
<script setup>
import { inject } from 'vue'

const userName = inject('userName')
const appName = inject('appName')
</script>
```

### 给inject()添加默认值
有两种方式可以添加默认值（1）传入一个字符串；（2）传入一个函数
```js
const value = inject('key', '这是默认值') // 如果不需要默认值，这会造成不必要的计算或产生副作用
const value = inject('key', () => new ExpensiveClass()) // 工厂函数形式不会有此问题
```

### 与Vue2的注入不同

- 写法上的不同，Vue2使用选项式（当然Vue3依旧支持）传入配置对象，Vue3使用工厂函数实现
- 响应式不同：Vue3如果注入的是ref对象，则注入组件保持了和供给方的响应性链接；而Vue2默认情况下注入数据不会保持响应性，除非提供方将数据包装成引用类型。


### 和响应式数据配合使用
当提供 / 注入响应式的数据时，**建议尽可能将任何对响应式状态的变更都保持在供给方组件中**。这样可以确保所提供状态的声明和变更操作都内聚在同一个组件内，使其更容易维护。

有的时候，我们可能需要在注入方组件中更改数据。在这种情况下，我们推荐在供给方组件内声明并提供一个更改数据的方法函数：
```vue
<!-- 在供给方组件内 -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

```vue
<!-- 在注入方组件 -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```
如果你想确保提供的数据不能被注入方的组件更改，你可以使用 readonly() 来包装提供的值。

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```


#### 响应式进阶

### shallowRef()

和 `ref()` 不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 `.value` 的访问和修改是响应式的。

> `shallowRef()` 常常用于对大型数据结构的性能优化或是与外部的状态管理系统集成。

```vue
<script setup>
import { shallowRef } from 'vue'

const state = shallowRef({ count: 1 })
state.value.count ++ // 改变了深层的数据，不会触发响应式
state.value = { count: 2 } // 直接改变state的value值会触发响应式
</script>
```

### triggerRef()

强制触发依赖于一个浅层 ref 的副作用，这通常在对浅引用的内部值进行深度变更后使用

`triggerRef()`设计的目的，是为了弥补被浅层次定义后的ref，深层数据被修改时不会触发响应式的问题，因为有时候我们需要性能优化，开启了`shallowRef`浅层响应式定义，但偶尔又需要对深层的某些数据进行变更，并监测其变化，来执行一些回调操作，此时就需要使用`triggerRef()`来触发响应式的副作用函数

```vue
<script setup>
import { shallowRef, triggerRef } from 'vue'

const state = shallowRef({ count: 1 }) 
// watchEffect依赖了state.value.count，因为浅ref导致无法捕捉响应，使用trigger强制触发
watchEffect(() => {
    const c = state.value.count
    console.log(c)
})
state.value.count ++
triggerRef(state)
</script>
```

### customRef()

自定义Ref，显式声明对其依赖追踪和更新触发的控制方式。

`customRef()`接收一个工厂函数作为参数，该工厂函数接收两个参数：`track`和`trigger`

创建一个防抖 ref，即只在最近一次 set 调用后的一段固定间隔后再调用
```vue
<script setup>
// debounceRef.js
import { customRef } from 'vue'

export function useDebouncedRef(value, delay = 500) {
    let timeout
    return customRef((track, trigger) => {
        return {
            get() {
                track() // 提前通知value将改变
                return value
            },
            set(newValue) { // 触发响应式更新
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    value = newValue
                    trigger()
                }, delay)
            }
        }
    })
}
</script>
```
在组件中使用此hooks
```vue
<script setup>
import { useDebouncedRef } from '../hooks/debounceRef.js'
// 创建一个节流的的输入
const text = useDebouncedRef('hello')
</script>

<template>
    <input v-model="text" />
</template>
```

&emsp;

### shallowReactive()

`reactive()` 没有深层级的转换，一个浅层响应式对象里只有根级别的属性是响应式的。属性的值会被原样存储和暴露，这也意味着值为 ref 的属性不会被自动解包了

```vue
<script setup>
const state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 更改状态自身的属性是响应式的
state.foo++

// ...但下层嵌套对象不会被转为响应式
isReactive(state.nested) // false

// 不是响应式的
state.nested.bar++
</script>
```


### shallowReactive()
和 `readonly()` 不同，这里没有深层级的转换：只有根层级的属性变为了只读。属性的值都会被原样存储和暴露，这也意味着值为 ref 的属性不会被自动解包了。

```vue
<script setup>
const state = shallowReadonly({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 更改状态自身的属性会失败
state.foo++

// ...但可以更改下层嵌套对象
isReadonly(state.nested) // false

// 这是可以通过的
state.nested.bar++
</script>
```


### toRaw()
将一个 reactive 生成的 响应式对象 转为 普通对象
`toRaw()` 可以返回由 `reactive()、readonly()、shallowReactive()` 或者 `shallowReadonly()` 创建的代理对应的原始对象。

```js
const person = {name: '张三'}
const reactivePerson = reactive(person)

console.log(toRaw(reactivePerson) === person) // true
```


### markRaw()

标记一个对象，使其不变成响应式对象；常用于渲染具有不可变数据源的大列表时，跳过响应式转换，以提高性能。

```js
person.car = markRaw(car)
```

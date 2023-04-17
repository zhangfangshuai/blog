#### 响应式API的工具函数

### isRef()
检查某个值是否为 ref，即是否为一个RefImpl的实例对象

### unref()
如果参数是 ref，则返回内部值，否则返回参数本身。<br>
其实也是`val = isRef(val) ? val.value : val`的语法糖


### `toRef()`
!>要将响应式对象中的某个属性单独提供给模板使用，且又不想丢失掉其响应式功能时，就需要使用`toRef()`来实现。目的是对象某个属性单独提供给模板使用后，模板使用插值语法时就不需要频繁的编写对象自身，更加简洁

基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。
```vue
<script setup>
import { reactive, toRef } from 'vue'

const person = reactive({
    name: '张三',
    age: 18,
    job: {
        primary: {
            salary: '20k'
        }
    }
})

let name = toRef(person, 'name')
console.log(name) // ObjectRefImpl {...., value}

function changeName() {
    name = '李四'
}
</script>

<template>
    <div>用户的姓名为{{ name }}</div>
    <button @click="changeName">点我改名</button>
</template>
```
以上的程序有两个逻辑：<br>
（1）当`console`中去读取`name`变量时，vue会去寻找`person.name`的值，也就是说读取数据时，本质上还是返回的`person.name`的数据，而这正是ObjectRefImpl所实现的getter<br>
（2）当点击改名按钮，对`name`变量的值进行设置，vue会通过ObjectRefImpl原型上的setter，对`person.name`进行同步更新

#### 与直接使用ref的不同
假如上诉的代码如下编写
```js
let name2 = ref(person.name)
```
通过如上的定义，只能得到`name2`是一个响应式数据，但与原来的`person.name`并没有任何瓜葛。或者说，`name2`只是借用`person.name`这个变量的值当作初始值用了一下罢了。<br>
但`toRef`不同，依旧会保持与`person.name`进行实时同步

&emsp;


### `toRefs()`

!> 由于`toRef()`只能针对单个属性进行处理，当要单独抛出整个对象的所有属性去给模板使用时，编写上未免依旧太繁琐，此时就需要使用toRefs()

将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 `ref`。每个单独的 `ref` 都是使用 `toRef()` 创建的。

```vue
<script setup>
import { reactive, toRefs } from 'vue'

const person = reactive({
    name: '张三'，
    age: 18,
    job: {
        primary: {
            salary: '20k'
        }
    }
})

const p = toRefs(person)
console.log(p) // { name: ObjectRefImpl {}, age: ObjectRefImpl {}, job: ObjectRefImpl { ..., value: Proxy {} } }
</script>
```

#### toRefs的几个总结
- `toRefs()`返回的是一个普通对象
- `toRefs()`返回的普通对象的所有属性，都通过`toRef`被加工成了ObjectRefImpl实例对象，保持着与原响应式数据的同步更新
- 加工后的普通对象中的属性，如果也是引用类型数据，则该属性自身是ObjectRefImpl实例对象，其值`.value`是Proxy代理对象，也具备有响应式功能。
- `toRef()`函数可以看成是为`toRefs()`函数实现功能铺垫的前置方法，其实也确实如此。

&emsp;


### isProxy()
检查一个对象是否是由 `reactive()`、`readonly()`、`shallowReactive()` 或 `shallowReadonly()` 创建的代理

### isReactive()
检查一个对象是否是由 `reactive()` 或 `shallowReactive()` 创建的代理

### isReadonly()
检查传入的值是否为只读对象。只读对象的属性可以更改，但他们不能通过传入的对象直接赋值。

通过 `readonly()` 和 `shallowReadonly()` 创建的代理都是只读的，因为他们是没有setter的 `computed()` ref。
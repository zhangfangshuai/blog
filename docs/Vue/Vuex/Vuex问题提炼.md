#### Vuex问题提炼

#### 1、vuex如何保证所组件使用的store都是同一个store
（1）在`vue.use(vuex)`执行的`install`方法中，vuex在生命周期`beforeCreate`中混入了`vuexInit`方法，用来注册`$store`属性。方法中判断在使用者在页面上实例化Vue`new Vue()`时是否传入了`store`，如果是，则赋值给属性`$store`，后续用户使用的所有`this.$store`就是该值；如果不是，子组件直接从父组件中获取`$store`，这样就保证了所有组件都公用了全局的同一份`store`

（2）vuex内部，定义`Store`时将`dispatch`与`commit`调用的`this`利用`call`都绑定为store对象本身，这样在页面上即便使用`this.dispatch`或`this.commit`等方法时`this`也不会错误的指向当前vue实例而是`store`类，保证了该上所有方法都可访问。

<br>

#### 2、vuex如何实现在严格模式下，只能使用mutation修改state数据
vuex源码在定义类Store时，内部设置了一个 `_committing`的状态值，当数据通过mutation进行更改时，即使用者在页面上调用`this.$store.commit时`，会执行一个拦截器函数叫`_withCommit()`，在这里，把`_committing`改成了`true`，且执行目标函数。

当用户直接通过`this.$store.state`去修改状态值时，并没有调用`_withCiommit()`，`_committing`保持为`false`，vuex在`set state`时进行了拦截，并`assert`断言抛出错误提示。

在重置状态值`replaceState`时，也会调用`_withCommit()`方法。

<br>

#### 3、vuex如何实现state改变时同步getter改变

简单来说就是内部利用了vue的computed计算属性实现。

vuex在实现`Store`的`constructor`内调用了`resetStoreVM`，在该函数的内部，`new`了一个Vue实例，并把所有`state`都赋值给`data`中的`$$store`，通过循环把所有`getter`都加入到`computed`的属性中并设置为vue的计算属性，并通过`Object.defineProperty`为每一个`getter`方法设置`get`方法，拦截并读取`store._vm[key]`来返回data中的值，从而实现同步改变。


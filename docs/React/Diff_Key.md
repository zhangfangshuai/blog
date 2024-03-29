#### Diff算法和Key的作用

### 虚拟DOM的Diff算法工作原理

1. 将变更后新旧虚拟DOM进行比较，找到有变化的节点，进行更新到真实DOM上
2. 最小粒度是标签（节点）
3. 当标签里套用标签，不管哪一层出现更新，diffing算法都会逐层深入对比，对于父标签更新子标签未更新的子节点，渲染时依旧不会被更新。

#### Diff比较规则如下：
1. 旧虚拟DOM中找到了与新虚拟DOM相同的key：<br />
    1）若虚拟DOM中内容没变，直接使用之前的真实DOM；<br />
    2）若虚拟DOM中的内容变了，则生成新的真实DOM，随后替换页面中之前的真实DOM；

2. 旧虚拟DOM中未找到与新虚拟DOM相同的key：<br />
    根据数据创建新的真实DOM，随后渲染到页面上。

&emsp;

### 虚拟DOM中的key有什么作用
- 简单的说：key是虚拟DOM对象的标识，在更新显示时key起着极其重要的作用

- 详细的说：当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】，随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较。执行如上的Diff的比较规则过程。


&emsp;

### 用index作为key可能会引发的问题

#### 1、破坏顺序的操作
**若对数据进行：逆序添加、逆序删除等破坏顺序的操作，由于顺序变化了，会产生没有必要的真实ODM更新。**

因为所有虚拟DOM的index下标都会被更新，此时新旧虚拟DOM相同`key`下的节点并不是同一个，节点内容也就不同，此时被React认为是虚拟DOM被更新了

<span style="color: orange;">此时只是效率低，不会有错误。</span>

```javascript
/*
    更新过程与Diff对比：- 使用index索引值作为key

    初始数据：
        { id: 1, name: '小张', age: 18 },
        { id: 2, name: '小李', age: 20 }
    初始的虚拟DOM：
        <li key=0>小张---18</li>
        <li key=1>小李---19</li>

    更新后的数据：
        { id: 3, name: '小王', age: 20 },
        { id: 1, name: '小张', age: 18 },
        { id: 2, name: '小李', age: 20 }
    更新数据后的虚拟DOM：
        <li key=0>小王---18</li>
        <li key=1>小张---18</li>
        <li key=2>小李---19</li>
*/
```

#### 2、 有破坏顺序操作，且存在输入类的DOM

**若有破坏顺序的操作，且结构中还包含输入类的DOM，可能产生错误的DOM更新，页面展示也会出现错误。**

因为会把子节点错误的追加给错误的父节点上，因为追加时认的是`key`

<span style="color: red;">此时页面交互就是错的</span>

```javascript
/*
    更新过程与Diff对比：- 使用index索引值作为key，且存在输入类DOM

    初始数据：
        { id: 1, name: '小张', age: 18 },
        { id: 2, name: '小李', age: 20 }
    初始的虚拟DOM：
        <li key=0>小张---18<input type="text" /></li>
        <li key=1>小李---19<input type="text" /></li>

    更新后的数据：
        { id: 3, name: '小王', age: 20 },
        { id: 1, name: '小张', age: 18 },
        { id: 2, name: '小李', age: 20 }
    更新数据后的虚拟DOM：
        <li key=0>小王---18<input type="text" /></li>
        <li key=1>小张---18<input type="text" /></li>
        <li key=2>小李---19<input type="text" /></li>
    */
```

挂载后错误如下：

<img style="width: 330px" src="./static/image/react/diff.png">


&emsp;

#### 不会产生问题情形

如果不存在对数据逆序添加、逆序删除等破坏顺序的操作，而仅用于渲染列表展示，则使用index作为key是没有问题的。

&emsp;

### 开发中如何选择Key

##### 1. 最好使用数据中的唯一标识作为key
- 如 id、手机号、身份证号、学生号等在现实意义上久存在唯一性等概念;


##### 2. 如果只是简单的展示数据，用index也是可以的
- index的好处是循环体自身就有，简单方便;

##### 3. 如果找不到唯一标识，又不能使用index的情形
- 尝试使用数据中多个字段组合；
- 使用当前时间戳字符串；

##### 4. 为保证前端代码合理性，不太建议使用方案3
- 找服务端协商修改接口返回唯一值；
  
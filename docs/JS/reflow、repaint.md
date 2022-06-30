#### 回流与重绘

### 页面构建过程

![页面构建过程](https://segmentfault.com/img/remote/1460000017329983/view?w=624&h=289)

如上图所示，构建过程包含一下几个步骤
1. 解析HTML，生成DOM树，解析CSS，生成CSSOM树
2. 将DOM树和CSSOM树结合，生成渲染树(Render Tree)
3. Layout(回流):根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）
4. Painting(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素
5. Display:将像素发送给GPU，展示在页面上

<br/>

### 渲染树构建过程

![DOM树和CSSOM构成渲染树](https://segmentfault.com/img/remote/1460000017329984/view?w=1150&h=537)

为了构建渲染树，浏览器主要完成了以下工作：

1. 从DOM树的根节点开始遍历每个可见节点(visibility和opacity属于可见节点，display:none为不可见节点)。
2. 对于每个可见的节点，找到CSSOM树中对应的规则，并应用它们。
3. 根据每个可见节点以及其对应的样式，组合生成渲染树

<br/>

### 回流

&emsp; 渲染树构造完成，浏览器需要计算渲染树各个节点在设备视口(viewport)内的位置和大小，这个计算过程称为“回流”。

&emsp; 为了找到每个节点的位置，浏览器需要从渲染树的根节点开始遍历，如果有子节点，根据CSS的规则进行设定并查找子节点的位置信息（如`margin-left: 20px;`）和大小信息（如`width: 50%`）。

&emsp; 简单来说，回流就是根据渲染树的节点和CSS信息计算每一个节点元素的位置和大小

<br/>

### 重绘

&emsp; 根据渲染树和回流的结果，将各个节点转换为屏幕上的实际像素值，这个过程称为重绘。

&emsp; 经过重绘后的渲染树，是可以直接提供给GPU进行显示的。

<br/>

### 回流重绘的关系

&emsp; 由于重绘是发生在回流的下一步的，因此回流必然引起重绘。造成重绘的原因不一定是元素节点的大小和位置发生改变，也可能是颜色、字体粗细等导致，因此，重绘时不一定发生了回流。

<br/>

### 浏览器优化回流原理

&emsp; 现代浏览器都很聪明，知道dom操作产生回流会造成大量消耗，因此都会优化该过程，那浏览器是如何实现？答案是通过**事件循环机制。**

&emsp; 在事件循环中，有**执行栈**和**任务队列**两个概念，而任务队列中，包括了**宏任务**和**微任务**两种类型。在事件循环过程中，执行栈依次加载任务队列里的宏任务执行。由于**浏览器内核（渲染进程）**的**JS引擎线程**和**GUI渲染线程**是互斥关系，当GUI线程在渲染时会挂起JS线程，反之亦然。浏览器为了可以使**宏任务**和**DOM任务**有序的进行，会在一个宏任务执行完毕后，下一个宏任务开始执行前，GUI渲染线程开始工作，对页面进行渲染。

> [!NOTE|style:flat|label:执行过程]
> 宏任务 --> 微任务（如有）--> 渲染 --> 宏任务 --> 渲染 --> 宏任务...

![JS引擎线程与GUI渲染线程的接棒过程](https://img-blog.csdnimg.cn/fdb3e4ef21be494cb11d91335e44ca8a.png)

&emsp; 有了这个规律后，看一个例子，假设有如下DOM操作的代码：
```javascript
document.body.style = 'background: black'
document.body.style = 'background: red'
document.body.style = 'background: blue'
document.body.style = 'background: gray'
```
&emsp; 由于以上代码属于同一个宏任务，因此在GUI渲染线程开始工作前，这四行逻辑已经执行完毕，GUI渲染时会将全部UI改动优化合并，因此视觉上，只会看到页面变成灰色。

![宏任务下的多个dom操作](https://ewr1.vultrobjects.com/imgur1/000/000/751/875_f4c_468.gif)

&emsp;

加入定时器，如下：
```javascript
document.body.style = 'background:blue'
setTimeout(function(){
    document.body.style = 'background:black'
},0)
```
&emsp; 页面先显示成蓝色背景，而后瞬间变成了黑色背景，这是由于以上代码属于两次宏任务，第一次宏任务执行的代码是将背景变成蓝色，而后触发渲染，将页面变成蓝色，再触发第二次宏任务将背景变成黑色。
![两个宏任务间的dom操作](https://ewr1.vultrobjects.com/imgur1/000/000/751/876_54e_981.gif)


把定时器改成为微任务Promise，如下
```javascript
document.body.style = 'background:blue'
console.log(1);
Promise.resolve().then(()=>{
    console.log(2);
    document.body.style = 'background:black'
});
console.log(3);
```

![微任务中的dom操作](https://ewr1.vultrobjects.com/imgur1/000/000/751/877_cec_f03.gif)

&emsp; 控制台输出 `1 3 2` , 是由于 `promise` 对象的 `then` 方法的回调函数是异步执行，因此 `2` 最后输出

&emsp; 页面的背景色直接变成黑色，没有通过蓝色的阶段，是由于，咱们在宏任务中将背景设置为蓝色，但在进行渲染前执行了微任务， 在微任务中将背景变成了黑色，而后才执行的渲染

<br />

### 减少回流

##### 1、批量修改样式
&emsp; 合并多次对DOM和样式的修改，进行一次处理，可以对多个样式定义一个class，然后增删该class

##### 2、修改元素先使其脱离文档流
&emsp; 如果对某个节点或其子节点有较多的更新，可以尝试先把该节点脱离文档流后，对其进行变更，再将元素带回到文档中。这样仅脱离和插入两次回流。<br />
方案一： <span class="green-code">隐藏元素</span> --> <span class="green-code">应用修改</span> --> <span class="green-code">重新显示</span> <br/>
方案二：使用文档片段(document fragment)在当前DOM之外构建一个子树，再把它拷贝回文档
```javascript
const ul = document.getElementById('list');
const fragment = document.createDocumentFragment();
appendDataToElement(fragment, data);
ul.appendChild(fragment);
```
以上策略仅做参考即可，原因是现代浏览器只要在同一个宏任务里的都会自动进行优化合并

##### 3、避免触发同步布局事件
获取一个元素的`scrollTop、scrollLeft、scrollWidth、offsetTop、offsetLeft、offsetWidth、offsetHeight`之类的属性，浏览器为了保证值的正确性会强制回流一次，获取最新值。如下代码会造成较严重的回流
```javascript
function initP() {
    for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.width = box.offsetWidth + 'px';
    }
}
```
修改办法很简单，将`box.offsetWidth`值存储给某个变量即可

##### 4、动画开启GPU加速（硬件加速）

&emsp; 比起考虑如何减少回流重绘，我们更期望的是，根本不要回流重绘，使用CSS3硬件加速就可以达到该效果。

&emsp; 使用css3硬件加速，可以让`transform`、`opacity`、`filters`这些动画不会引起回流重绘 。但是对于动画的其它属性，比如background-color这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。

**常见的触发硬件加速的css属性：**
- transform
- opacity
- filters
- Will-change

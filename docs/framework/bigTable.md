#### 大列表渲染优化

### 问题现象

1. 页面渲染白屏，加载时间过长。
2. 页面假死，滚动卡顿。

### 问题代码
以下代码，直接向DOM循环插入十万条数据，观察运行的时长
```javascript
let ul = document.getElementById('container');
const now = Date.now(); // 开始时间
const total = 100000; // 插入十万条数据
// 观察DOM树被更新的时机
observeDom()

/**
 * @desc 利用循环简答粗暴的将数据直接插入DOM树中
 */
for (let i = 0; i < total; i++) {
    let li = document.createElement('li');
    li.innerText = ~~(Math.random() * total)  //  取整
    ul.appendChild(li);
}

console.log('JS运行时间：',Date.now() - now);
// 宏任务，下一次事件循环执行，发生在GUI渲染之后
setTimeout(()=>{
  console.log('总运行时间：',Date.now() - now);
},0)

/**
 * @func 监视DOM树是否被更改，执行回调
 * @desc config 配置要观察的DOM树的属性信息
 * @desc .observe(target, config) 监听target DOM的更改，若匹配到给定的配置config时，执行回调函数(观察者)。
 * @func MutationObserver是微任务，会在下一个GUI渲染前执行
 */
function observeDom() {
    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(() => {
        console.log('DOM树发生改变了，GUI渲染')
    })
    // 以上述配置开始观察目标节点
    observer.observe(ul, config);
}
```

<br/>

### 原因剖析

&emsp; 页面白屏加载时间过长比较容易理解，就是请求数据量过大，服务器处理时间长响应缓慢，网络传输时间长导致。我们重点分析页面假死、卡顿问题。

&emsp; Javascript是**单线程**的。那单线程是什么意思？为何大列表渲染时又会引起卡顿？为了弄懂这个问题，先巩固如下知识。<br/>
&emsp; 计算机的核心是**CPU**，它承担了全部的计算任务。CPU资源分配的最小单位是**进程**，是能拥有资源和独立运行的最小单位；**线程**是CPU创建在进程的基础上的一次程序运行单位，线程内同一时间只能执行一个任务。<br/>
&emsp; 现代浏览器支持多进程工作，如chrome开多个tab页签就是通过多进程实现的，每个页签代表一个进程。包括有 **（1）主进程；（2）第三方插件进程；（3）渲染进程 <span class="red-code">即：浏览器内核</span>** 。<br/>
&emsp; 和其他进程一样，**渲染进程**中也包括了多个线程有 **（1）JS引擎线程；（2）GUI渲染线程；（3）事件触发线程；（4）定时触发器线程；（5）异步HTTP请求线程；**其中，JS引擎线程和GUI渲染线程是互斥的，当JS引擎线程执行时必须把GUI渲染线程挂起，反之亦然。这是为了防止GUI渲染时JS线程在改动DOM导致渲染出来与实际不一致情况；符合JS单线程的思想。<br/>
&emsp; 在现代浏览器中，为了可以使宏任务和DOM任务有序的进行，会在一个宏任务执行完毕后，下一个宏任务开始执行前，GUI渲染线程开始工作，对页面进行渲染。
>[!NOTE|style:flat|label:执行过程]
> 宏任务 --> 微任务（如有）--> 渲染 --> 宏任务 --> 渲染 --> 宏任务...

&emsp; 所以：正是因为浏览器**渲染进程**中JS引擎线程和GUI渲染线程是互斥的原因，大列表在处理宏任务时由于任务量大，计算时间较长，导致GUI线程迟迟没得到执行权，造成了页面卡顿，假死的现象。

<br/>

### 解决问题

##### 1、解决白屏，加载慢问题

>[!TIP|label:策略]
>从数据量上处理，分页分表。需要服务端配合。

&emsp; 分页查询，即在发起列表查询的数据接口中，给服务端传入当前次查询的页码和页面数据量，服务端根据条件返回指定的数据，避免请求慢、白屏与卡顿问题。

&emsp;

##### 2、解决页面假死，滚动卡顿问题

&emsp; 通过原因剖析得知，假死是因为GUI没有得到执行权导致，要得到执行权，就必须有宏任务的结束，因此我们可以通过以下几种方案实现

>[!TIP|label:方案一]
>获取会产生回流重绘的CSS偏移量属性offsetHeight，offsetLeft等，强制GUI渲染进程获取执行权。

!>该方案虽能解决卡顿假死，但造成了更严重的回流重绘问题，相当于把浏览器做的渲染优化彻底破坏，了解即可，切勿使用。
```javascript
let ul = document.getElementById('table');
const total = 100000;

/**
 * @desc 以下执行到console.log()时，浏览器为了得到当前准确的offsetHeight值，
 * 会强制暂停JS引擎线程，让出执行权给GUI渲染线程
 */
for (let i = 0; i < total; i++) {
    let li = document.createElement('li');
    li.innerText = ~~(Math.random() * total)  //  取整
    console.log('height:', ul.offsetHeight) // 强制剥夺执行权
    ul.appendChild(li);
}
```

<br/>

>[!TIP|label:方案二]
>使用`setTimeout`来创建宏任务，延时设置为0，表示尽可能早执行。目的是提前让出执行权。

&emsp; 该方案结合浏览器自身的渲染优化，能较好的解决假死、卡顿问题。用户刷新页面，首页数据能很快的展示，但在用户快速滑动页面时，仍然可能出现闪屏或者白屏现象。这是因为浏览器刷新频率与页面渲染不同步导致。

?>&ensp;延时器内的数据量决定了此宏任务在执行栈执行所需的时间，也决定了GUI线程多久渲染一次。需要注意的是这并不是由延时器设置的延时时长决定。

```javascript
let ul = document.getElementById('table');
let total = 100000;
let once = 20; // 一次插入20条
let times = total / once  // 插入次数，循环次数
let index = 0; // 每条记录的索引，辅助输出使用

/**
 * @func 通过setTimeout的宏任务，提前给GUI渲染线程让出执行权
 * @desc 设置一次setTimeout插入的量，分批次插入到DOM树中
 */
function loop(curTotal,curIndex){
    if (curTotal <= 0) return false
    // 最后一次小于每页条数，循环剩余条数即可
    let pageCount = Math.min(curTotal , once);
    setTimeout(()=>{
        for(let i = 0; i < pageCount; i++){
            let li = document.createElement('li');
            li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)
            ul.appendChild(li)
        }
        loop(curTotal - pageCount,curIndex + pageCount)
    },0)
}
loop(total,index);
```

<br/>

>[!TIP|label:方案三]
>使用`requestAnimationFrame`创建宏任务，每一个宏任务执行完成后就让GUI渲染进程渲染一次页面

&emsp; `requestAnimationFrame`是浏览器提供的刷新接口，调用的频率紧紧跟随浏览器的刷新频率，能自适应不同的设备性能，且如果页面不是激活状态下的话，调用会自动暂停，节省了CPU、GPU开销。对于一般的设备，大约16ms刷新一次。

&emsp; 该方案结合浏览器自身的渲染优化，能达到近乎完美效果。值得关注的是，由于浏览器刷新有一定时间间隔，这就给JS引擎线程处理执行栈里内容提供了时间参考，因此选取合适的每页数据量，能更进一步优化页面加载速度，由于不同性能的设备刷新帧率不一致，每页条数不建议太大。

```javascript
let ul = document.getElementById('table');
let total = 100000
let once = 20
let page = total / once
let index = 0

/**
 * @func 使用requestAnimationFrame创建宏任务，提前给GUI渲染线程让出执行权
 * @desc 本方案虽然在宏任务内部执行了多次ul.appendChild，但会被浏览器优化合并，并不会多次回流。
 */
function loop(curTotal,curIndex) {
    if (curTotal <= 0) return false
    // 最后一次小于每页条数，循环剩余条数即可
    let pageCount = Math.min(curTotal , once)
    window.requestAnimationFrame(function(){
        for(let i = 0; i < pageCount; i++){
            let li = document.createElement('li');
            li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)
            ul.appendChild(li)
        }
        loop(curTotal - pageCount,curIndex + pageCount)
    })
}
loop(total,index);
```

<br/>

>[!TIP|label:方案四]
>创建文档片段`createDocumentFragment()`，在原DOM树外创建一个子树，对子树进行完整变更后，再插入到原DOM树中

&emsp; 该方案与方案二几乎一致，只是将浏览器自动优化的部分改成手动使用创建文档片段的形式进行处理，属近乎完美的方案。

``` javascript
let ul = document.getElementById('table')
let total = 100000
let documentSize = 20 // 一次插入20条，
let documentNum = total / once // 总页数
let index = 0 //每条记录的索引

/**
 * @func 使用requestAnimationFrame创建宏任务，提前给GUI渲染线程让出执行权
 * @func 创建文档片段，手动优化原DOM树回流问题。其实现代浏览器也会自动优化
 */
function loop(curTotal, curIndex) {
    if (curTotal <= 0) return false;
    // 当前文档片段插入的条数（不足一页则插入剩余条数）
    let pageCount = Math.min(curTotal , once)
    window.requestAnimationFrame(function(){
        let fragment = document.createDocumentFragment()
        for(let i = 0; i < pageCount; i++){
            let li = document.createElement('li')
            li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)
            fragment.appendChild(li)
        }
        ul.appendChild(fragment)
        loop(curTotal - pageCount, curIndex + pageCount)
    })
}
loop(total, index)
```




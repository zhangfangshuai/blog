#### 图片加载异常处理方案

&emsp; 工作中，不可避免的会在页面中加载大量图片，但可能由于网络问题，或者图片文件缺失等问题，导致图片不能正常展示，我们希望有一种降级处理的方式，可以在图片加载失败后显示一张我们预先设定好的默认图片。


### JS监听图片error事件

由于图片加载失败后，会抛出一个 error 事件，我们可以通过监听 error 事件的方式来对图片进行降级处理

```html
<img id="img" src="//xxx.xxx.xxx/img.png" />
```
```javascript
let img = document.getElementById('img');
img.addEventListener('error',function(e){
    e.target.src = '//xxx.xxx.xxx/default.png'; // 为当前图片设定默认图
})
```

<br/>

### 内联onerror监听

```html
<img src="//xxx.xxx.xxx/img.png" onerror="this.src = '//xxx.xxx.xxx/default.png'">
```
虽然不用写js了，但每张图片都需要处理，依旧不够友好。

<br/>

### 全局监听（推荐）

DOM2级事件规定事件流包含三个阶段：
- 事件捕获阶段
- 处于目标阶段
- 事件冒泡阶段

首先发生的是事件捕获，为截获事件提供了机会。然后是实际的目标接收到的事件。最后一个阶段是冒泡阶段。

上文中的监听图片自身的 `error` 事件，实际上在事件流中是处于目标阶段。对于 `img` 的 `error` 事件来说，是无法冒泡的，但是是可以捕获的，实现如下:
```javascript
window.addEventListener('error',function(e){
    // 当前异常是由图片加载异常引起的
    if( e.target.tagName.toUpperCase() === 'IMG' ){
        e.target.src = '//xxx.xxx.xxx/default.jpg';
    }
},true)
```
但是，当网络出现异常时，很可能连默认图片都无法加载，为排除这种可能，可以设置一计数器来记录图片被重试了几次，达到预期次数后改为加载一个base64图片
```javascript
window.addEventListener('error',function(e){
    let target = e.target, // 当前dom节点
        tagName = target.tagName,
        times = Number(target.dataset.times) || 0, // 以失败的次数，默认为0
        allTimes = 3; // 总失败次数，此时设定为3
    if( tagName.toUpperCase() === 'IMG' ){
        if(times >= allTimes){
            target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        }else{
            target.dataset.times = times + 1;
            target.src = '//xxx.xxx.xxx/default.jpg';
        }
    }
},true)
```





#### Transfrom 2D/3D转换

&emsp; `Transform` 是CSS极为关键且复杂的一个属性，功能丰富而且强大，能方便解决很多平常难以处理的问题，但她本身有些学习难度，如果你对页面效果爱的深沉，也请你对她爱的深沉。
![](https://img-blog.csdnimg.cn/11765ef25450416a98ce48b99c0dc7ff.png)

### Transform的值大类
&emsp; `transform` 本质上来说是一系列的**变形函数**，主要有以下值：
1. **none** -  不进行转换，常用作覆盖别的值使用
2. **translate(x,y)** - 2d位移；**translate3d(x,y,z)** - 3d位移； **transformX/Y/Z(n)** - 单向位移
3. **scale(x,y)** - 2d缩放； **scale3d(x,y,z)** - 3d缩放； **scaleX/Y(n)** - 单向缩放
4. **rotate(angle)** - 2d旋转； **rotate3d(x,y,z,angle)** - 3d旋转；**rotateX/Y/Z(angle)** - 单向旋转
5. **skew(x-angle,y-angle)** - 倾斜变换； **skewX/Y(angle)** - 单向倾斜变换
6. **matrix[3d]** - 矩阵
7. **perspective(n)** - 视距（值）
   
&emsp;

### Transform的前置属性
1. **transform-origin** - 变换原点
2. **transform-style** - 变换类型
3. **perspective** - 3d透视视图的视距（属性）
4. **perspective-origin** - 视距的基点
5. **backface-visibility** - 是否可以看见舞台背面
   
---
&emsp;

### 位移 - transform: translate(x,y)
#### trnaslate2d位移系列，主要有：`translate(x[,y]), translateX(x), translateY(y), translateZ(z), translate3d(x,y,z)`

&emsp; `translate(x[,y])` 当参数设置为正数时表示正向移动，负数为反向移动，类似于 `position:relative` + `margin`；这里注意，y值的设置是可以省略的，与`margin、padding 省略值后表示两者值一致`不同的是，如果省略了y，则表示y的值为0。例：`translate(50px)` 同 `translate(50px,0)` 表示沿x轴向右移动50个像素，y轴不变。

&emsp; 如果要使用 `translate(x,y)` ，最好不要省略参数，如果只需要偏移一个方向，建议使用 `translateX()` 或 `translateY()` ；关于 `translate(x,y)`，我有一个很经典的案例分享给大家：按钮实现上下左右绝对居中(不受文字字号影响)
``` css
<div>
    <font>这里是文案</font>
</div>
```
``` css
div {
  position: relative;
}
font {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```
![](https://img-blog.csdnimg.cn/5efb993c589c4eca90f5be718929144c.png)

#### translate3d位移主要有：`translate3d(x,y,z), translateZ(z)`

&emsp; 先说简单的，`translateZ(z)` 是指在z轴方向上的位移效果，直白点说就是图像距离看官的距离关系，距离越近，图像就越大；举个例子如 **看远处的山比看近处的手指还小**。

&emsp; 到这里必须要提前提到另一个属性：`视距 perspective` - 表示看官眼睛的位置；当 `translate` 值超过视距时，图像就消失了，就好比图像移动到看官眼睛后面一样，这个大家应该都能理解。我们用代码来说话(省去不相关属性)：
```html
<div>
  <p></p>
</div>
```
```css
div {
  width: 100px;
  height: 100px;
  perspective: 100px; 
}
p {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transform: translateZ(75px);
}
```
【**注意坑**】要使用translateZ,必须在父元素上设置perspective

![](https://img-blog.csdnimg.cn/c54a44f1ac634250abad616f7cf62f32.png)

案例中我们可以看出，我们只设置了`30px`的宽高，但因为设置了图像向前移动 `(75/100)%` ， 因此，图像变大变近了。大家应该能感觉的出来，绿圆在白色成的前面。（！好吧，我问了身边的女士，她说没感觉）

&emsp; 会了`translareZ(z)` 之后，translate3d(x,y,z)` 也就简单了，无非就是在做Z位移的同时做了x,y的位移；把刚才的例子稍作修改后直接上代码：
``` css
transform: translate3d(5px,5px,75px);
```
![](https://img-blog.csdnimg.cn/d6e0b7062f2a4cea8f50ae35ced314eb.png)

【**一个引申**】看完也许你会问，如果 `translate(x,y)` 和 `position:relative` 类似，为什么不用后者呢？简单好记。说的也不算全错，毕竟有使用场景。但，前者有几点后者无法达到的优势，而且很关键。
1. 如果是动画效果，`translate`能达到比1px更小的过渡效果，而后者却不行，这就影响了用户体验；
2. `translate`的动画效果能启用电脑GPU加速，分离图层，大大减少页面重绘模块，节省资源。
3. `position` 的可拓展性不如 `translate`等。
&emsp;

### 缩放 - transform: scale(x,y)
#### scale2d缩放系列，主要有：`scale(x,y), scaleX(x), scaleY(y)`

&emsp; `scale(x[,y])` 允许省略y，当省略y时表示x,y等值缩放。如果只想缩放x或y轴，可以使用 `scaleX(x)`, `scaleY(y)` 。既然为缩放，传递的参数肯定为缩放比例，也就是说，约定 `1` 为大小不变，`0.01~0.99` 表示缩小，` >1` 表示放大。

&emsp; 例：`scale(0.5)` 等同于 `scale(0.5, 0.5)`； `scaleX(0.5)` 等同于 `scale(0.5, 1)`

&emsp; 还有一个特例，如果我们**设置缩放比例为负数**会怎么样？一起来看一下效果：
```css
transform: scale(-1);
```
![](https://img-blog.csdnimg.cn/97913757cfdb48b498308e71a2046320.png)

```css
transform: scale(-1.5);
```
![](https://img-blog.csdnimg.cn/bf025d88b13648aab79ce94d52fb1f1d.png)

所以说，设置负数，可以使图像翻转，缩放规则与正数一致。

#### scale3d缩放系列，有：`scale3d(x,y,z) , scaleZ(z)`
&emsp; 所谓3d缩放，就是在z轴上也有缩放效果，但只有在z轴上有分内容时才能生效（其实x,y轴也一样，只是x,y轴上的直观容易理解些）

&emsp; scale3d的第三个参数，比位移的第三个参数可难以理解多了。抛开其他因素，我们先来研究`scaleZ(z)`。因为它是一个3d变形效果，因此同 `translateZ(z)` 一致，我们需要为其**创建一个3d环境**，这里把`translateZ`一起加进来对比讨论。
```html
<div class="perspective">Translated</div>
<div>Normal</div>
<div class="scaled">Scaled</div>
```
``` css
div {
  display: inline-block;
  width: 80px;
  height: 80px;
  background-color: skyblue;
}
.perspective {
  /* Includes a perspective to create a 3D space */
  transform: perspective(400px) translateZ(-100px);
  background-color: cornsilk;
}
.scaled {
  /* Includes a perspective to create a 3D space */
  transform: perspective(400px) scaleZ(2);
  background-color: pink;
}
```
![](https://img-blog.csdnimg.cn/1d17f29b380d4e888575eac6d2f3bde5.png)

&emsp; 你应该和我一开始感觉一样，在想，为什么设置了 `scaleZ(2)` 但粉色块一直不动呢？试试你会发现，参数设置成100它都不动，为什么呢？因为此时他和屏幕处在 **平行状态，z轴方向上的分内容为0，因此，参数设置多少都不变**。那如果我们把粉色块旋转一下使得z轴上有分内容，来对比一下效果：
``` css
.scaled {
  /* Includes a perspective to create a 3D space */
  transform: perspective(100px) scaleZ(1) rotateY(-20deg);
  background-color: pink;
}
```
![](https://img-blog.csdnimg.cn/2035e80f27574356a25ed6ddd92199b3.png)

如果此时将scale参数设置为2，结果如下：

![](https://img-blog.csdnimg.cn/f142aec8872a4a879b48f37eb9e0d52a.png)

可以看到z轴上的效果明显增强了，**或许你会觉得，这不是旋转的角度增大了么，其实不然！**不信来看看
 `rotateY(-40deg)` 的效果
```html
<div class="scaled">Scaled</div>
<div class="rotated">rotated</div>
```
```css
.scaled {
  /* Includes a perspective to create a 3D space */
  transform: perspective(100px) scaleZ(2) rotateY(-20deg);
  background-color: pink;
}

.rotated {
  /* Includes a perspective to create a 3D space */
  transform: perspective(100px) scaleZ(1) rotateY(-40deg);
  background-color: pink;
}
```
![](https://img-blog.csdnimg.cn/734c0a07e8814e5882023411b63615f5.png)

&emsp; 大家应该也能看出区别来，`rotate`的旋转会使图像的宽度发生变化，如果旋转`90°`，处在与屏幕垂直状态，看官就看不到这个图形了，而 **`scaleZ()` 只会修改图形在z轴上的拉伸，并不会改变图形的宽度**。
&emsp;
### 旋转 - transfrom: rotate(angle)
#### rotate2d旋转系列，有： `rotate(angle)`
【**注**】与前两个不同，`rotateX, rotateY` 同 `rotateZ`都为rotate3d旋转
&emsp; 参数 `angle` 表示旋转角度，单位为 `deg` ；当角度为正数时表示顺时针旋转，为负数时表示逆时针旋转，来看一个例子：
```html
<div>Nomal</div>
<div class="rotated">Rotated</div>
<div class="rotated2">Rotated2</div>
```
``` css
div {
  display: inline-block;
  width: 80px;
  height: 50px;
}
.rotated {
  transform: rotate(30deg);
}
.rotated2 {
  transform: rotate(-30deg);
}
```
![image.png](https://img-blog.csdnimg.cn/971941ce0a5a4144b860d0870ad63f4e.png)

#### rotate3d旋转系列，有：`rotateX(angle), rotateY(angle), rotateZ(angle), rotate3d(x, y, z, angle)`
要解释3d旋转，必须要先弄清楚**旋转轴**。关于旋转轴，如下：

![](https://img-blog.csdnimg.cn/bc881343fcae433fb844adf17fbece13.png)

其中，网布就是我们的屏幕，x轴沿屏幕平行的水平方向，y轴沿屏幕平行的垂直方向，z轴沿与屏幕垂直方向。

`rotateX(angle)`表示沿着x轴旋转，经过旋转后，内容以倾斜形式呈现，所以，高度会减少；`rotateY(angle)` 沿着y轴旋转，所以宽度会减少，**`rotateZ(angle)` 有些奇怪，与我们平时所想的不太一致，他是沿着屏幕做倾斜旋转**。
```css
.rotateX {
  transform: rotateX(45deg);
}
.rotateY {
  transform: rotateY(45deg);
}
.rotateZ {
  transform: rotateZ(30deg);
}
```

![](https://img-blog.csdnimg.cn/3a66cb80c2b84a7e8aa69db8df748d35.png)

&emsp;或许你不明白，**为什么我旋转了之后没有出现矩形效果呢？更近的地方不应该看起来更大吗？**非常好的问题，说明你思考了，这里我们漏了一个很重要的因素，**设定3D环境 `perspective`**；在没有设定视距条件下，会被默认为视距无穷远，因此旋转得到的微弱的梯形效果也就忽略了。 加上视距得到如下

```css
.rotateX {
  transform: perspective(100px) rotateX(45deg);
}
.rotateY {
  transform: perspective(100px) rotateY(45deg);
}
.rotateZ {
  transform: perspective(100px) rotateZ(30deg);
}
```

![](https://img-blog.csdnimg.cn/2870f7804c0b4272a5e0d6c7d4a1582a.png)

&emsp; 这才是正确的效果。
&emsp; 再来学习 `rotate3d(x,y,z,angle)`；看起来很难，其实很简单。前三个参数取值为 `-1，0，1` 分别表示反向旋转，不旋转，正向旋转；第四个参数表示旋转角度。
``` css
.rotate3d {
  background: lightgreen;
  transform: perspective(100px) rotate3d(1,0,-1,30deg);
}
```

![](https://img-blog.csdnimg.cn/d8dad2c96afe4c3abaabc864d0e90a9c.png)


### 倾斜 - transform: skew(x-angle, y-angle)
&emsp; skew倾斜系列

&emsp; skew倾斜允许使用一个值，当使用一个值时表示 `y-angle` 为0；倾斜有一个难点就是它的直角坐标系，关于官方的一大堆解释我们不做深入研究，为方便理解，如下(图侵删)

![](https://img-blog.csdnimg.cn/e4f24c9bbded4498a84c241e006779c6.png)

&emsp; 也就是说，**x轴的方向是竖直方向的，y轴的方向是水平方向的。以逆时针为正角度方向**
``` css
.skewed {
  transform: skewX(45deg);
}
```
![](https://img-blog.csdnimg.cn/215374034cc344468cb1be3acef6b59d.png)
```css
.skewed {
  transform: skewY(20deg);
}
```
![](https://img-blog.csdnimg.cn/e51f780d00c941148fbcca17559b35ce.png)

【**特别注意**】原点在图形的中心位置，而不是在任何一个角上。直角坐标系的第四象限（盒子所在位置）是正值所在区域。所以，**x轴正方向是逆时针方向，y轴的正方向是顺时针方向**
```css
.skewed {
  transform: skewX(30deg,10deg);
}
```
![](https://img-blog.csdnimg.cn/8b51dc53c6384396a57eac2c40863538.png)
&emsp;

### 矩阵 - matrix
&emsp; 矩阵是什么？别的一看就懂，但这个是什么？看不懂啊？其实，矩阵就是这东西：

![矩阵与图形变换关系](https://img-blog.csdnimg.cn/897adee7416041709d1d94c83e99a299.png)

&emsp; 还是不懂？简单来说，矩阵就是使图形发生变化（倾斜，缩放，旋转，平移）的原理所在。接下来的内容是页面狗逆袭的途径之一，需要点数学基础：

&emsp; 在线性代数中，矩阵是这样的（以单位矩阵为例）

![](https://img-blog.csdnimg.cn/4ebcb35217004a8185b9e46f589c1445.png)

其实该图也是CSS中矩阵的初始值。但我们的矩阵一般都不会这么简单，都会有一些初始值，语法如下，其中 `a b c e d f` 都为数值，这么写是为了方便区分
```css
transform: matrix(a,b,c,d,e,f);
```
如果你非要用坐标来理解，也可以看成是
```css
transform: matrix(x1, x2, y1, y2, z1,z2)
```
不过我担心你会越理解越混。写成向量形式就是

![](https://img-blog.csdnimg.cn/a67b23b528634cbc95ee6b6a224f835c.png)

当我们要做变换时，实质上就是对初始值添加一些系数，也就是：

![](https://img-blog.csdnimg.cn/ba7d72c9cb7e4bb6951f698d604b7c78.png)

所以我们能得到两个式子：
```
x' = ax + cy +  e   // 即：x坐标
y' = bx + dy + f    // 即：y坐标
```
记住了，ax+cy+e为变换后的水平坐标，bx+dy+f表示变换后的垂直位置。

**说了这么一大堆，矩阵到底和图形变换有什么关系？我怎么越看越迷糊了？**
&emsp; 不急，既然要’逆袭‘，就不可能那么简单，为加深理解，看一个例子来直观理解一下
```css
transform: matrix(1,o,o,1,3o,3o);    /* a=1, b=0, c=0, d=1, e=30, f=30 */
```
假设矩阵偏移的中心点是 `(0,0)` , 即 `x=0; y=0`； 有如下式子
```
x' = ax + cy +  e  = 1*0 + 0*0 + 30 = 30
y' = bx + dy + f = 0*1 + 1*0 + 30 = 30
```
于是，我们得到偏移后的坐标为 `(30,30)`；这是什么变化？相信大家都猜到了，没错，这是平移变化，即
```
transform: translate(30px, 30px)
```
聪明的你或许已经看破了，对于**平移效果**，其实矩阵公式是这样的；
```
transform: matrix(跟我无关, 我不知道, 一边玩去, 爱咋咋地, x轴偏移量，y轴偏移量)
```
前面是个参数都是没用的，因为系数`(x,y)` 为0.

&emsp; 平移容易理解，那么，其他效果呢？ 我们来看看**缩放**:

&emsp; 或许你也猜到了，和缩放相关的也是两个参数，是的，完全正确，假设比例是s，则有matrix(s, 0, 0, s, 0, 0)，于是得到：
```
x' = ax+cy+e = s*x+0*y+0 = s*x;
y' = bx+dy+f = 0*x+s*y+0 = s*y;
```
也就是
`transform: matrix(sx,0,0,sy,0,0);` 等同于 `scale(sx, sy);`

&emsp; 前两个都还能接受，**旋转**就选对复杂些，需要用到三角函数，使用参数如下：
```
matrix(cosθ,sinθ,-sinθ,cosθ,0,0)
```
结合矩阵公式有
```
x' = x*cosθ-y*sinθ+0 = x*cosθ-y*sinθ
y' = x*sinθ+y*cosθ+0 = x*sinθ+y*cosθ
```
我们可能计算得到如下一个式子：
```
transform: matrix(0.866025,0.500000,-0.500000,0.866025,0,0);
```
好难好难，其实说实在的，要是我肯定不这么写，太麻烦了，用 `rotate(20deg)` 还是直接很多。

**拉伸(skew)** 也比较复杂，也是用到三角函数，使用参数如下，
```
matrix(1,tan(θy),tan(θx),1,0,0)
```
套用矩阵公式计算结果为：
```
x' = x+y*tan(θx)+0 = x+y*tan(θx) 
y' = x*tan(θy)+y+0 = x*tan(θy)+y
```
对应于skew(θx + "deg"，θy+ "deg")这种写法。
好麻烦好麻烦，我也不想用 `matrix` 来表示拉伸。

#### matrix 工具
推荐一个测试工具[矩阵变形](http://www.css88.com/tool/css3Preview/Transform-Matrix.html)，可以在里面自己多做些尝试。

### 视距 - perspective
&emsp; 视距表示观察者距离图像的距离，是绘制3d效果必不可少的属性之一。可以回顾一下开篇第一张图片，眼睛位置就是观察者位置，`d + z` (z可以是负数) 就表示的是视距。

视距的表示有两种方法，一种是：
```
transform: perspective(100px);
```
另一种是
```
perspective: 100px;
```
&emsp; 前者作为transform的值来使用，后者作为transform的前置属性，不过需要两种效果不太一致，前置属性需要设置在父元素上生效。

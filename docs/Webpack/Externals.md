#### External 介绍与使用

External的作用主要是**告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块，也就是说这些模版是外部环境提供的，Webpack 在打包时可以忽略它们。避免不是项目所需的代码打包到了bundle中，增加了bundle体积**

有些 JavaScript 运行环境可能内置了一些全局变量或者模块，例如在你的 HTML HEAD 标签里通过以下代码：

```javascript
<script src="path/to/jquery.js"></script>
```
引入 jQuery 后，全局变量 jQuery 就会被注入到网页的 JavaScript 运行环境里。
```javascript
import $ from 'jquery';
$('.my-element');
```
构建后你会发现输出的 Chunk 里包含的 jQuery 库的内容，这导致 jQuery 库出现了2次，浪费加载流量，最好是 Chunk 里不会包含 jQuery 库的内容。

Externals 配置项就是为了解决这个问题。

通过 externals 可以告诉 Webpack JavaScript 运行环境已经内置了那些全局变量，针对这些全局变量不用打包进代码中而是直接使用全局变量。 要解决以上问题，可以这样配置 externals：

```javascript
module.export = {
  externals: {
    // 把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery
    jquery: 'jQuery'
  }
}
```

同理，当你的页面依赖一些其他团队提供的第三方CDN资源时，也可以加入到external中，例如笔者参与的项目

```javascript
module.export = {
  externals: {
    // 把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery
    jquery: 'jQuery',
    'ContactsComponents': 'ContactsComponents' // 通讯录组件
  }
}
```


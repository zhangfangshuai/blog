#### Webpack

如对Node模块感兴趣的同学，可以阅读[Node模块文档](https://nodejs.org/api/modules.html)

![webpack](https://segmentfault.com/img/bVVVqL/view?w=772&h=366)
### 前端为什么要打包和构建
**1、代码层面**

（1）体积更小（tree-shaking(去除引入但未使用的死代码模块)、压缩、合并），加载更快 <br>
（2）编译高级语言和语法（TS(ts-loader)、ES6、模块化、SCSS） <br>
（3）兼容性和错误检查（polyfill-自动兼容运行环境中不支持的语法如ES6、postcss-自动添加浏览器兼容前缀、eslint-代码格式化检查） <br>

**2、研发流程方面**

（1）统一、高效的开发环境 <br>
（2）统一的构建流程和产出标准 <br>
（3）集成公司构建规范（提测、上线）

<br>

### Webpack能干什么
webpack是一个现代Js应用程序的静态模块打包器。在功能上，webpack常被用来实现： <br>
（1）**代码转换：** 如把typescript编译javascript，把scss变异成css <br>
（2）**文件优化：** 压缩javascript、css、html代码，压缩合并图片等 <br>
（3）**代码分割：** 提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载 <br>
（4）**模块合并：** 在采用模块化的项目有很多模块和文件，需要构建功能把功能模块分类合并成一个文件 <br>
（5）**热更新：** 监听本地源代码变化，自动构建，刷新浏览器 <br>
（6）**代码校验：** 在代码被提交到仓库前需要检测代码是否符合规范，以及单元测试是否通过 <br>
（7）**自动发布：** 更新完代码后，自动构建出线上发布代码并传输给发布系统

<br>

### gulp/grunt/webpack区别
&emsp; 三者都是前端构建工具，grunt和gulp在早期比较流行，现在webpack相对来说比较主流，不过一些轻量化的任务还是会用gulp来处理，比如单独打包CSS文件等。grunt和gulp是基于任务和流（Task、Stream）的。

&emsp; webpack是基于入口的，它会自动地递归解析入口所需要加载的所有资源文件，然后用不同的Loader来处理不同的文件，用Plugin来扩展webpack功能。

<br>

### 核心概念
##### 五个打包核心配置

#### 1、Entry
&emsp; 定义入口。Webpack分析项目结构的入口文件，从该文件开始找项目的所有依赖模块。有两种定义方式：
```javascript
const config = {
  // 1、单个入口
  entry: './main.js' 
  // 2、多个入口-（1）增强可拓展性（2）配置多页面应用程序
  entry: {
    main: './src/appOne/main.js',
    index: './src/appTwo/main.js'
  }
}
module.exports = config
```
&emsp; 定义不同的入口，webpack会从不同的入口开始找依赖图，它们之间彼此完全分离、独立（每个`bundle`中都有一个webpack引导）。当定义了多页面时，如果执行页面间跳转，服务器就会为你获取一个新的HTML文档，资源也会重新下载。<br>
&emsp; 不同的入口一般都有大量可共享的代码/模块，可以使用`CommonsChunkPlugin`来为每个页面间的应用程序共享代码创建`bundle`

#### 2、Output
&emsp; 定义文件输出，如何向磁盘写入编译文件。告诉webpack输出bundle的文件名称`filename`以及文件输出路径`path`。需要注意的是，即使有多个输入，也只能有一个输出。<br>
&emsp; 值得注意的是，`output.path`必须是一个**绝对路径**。

```javascript
const path = require('path')
// 告诉webpack，将打包编译后的文件命名为bundle.js并且输出到 ./dist路径上
const config = {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // 返回 “/当前模块路径/dist”
    // 也可以简单写成
    path: __dirname + '/dist'  // 注意path.resolve在构建绝对路径时会自动加/，本行用法为字符串拼接，需要手动加/
  }
}
```
!>（1）以上`require`的`path`是[node的核心模块](https://nodejs.org/api/modules.html#modulepath)，它有很多属性和方法。其中[path.resolve](https://nodejs.org/api/path.html#pathresolvepaths)方法会将路径或路径片段的序列解析为绝对路径。语法：`path.resolve([...paths])`。解析参数时从右到左，找到第一个绝对路径后停止解析返回结果，假如最后一个参数是相对路径，倒数第二个参数是绝对路径，则会将两个拼接起来形成绝对路径。<br>
（2）对于`__dirname`，表示目录名，相当于 `__filename`的[path.dirname()](https://nodejs.org/api/path.html#pathdirnamepath)，用于返回模块所在位置的绝对路径

##### 2.1、publicPath

&emsp; `publicPath`是一个相对路径，如果配置了，那么服务器在读取资源文件时，会在资源文件前拼接该路径，再去拼接后的路径中查找该文件。这是资源分块简单又有效的策略。<br>
&emsp; 在编译时不知道最终输出文件的 `publicPath` 的情况下，可以先留空，并且在入口起点文件运行时动态设置。这个入口文件就是entry里配置的文件，只要保证在该文件顶部赋值`publicPath`即可。这也叫**运行时publicPath**，在qiankun微前端框架中有使用。

```javascript
__webpack_public_path__ = myRuntimePublicPath
```

#### 3、Mode
&emsp; 模式，用于告知webpack针对不同环境执行不同的打包选项。通过默认的环境通过process.env.NODE_ENV获取<br>
（1）用来告知webpack使用相应的模式进行内置的优化，这个功能是webpack内置的，可选值为`development`和`production`，对值为`production`的模式会自动启用多个优化插件。
```javascript
module.exports = {
  mode: 'production'
}
```
（2）对于Vue项目，如果在Shell中配置，则可以用来区分不同的运行环境
```
// package.json
"scripts": {
  "build:SIT": "vue-cli-service build --mode sit",  // 读取 .env.sit配置文件
  "build:PROD": "vue-cli-service build --mode prod", // 读取 .env.prod配置文件
}
```

#### 4、Loader
&emsp; 模块源代码转换器。在webpack分析文件依赖，检查`import`和`require`等加载模块时对文件进行预处理，转换为webpack认识的有效语法。
  - 1、实现对不同格式的文件进行处理，如将scss转css，将ts转换为js，将内联图片转dataURL。
  - 2、允许直接在JS模块中`import`css文件

在做转换时，需要提前下载安装对应转换的loader包，当然也可以[自己实现loader](https://www.webpackjs.com/contribute/writing-a-loader/)。比如对css使用css-loader，对ts使用ts-loader
```javascript
// 安装
npm install --save-dev css-loader
npm install --save-dev ts-loader

// 配置webpack.config.js   或 vue.config.js - vue-cli3
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
      // 配置多个loader，use设置为数组
      { test: /\.css/, use: [{ loader: 'css-loader'}, { loader: 'style-loader' }] }
    ]
  }
}
```
!> 所有的loader配置在`module.rules`中，使用`test`正则匹配需要转换的文件，使用`use`确定要使用哪个loader。如果需要使用多个loader，则将use设置为数组即可。链式调用多个loader时执行顺序按配置为从右到左，从下到上。

?>loader还可以通过内联import和脚手架cli两种方式配置，但不建议使用，散乱的loader配置不便于维护

#### 5、Plugins
&emsp; loader用于转换某些类型的模块，而插件则可以用于执行范围更广的任务如打包优化、代码压缩、修改环境中的变量等各种任务。**loaders负责的是处理源文件的如css、jsx，一次处理一个文件。而plugins并不是直接操作单个文件，它直接对整个构建过程起作用。**可以通过查阅[Webpack插件列表](https://www.webpackjs.com/plugins/)来了解更多插件的功能用法。

&emsp; 由于插件可以携带参数/选项，因此必须在webpack配置中，向plugins属性传入`new`实例

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  // ...
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
}
```


##### 三个包文件概念
- `bundle`：由webpack通过entry找到依赖图打包出来的文件
- `chunk`：指Webpack通过`Code Splitting`功能将文件(bundle)分成的多个代码块，一个代码块就是一个chunk
- `module`：webpack的模块，如ES6中的`import`、CommonJS的`require()`、css/sass/less的`@import`、样式(`url(...)`)或 HTML 文件(```<img src=...>```)中的图片链接(image url)

<br>

### Webpack的构建过程
webpack运行流程是一个串行的流程，从启动到结束，依次执行以下过程：<br>
（1）**初始化参数：**从配置文件和Shell语句中读取并合并参数，得出最终参数。<br>
（2）**开始编译：**用得到的参数初始化Complier对象，加载所有配置的插件，执行对象的`run`方法开始执行编译；<br>
（3）**确定入口：**根据配置中的 entry 找出入口文件<br>
（4）**编译及构建依赖图：**从入口文件开始分析项目依赖，调用所有配置的Loader对模块进行转换，再找出该模块依赖的模块，如此递归直到所有依赖被找到且需要转换的文件被转换成最终的内容，形成依赖图。<br>
（5）**输出资源：** 根据入口和模块之间的依赖关系，分割成一个个包含多个模块的chunk，再把每个chunk转换成一个单独的文件加入到输出列表，此步骤是可以修改输出内容的最后机会。 <br>
（6）**输出文件到指定文件：** 在确定好输出内容后，根据output配置确定输出的路径和文件名，把文件内容写到文件系统中。

&emsp; 在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。


### 使用webpack做性能优化

#### 1、`OccurenceOrderPlugin`
为组件分配ID,通过这个插件webpack可以分析和优先考虑使用最多 的模块，然后为他们分配最小的ID
```javascript
module.exports = {
  plugins: {
    new webpack.optimize.OccurenceOrderPlugin()
  }
}
```

#### 2、`UglifyJsPlugin`
压缩代码，tree-shaking，排除掉引入了但未使用的模块。然后我们在`npm run build`之后可以看到代码是压缩的。
```javascript
module.exports = {
  plugins: {
    new webpack.optimize.UglifyJsPlugin()
  }
}
```
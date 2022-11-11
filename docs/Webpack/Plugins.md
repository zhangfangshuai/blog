#### 常用Plugins介绍
#### 1、`CommonsChunkPlugin`
提取chunks之间共享的通用模块生成一个额外的chunk，在最开始时加载一次后缓存起来，后续无需再次加载。
但该插件在webpack@4及以上被移除，取而代之的是`SplitChunksPlugin`。
```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: "commons", // 公共chunk的名称
  filename: "commons.js", // 公共chunk文件名
  // minChunks: 3, // 模块被3个入口chunk共享被认定为公共chunk
  // chunks: ["pageA", "pageB"], // 指定使用的入口chunk
})
```

#### 2、`SplitChunksPlugin`
最初，chunks（以及内部导入的模块）是通过内部 webpack 图谱中的父子关系关联的。CommonsChunkPlugin 曾被用来避免他们之间的重复依赖，但是不可能再做进一步的优化。从 webpack v4 开始，移除了 CommonsChunkPlugin，取而代之的是 optimization.splitChunks。

开箱即用的 SplitChunksPlugin 对于大部分用户来说非常友好。默认情况下，它只会影响到按需加载的 chunks，因为修改 initial chunks 会影响到项目的 HTML 文件中的脚本标签。

webpack 将根据以下条件自动拆分 chunks：
- 新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹
- 新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
- 当按需加载 chunks 时，并行请求的最大数量小于或等于 30
- 当加载初始化页面时，并发请求的最大数量小于或等于 30
- 当尝试满足最后两个条件时，最好使用较大的 chunks。

```javascript
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async', // 'initial'-初始化，‘all’-全部(默认)，‘async’-动态加载
      minSize: 20000,  // 新代码块的最小体积，只有 >=minSize的bundle才会被拆分出来
      minRemainingSize: 0,  // 拆分之前最大的数值，0-表示不做限制
      minChunks: 1, // 资源最少被引入几次才可以被拆分出来
      maxAsyncRequests: 30, // 按需加载最大并行请求数
      maxInitialRequests: 30, // 入口点最大并行请求数
      automaticNameDelimiter: '~', // 文件连接符，webpack使用chunk的来源和名称拼接，如vendors-main.js
      // 拆分包后的缓存组，有利于webpack下次编译更加快速
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```
>更多解释详见：https://webpack.docschina.org/plugins/split-chunks-plugin/

#### 2、`ExtractTextPlugin`

从bundle中提取文本（CSS）到单独的文件。也就是说，你的样式将不再内嵌到JS bundle中，而是存放到单独的CSS文件。这样的好处是CSS bundle和JS bundle可以并行加载，提高页面加载速度。坏处是多了一个chunk，浏览器需要多下载一个文件。

```javascript
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",  // 当css没有被提取是使用的loader
          use: "css-loader"  // ExtractTextPlugin提取使用的loader，将资源转换成一个css导出模块
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "styles.css", // 指定提取后css文件名，
      allChunks: false, // 从所有额外的chunk提取，默认只在公共chunk中提取急CommonChunnk
      ignoreOrder: true // 禁用顺序检查
    }), 
  ]
}
```

动态的修改`filename`，使用getPath参数来处理个事，它返回指定参数模块的绝对路径
```javascript
new ExtractTextPlugin({
  filename:  (getPath) => {
    return getPath('css/[name].css').replace('css/js', 'css');
  },
})
```
!> 该插件仅支持webpack4以下版本，webpack4及以上，请使用 `MiniCssExtractPlugin`


#### 3、`MiniCssExtractPlugin`
将css单独打包成一个文件的插件，它为每个包含css的js文件都创建一个css文件。它支持css和sourceMaps的按需加载。目前只有在webpack V4及以上版本才支持使用。
```bash
js npm install --save-dev mini-css-extract-plugin
```

和extract-text-webpack-plugin相比：

- 异步加载
- 无重复编译，性能有所提升
- 用法简单
- 支持css分割

这个插件应该只在生产环境构建中使用，并且在loader链中不应该有`style-loader`，特别是我们在开发模式中使用HMR时
```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const devMode = process.env.NODE_ENV !== 'production'

module.exports={
    plugins:[
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[contenthash:8].css',
        chunkFilename: devMode ? '[id].css' : '[id].[contenthash:8].css'
      })
    ],
     module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 开发环境使用style-loader，生产环境拆出css单独文件
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  }
}
```


#### 4、`HtmlWebpackPlugin`

简单创建 HTML 文件，用于服务器访问，该文件使用script标签引用了所有打包完成的chunk包。

```javascript
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var webpackConfig = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};
```

#### 5、`MinChunkSizePlugin`
通过合并小于 minChunkSize 大小的 chunk，将 chunk 体积保持在指定大小限制以上。减少浏览器因请求资源而发起的http请求

```javascript
new webpack.optimize.MinChunkSizePlugin({
  minChunkSize: 10000 // Minimum number of characters
})
```

#### 6、`UglifyJsPlugin`


```javascript
// 安装
npm i -D uglifyjs-webpack-plugin

/// 使用
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  plugins: [
    new UglifyJsPlugin()
    // 或传入一个配置
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      sourceMap: process.env.Node_ENV === 'development',
      cache: true,
    })
  ]
}
```


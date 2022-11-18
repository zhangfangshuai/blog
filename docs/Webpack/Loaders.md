#### 常用Loader介绍

#### 1、`style-loader`
webpack中使用`style-loader`将指定文件的css内容注入到Javascript里。

工作原理大概是CSS的内容用JavaScript的字符串存储起来，在网页执行时通过DOM操作动态插入到head的style标签里；如果你觉得这会走功能方式会影响网页加载，则可以使用webpack 的Plugin机制单独输出css文件。

在生产环境优化项目的情况下，建议使用`MiniCssExtractPlugin.loader`将css抽离到单独文件中。<span style="background: pink; padding: 2px 12px;">webpack4以下用ExtractTextPlugin</span>

#### 2、`css-loader`
由于项目工程化，css文件也有模块化的概念，在一些css文件中包含@import等语句。此时需要使用`css-loader`来将样式代码找到依赖并合入到目标文件中整合成一段css。一般会再交给`style-loader`处理

支持参数`?minimize` <span style="background: pink; padding: 2px 12px;">webpack5已废弃, 改用CssMinimizerPlugin</span>

#### 3、`sass-loader`
解析sass文件。它是用于将scss语法的样式转换成css语法的样式。一般会再交给`style-loader`处理

!> 使用`sass-loader`需要安装sass-loader，node-sass两个依赖

#### 4、`postcss-loader`
由于css样式存在浏览器兼容性问题，`postcss-loader`基于autoprefixer自动给那些可以添加厂商前缀的样式添加厂商前缀，如（`-webkit`、`-moz`、`-ms`、`-o`），它需要放在css-loader和sass-loader之前使用。<br>
postcss-loader有一个单独的配置文件，名为`postcss.config.js`，和`webpack.config.js`同级。

!> 使用`postcss-loader`需要安装postcss-loader，autoprefixer两个依赖

#### 5、`babel-loader`
用于转换js文件，将ES6等浏览器不能直接使用的语法转换成浏览器能识别的ES5语法

!> 使用`babel-loader`需要安装babel-loader，babel-core两个依赖


#### 6、`file-loader`
<span style="background: pink; padding: 2px 12px;">webpack5已废弃，改用内置的 type: asset/resource</span>

file-loader把JS和CSS中导入图片语句替换成正确的地址，并把文件输出到对应的位置.

CSS如：
```css
background: url(./img/a.png)
```
转换后输出
```css
background: url(55276e274...afda24.png);
```
并在dist文件输出`55276e274...afda24.png`文件，而这个奇怪的数值是根据图片内容计算的hash值。如果你打开

JS如
 ```
import imgB from './imgs/b.png'
```
转换后
```
module.exports = __webpack_require__.p + '8bcc1f8..8429c.png';
```
同样是containhash值



#### 7、`url-loader`
<span style="background: pink; padding: 2px 12px;">webpack5已废弃，改用内置的 type: asset/resource</span>

url-loader根据图片内容计算base64编码字符串直接注入到JS代码中，解析文件包括图片的url，音视频的url等。这么做的目的是减少小图片作为资源需要浏览器单独建立HTTP链接的消耗，但图片转base64缺点会带来js篇幅过大问题，因此需要使用limit定义小图片的规格
```css
body{
    background: url(../img/test.jpg);
}
```

```js
{
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 1024 * 30, // 限制小于30kB
        name:'img/[name].[hash:8].[ext]' // 使用file-loader解析打包后的文件格式，及存放位置（相对于dist目录下）
        fallback: 'file-loader'
      },

    }
  ]
}
```
但是笔者在实践中发现，url-loader对js里的资源url能直接插入到代码中，但对css的资源url，仍然会生存文件，但是文件内容是 export default "data:image/png;base64,iVBOa253f..."


#### 8、`vue-loader`
vue文件是一种自定义类型的文件，`vue-loader`用于解析和转换.vue文件，提取其中的逻辑代码`<script>`、样式代码`<style>`、以及HTML模版`<template>`，再把他们分别交给对应的Loader去处理。

---
&emsp;

#### 整体配置一览

```javascript
/**
 * @name webpack配置文件
 * @desc 构建运行在Node.js环境中，使用CommonJs规范编写配置对象（CommonJs规范可以直接运行在Node环境中）
 */

const path = require('path') // 该服务由webpack内置，NodeJs提供
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: devMode ? 'development' : 'production',
    context: path.join(__dirname, '/'), // 非必选
    entry: './src/main.js',
    output: {
        filename: devMode ? '[name].js' : '[name].[content:8].js',
        chunkFilename: devMode ? '[name].js' : '[name].[content:8].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/src/')
        }
    },
    module: {
        rules: [
            {
                test: [/\.css$/, /\.scss$/],
                use: [
                    {
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    },
                    'css-loader', // 将import等模块css整合到一个文件
                    'sass-loader', // 将scss语法转css
                    'postcss-loader' // 添加浏览器兼容前缀
                ],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory'], // ?cacheDirectory参数，用户缓存babel编译结果加快重新编译速度,
                include: path.resolve(__dirname, 'src')
            },
            {
                test: [/\.ts?$/],
                loader: 'awesome-typescript-loader',
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.(gif|png|jpe?g|eot|woff|ttf|pdf)$/,
                // use的配置如果比较复杂，可以接受一个对象数组进行配置
                use: [
                    {
                        // url-loader根据图片内容计算base64编码字符串直接注入到JS代码中
                        // 这么做的目的是减少小图片作为资源需要浏览器单独建立HTTP链接的消耗
                        // 但图片转base64缺点会带来js篇幅过大问题，因此需要使用limit定义小图片的规格
                        loader: 'url-loader',
                        options: {
                            // 30kB以下文件采用url-loader
                            limit: 1024 * 30,
                            // 否则使用file-loader
                            // file-loader把JS和CSS中导入图片语句替换成正确的地址，并把文件输出到对应的位置
                            // CSS如：background: url(./img/a.png) 转换后输出 background: url(55276e274...afda24.png); 并在dist文件输出55276e274...afda24.png文件，而这个奇怪的数值是根据图片内容计算的hash值
                            // JS如：import imgB from './imgs/b.png' 转换后 module.exports = __webpack_require__.p + '8bcc1f8..8429c.png'; 同样是containhash值
                            fallback: 'file-loader'
                        }
                    }
                ]
            },
            {
                test: /\.svg$/, // 匹配svg矢量图
                // svg也可以使用url-loader/file-loader，但更建议使用svg-inline-loader
                // 由于svg图片本身的特殊性，其就是一个HTML标签，可以直接插入到dom中使用。
                // raw-loader可以把文本文件读取出来，注入到JS或CSS中去，
                // raw-loader示例：import svgContent from './svgs/alert.svg' 转换后 module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\"...</svg>"，地址转换成<svg>html标签后，直接插入dom即document.querySelector('app').innerHTML = svgContent
                use: ['raw-loader'],
                // 由于raw-loader会直接返回svg文本内容，因此对于css部分是无法使用的。另外raw-loader会返回svg全内容，不会做优化
                // svg-inline-loader 会分析SVG内容，去除不必要部分代码，增加了对SVG的压缩功能。
                // SVG-inline-loader功能与raw-loader功能类似，但更适用。
                use: ['svg-inline-loader']
            }
        ]
    },
    plugins: [
        // MiniCssExtractPlugin使用的是contenthash而不是chunkhash
        new MiniCssExtractPlugin({
            filename: devMode ? `[name].css` : `[name]_[contenthash:8].css`,
            chunkFilename: devMode ? `[name].css` : `[name]_[contenthash:8].css`
        })
    ]
}
```
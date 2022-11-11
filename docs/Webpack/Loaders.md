#### 常用Loader介绍

!> webpack在打包样式文件时会去webpack.config.js配置文件中查找相关的loader，如果未找到则打包失败；找到，则按use数组的“从右到左，从下到上”依次执行。每一个loader都可以通过URL querystring的方式传入参数。

```js
{
  test: './\.scss$/',
  use: ['style-loader', 'css-loader?minimize', 'sass-loader', 'postcss-loader'] // 每个css文件都开启css压缩
}
```
#### 1、`style-loader`
webpack中使用`style-loader`将指定文件的css内容注入到Javascript里。

工作原理大概是CSS的内容用JavaScript的字符串存储起来，在网页执行时通过DOM操作动态插入到head的style标签里；如果你觉得这会走功能方式会影响网页加载，则可以使用webpack 的Plugin机制单独输出css文件。

#### 2、`css-loader`
由于项目工程化，css文件也有模块化的概念，在一些css文件中包含@import等语句。此时需要使用`css-loader`来将样式代码找到依赖并合入到目标文件中整合成一段css。一般会再交给`style-loader`处理

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

#### 6、`url-loader`
解析文件中使用相对路径引入的资源，如图片的url，音视频的url等。
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
        limit: 8196, // 当图片体积小于8196字节时转成base64，否则使用`file-loader`解析该模块
        name:'img/[name].[hash:8].[ext]' // 使用file-loader解析打包后的文件格式，及存放位置（相对于dist目录下）
      },

    }
  ]
}
```

#### 7、`file-loader`
辅助`url-loader`，见上例


#### 8、`vue-loader`
vue文件是一种自定义类型的文件，`vue-loader`用于解析和转换.vue文件，提取其中的逻辑代码`<script>`、样式代码`<style>`、以及HTML模版`<template>`，再把他们分别交给对应的Loader去处理。


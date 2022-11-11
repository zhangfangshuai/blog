#### 学习Webpack的踩坑日记


#### 一、 手动安装webpack，执行时提示command not found: webpack

原因：环境变量 PATH 未添加webpack执行命令

工程已安装局部依赖包`npm i -D webpack webpack-cli`，配置好webpack.config.js文件，但执行webpack报错`zsh: command not found: webpack`

因为当前环境变量中，没有找到对应的命令，解决方法如下：
```bash
➜ echo 'export PATH="./node_modules/.bin:$PATH"' >> ~/.zshrc
➜ source ~/.zshrc
```


#### 二、 使用 Extract-text-webpack-plugin 编译报错 compiler.plugin is not a function

原因：webpack4及以下使用`Extract-text-webpack-plugin`抽离单独的css文件，webpack4以上（案例中使用的是webpack5）应该改为`mini-css-extract-plugin`

```js
modules: {
    rules: [
        {
            test: /\.css$/, // 正则匹配
            use: [
                {
                    // webpack开发模式不能使用miniCssExtractPlugin.loader
                    loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                },
                'css-loader'
            ] 
        }
    ]
}
// webapck5自带有css压缩功能，无需像webpack4那样设定optimization.minimizer
// optimization: {
//     minimizer: [
//         new UglifyJsPlugin({
//         cache: true,
//         parallel: true,
//         sourceMap: true // set to true if you want JS source maps
//         }),
//         new OptimizeCSSAssetsPlugin({})
//     ]
// },
// plugin用来扩展webpack功能，通过在构建流程里注入钩子实现
// 接收一个数组，数组每一项都是一个plugin实例
plugins: [
    new MiniCssExtractPlugin({
        filename: devMode ? `[name].css` : `[name]_[contenthash:8].css`,
        chunkFilename: devMode ? `[id].css` : `[id]_[contenthash:8].css`
    })
]
```


#### 三、提示'mode' option has not been set
在webpack5中，需要在配置mode属性，值与NODE_ENV保持一致即可
const mode = process.env.NODE_ENV

```js
modules: {
    mode: mode,
}
```


#### 四、webpack-dev-server启动成功，但无法访问页面，提示Cannot get/

原因：webpack-dev-server插件安装完成，启动本地HTTP服务，会去找根目录，未配置时默认的是设备的根目录，使用 `devServer.static.directory` 配置

```js
modules: {
    devServer: {
        static: {
            directory: path.join(__dirname, '/') // 指定到当前项目目录下
        }
    }
}
```


#### 五、webpack.optimize.CommonsChunkPlugin is not a constructor

原因：webpack@4以后的版本，弃用了许多@3的插件，功能都并入`entry`和`output`的配置中，其中包括：
- 分离打包js文件的插件  `webpack.optimize.CommonChunkPlugin()`；
- 压缩js文件的插件 `webpack.optimize.UglifyJsPlugin()`;
- 定义产品上线环境 `webpack.optimize.DedupePlugun()`；
- 分离css文件插件 `extract-text-webpack-plugin()`;
- css文件压缩插件 `CssMinimizerPlugin()`；

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


#### 六、vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.

原因：webpack4及以后版本，使用vue-loader时需要配合VueLoaderPlugin插件，该插件来自于vue-loader/lib/plugin，而高版本的vue-loader没有这个文件。即webpack高版本于vue-loader高版本不兼容导致

笔者出问题版本清单
```js
“webpack”: “^5.72.0”,
“vue”: “^3.2.33”
“vue-loader”: “^17.0.0”,
“vue-template-compiler”: “^2.6.14”,
```

解决方案一：（不推荐）

安装vue-loader的版本为^15.7.0版本.
```bash
npm i -D vue-loader@15.7.9
```

解决方案二：（推荐）

在vue-loader@17版本中，VueLoaderPlugin被放到了dist文件夹下，且删除了lib文件夹，也就是说，plugin被打包到vue-loader自身了。因此修改如下
```javascript
const { VueLoaderPlugin } = require('vue-loader') // 推荐
```

另外，需要注意的是，Vue3及以上版本，初始化vue时不在是
```js
import Vue from 'vue'
```
而是改成
```js
import { creatApp } from 'vue'

creatApp(App).mount('#app')
```
此时，就能看到浏览器正常渲染出了目标页面

#### 七、使用url-loader、file-loader处理图片时，图片被多打出一个export default “..base64..”文件，且本地启动css背景图片不显示

原因：浏览器css背景图被引用成多打出来的base64文件图片，并不是真正的目标文件。因为webpack5中的url-loader、file-loader已经废弃，且破坏性不兼容，这两个loader在webpack5中已经无法使用

解决方案一：修改成webpack5默认的资源处理器
```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|svg|gif|eot|woff|ttf|pdf)$/,
                type: 'asset/resource'
            }
        ]
    }
}
```

解决方案二：如果还想用这两个loader，则添加兼容策略。<br />
（1）在`option`里关闭url-loader的es6模块化解析，使用commonjs解析； <br />
（2）添加`type: 'javascript/auto'`，防止资源被打包两次
```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|eot|woff|ttf|pdf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10 ,
                            fallback: 'file-loader',
                            // 关闭url-loader的es6模块化解析，使用commonjs解析
                            esModule: false
                        }
                    }
                ],
                // 防止一张图片被打包两次
                type: 'javascript/auto',
            }
        ]
    }
}
```

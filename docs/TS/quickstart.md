#### TypeScript的基本入门

TypeScript：JavaScript的超集！

### 特性

TypeScript是一种由微软开发的开源、跨平台的编程语言。浏览器并不认识TS，他最终需要被编译为JS代码交给浏览器执行，它使用`.ts`拓展名来命名文件。它有如下优势：

1. TS始于JS，并扩充了JS语法，因此可以在TS文件中直接编写JS代码
2. 具备强大的类型系统；JS是一个无类型语言，无法在开发时做代码的静态检查，而TS弥补了这点
3. TS支持了最新的JS特性，如ES6+，且代码开源


### 编译与工程化

##### 1、手动编译
（1）全局安装TS

```bash
npm install -g typescript
```
（2）执行编译命令
```bash
tsc ./first_ts.ts
```
输出结果为 `first_ts.js`

&emsp;

##### 2、使用vscode自动编译
（1）执行 `tsc --init`, 生成 `tsconfig.json` 配置文件
（2）修改配置文件
```json
// ... 其他配置
outDir: './js' // 指定编译后存放的文件夹
strict: false  // 关闭严格模式
// ... 其他配置
```
（3）启动vscode任务监视器，开始监听ts文件并实时编译

步骤：`终端 -> 运行任务 -> 监视tsconfig.json`

&emsp;

##### 3、使用webpack工程化编译

对于项目来说，更合适的做法是使用工程化编译方案，webpack使用 `ts-loader` 插件进行编译

（1）修改配置文件 `webpack.config.js`

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

function resolve(dir) {
    return path.resolve(_dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './src/main.ts'
    },
    output: {
        // 打包后内容输出文件
        path: resolve('dist'),
        // 给输出文件增加contenthash
        filename: `[name].[contenthash:8].js`
    },
    module: {
        // 配置编译规则: 把src里的ts文件，tsx文件编译成js
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                include: [resolve('src')]
            }
        ]
    },
    plugins: [
        // 把dist目录中之前打包的文件清楚
        new CleanWebpackPlugin({}),
        // 生成html创建项目的页面入口文件
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],

    resolve: {
        // import没写扩展名时，自动匹配的文件后缀
        extensions: ['.ts', '.tsx', '.js']
    },

    devtool: isProd ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',

    devServer: {
        host: 'localhost',
        stats: 'errors-only', // 日志打印级别
        port: 8000,
        open: true
    }
}
```

&emsp;

### 类型注解

官方描述为：类型注解是一种轻量级的为函数或变量添加约束的方式；
```typescript
function greeter(person: string) {
    return "Hello, " + person
}
// let user = [0, 1, 2]
// document.body.innerHTML = greeter(user)
```

如果传入的值不符合指定的类型，则会抛出错误提示，这是因为typescript提供了静态的代码分析；
`Argument of type 'number[]' is not assignable to parameter of type 'string'.`

就算静态检查出现问题，js文件依旧能被编译成功，且被浏览器执行。这个错误仅是ts的提示，TS在警告你代码可能不会按预期执行。

```js
function showMsg(str:string) {
    return `hello ${str}`
}
console.log(showMsg(10)) // Argument of type 'number' is not assignable to parameter of type 'string'.
// 成功输出 hello 10
```
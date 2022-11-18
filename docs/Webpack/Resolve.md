#### 常见的几个Resolve配置如下

```javascript
module.exports = {
    ...
    resolve: {
        // 别名，路径映射
        alias: {
            'react$': '/path/to/react.min.js', // 将代码中的以react结尾的路径映射成新路径
            '@': './src' // 方便开发，将src地址简化为@符号，这样可以很容易引用相对路径资源
        },
        // 导入模块未写后缀名时，webpack会按着extension配置的后缀查找，找到即止。默认['.js', '.json']
        // 为了编译效率，代码中不太建议省略文件后缀，增加webpack检索文件负担
        extensions: ['.js', '.css'],
        // 配置webpack去哪里找第三方模块，默认去node_modules下查找，如果组件大量存放在src/components下，可以如下配置
        modules: ['./src/components', 'node_modules'],
        // 通常情况下，第三方模块都会在node_modules，components下放的都是本项目依赖
        // 为了减小webpack编译时检索第三方模块的压力，建议写明路径
        modules: path.resolve(__dirname, 'node_modules'),
        // 强制所有导入语句都必须带文件后缀-默认false
        enforceExtension: false
    },
    ...
}
```
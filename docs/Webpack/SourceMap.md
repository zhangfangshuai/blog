#### devtool Source Map 调试

`devtool`是Webpack专门用来配置如何生成Source Map，他有以下几种选项：

- `eval`: 每个module 都会封装到eval里包裹起来执行，并且会在每个eval语句的末尾追加注释 //# sourceURL=webpack：///./main.js
- `source-map`: 输出质量最高、最详细的Source Map，额外生成一个.map文件，并在js文件末尾追加注释sourceMappingURL=bundle.js.map
- `hidden-soure-map`: 和`source-map`类似，但不会额外生成.map文件，只在js文件末尾追加注释sourceMappingURL=bundle.js.map
- `inline-source-map`: 和`source-map`类似，但不会生成.map文件，而且把Source Map转换成base64嵌入到JS中（不建议使用）
- `eval-source-map`: 和`eval`类似，但会把模块的Source Map转换成base64嵌入到eval语句末尾例如 //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW...
- `cheap-source-map`: 和 `source-map` 类似，但生成的 Source Map 文件中没有列信息，因此生成速度更快
- `cheap-module-source-map`: 和 `cheap-source-map` 类似，但会包含 Loader 生成的 Source Map
- `cheap-module-eval-source-map`: 和`cheap-module-source-map` 类似，构建速度更快

其实以上选项，是`eval`、`source-map`、`hidden`、`inline`、`cheap`、`module`的组合而成，当然也可以有其他组合，不过以上集中已经涵盖了可能用到的功能。

---

#### 最佳实践

如果你不关心细节和性能，只是想在不出任何差错的情况下调试源码，可以直接设置成 `source-map`，但这样会造成两个问题：

1. `source-map` 模式下会输出质量最高最详细的 Source Map，这会造成构建速度缓慢，特别是在开发过程需要频繁修改的时候会增加等待时间；
2. `source-map` 模式下会把 Source Map 暴露出去，如果构建发布到线上的代码的 Source Map 暴露出去就等于源码被泄露；

为了解决以上两个问题，可以这样做：

1. 在开发环境下把 `devtool` 设置成 `eval-cheap-module-source-map`，因为生成这种 Source Map 的速度最快，能加速构建。由于在开发环境下不会做代码压缩，Source Map 中即使没有列信息也不会影响断点调试；
2. 在生产环境下把 `devtool` 设置成 `hidden-source-map`，意思是生成最详细的 Source Map，但不会把 Source Map 暴露出去。由于在生产环境下会做代码压缩，一个 JavaScript 文件只有一行，所以需要列信息。


>在生产环境下通常不会把 Source Map 上传到 HTTP 服务器让用户获取，而是上传到 JavaScript 错误收集系统，在错误收集系统上根据 Source Map 和收集到的 JavaScript 运行错误堆栈计算出错误所在源码的位置。

```javascript
const devMode = process.env.NODE_ENV !== 'production'
module.exports = {
    //  在开发环境下使用eval-cheap-module-source-map，在生产环境使用hidden-source-map
    devtool: devMode ?'eval-cheap-module-source-map' : 'hidden-source-map',
}
```

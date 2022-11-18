#### 自定义loader

loader本身是一个 JavaScript 模块，用于对模块的源码进行转换。

由于 Webpack 是运行在 Node.js 之上的，一个 Loader 其实就是一个 Node.js 模块，这个模块需要导出一个函数。 这个导出的函数的工作就是获得处理前的原内容，对原内容执行处理后，返回处理后的内容。

#### loader原则
- 单一：一个loader只做一件事
- 链式调用：从右往左依次调用
- 模块化：保证输出的是模块化
- 无状态：每一个loader的运行相对独立，不与其他loader产生依赖关联
- 同步或异步：loader支持同步处理和异步处理，这取决于你的需求是否需要等待异步响应，异步调用const callback = this.async()
- loader-utils工具库、loader-依赖、模块依赖、同等依赖、通用代码、绝对路径等详见 [Loader用法准则](https://webpack.docschina.org/contribute/writing-a-loader/#peer-dependencies)


---
#### 编写一个replace-loader

replace-loader 用于替换项目下特定字符串，一般用作语法转换，或处理某些兼容性bug。

笔者在项目根目录下（与webpack.config.js同级）新建了loader文件夹，并在该文件夹下新建了replace-loader.js文件，目的是把zhangfs内容替换成zhangfangshuai后输出，代码如下：
```javascript
/**
 * @func 写法一：使用return返回模块数据
 */
function replace(self, source) {
    // 获取到用户的loader配置项中的参数，如 babel-loader?cacheDirectory 中的 cacheDirectory
    // 也可以使用this.query获取
    const options = self.getOptions()
    console.log('【loader参数】', option)
    return source.replace('zhangfs', 'zhangfangshuai')
}

/**
 * @func 写法二：使用this.callback返回模块数据
 * @desc this.callback(err, values, sourceMap（可选）)用于返回结果数据比较复杂的场景
 */
function callbackReplace(self, source) {
    const options = self.getOptions()
    const result = source.replace('zhangfs', 'zhangfangshuai')
    self.callback(null, result)
}


/**
 * @func 自定义loader基本结构
 * @param {Object} source - compiler传递给Loader的一个文件原内容
 */
module.exports = function(source) {
    return callbackReplace(this, source)
}
```


#### 使用webpack加载本地loader
加载本地loader的配置方式有两种：

**1、直接在配置loader的地方，使用`path.resolve`添加loader的绝对路径，指明需要使用的loader**
```javascript
{
  // ...省略
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, './src/xq-loader/my-loader.js'),
            options: {
              name: 'replace-loader',
            },
          },
        ],
      },
    ],
  }
}
```

**2、正常配置loader，loader的名字和自定义的loader文件名相同，并配置resolveLoader告诉webpack去哪里找自定义的loader**
```javascript
// webpack.config.js
{
    module: {
        rule: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory', 'replace-loader'],
                include: path.resolve(__dirname, 'src')
            }
        ]
    },
    resolveLoader: {
        // 告诉webpack先从node_modules查找，找不到后去loaders查找。使用文件名匹配。
        modules: ['node_modules', 'loaders']
    }
}

// 
```


#### 效果验证

笔者使用vue写了一个测试页面，如下
```vue
<template>
    <div class="container">
        <header>{{ title }}</header>
        <section id="author"></section>
    </div>
</template>

<script>
const author = 'zhangfs'

export default {
  data () {
    return {
      title: 'Hello, webpack-images-vue',
    }
  },
  mounted() {
    document.querySelector('#author').innerHTML = `使用了自定义Loader; Author: ${author}`
  }
}
</script>
<style lang="scss">
.container {
    text-align: center;
    header {
        font-size: 22px;
        color: #d33;
    }
}
</style>
```

效果如下

<img src="./../static/image/code/loader.png" >

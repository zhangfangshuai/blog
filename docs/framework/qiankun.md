#### 微前端 之 qiankun

### 微前端简介
&emsp; 微前端不是一门技术，它是一种整合了技术策略、架构思维的方法论/架构模型。可以使用脚手架，插件，规范约束等方案实现，是一种宏观上的架构层面、思想层面上的东西

##### 为了解决什么问题

- 大型项目（又称巨石项目）在开发迭代后期，老！大！难！
- 多团队开发一个项目，本质上也并不互通，你根本不知道别人在干啥，绝大多数人会选择只做加法
- 各团队开发模块依赖不同，但受个别模块特殊需求被动安装了大依赖包
- 改动一个代码哪怕是一个文字，都需要全部重新构建，耗时长，影响大

##### why not iframe？

&emsp; iframe 最大的特性就是提供了浏览器原生的硬隔离方案，不论是样式隔离、js 隔离这类问题统统都能被完美解决。但他的最大问题也在于他的隔离性无法被突破，导致应用间上下文无法被共享，随之带来的开发体验、产品体验的问题，总结有下几点：
- URL不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
- UI不同步，样式割裂，iframe 会导致诸如 Dialog 这样子的全局蒙层仅在 ifame 区块内展示，使我们系统更像是“拼凑”出来的。
- 全局上下文完全隔离，内存变量不共享。
- 跨域问题，chrome80 的 samesite 策略会导致 iframe 方案的跨域 cookie  无法带给后端
- 慢！！！性能瓶颈，路由的切换会导致 iframe 内子应用的重新加载，性能堪忧；

<br>

### 微前端类别
微前端主要有三种类别：（1）自由组合模式；（2）Single-spa；（3）去中心化模式
#### 1、自由组合模式
如SystemJs模块化解决方案，更像模块化，在index.html 中用imports 将其他资源引入和使用

```javascript
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.0/dist/system.min.js"><script>
<script type="systemjs-importamp">
{
    // 使用json格式将源码引用进来
    "imports": { "app-one": 'https://...' }
}
</script>
<script>
    // 使用 system 的方式引入具体应用入口文件
    System.import("./index.js")
</script>
```

#### 2、Single-spa（[中文官网](https://zh-hans.single-spa.js.org/)）微前端解决方案：如Qiankun

提供基座（主应用），配合配置中心配置子应用，子应用在基座的容器中展示，是目前最主流的方案,也是本文讨论重点。

#### 3、去中心化模式

使用webpack5提供的模块联邦 [Module Federation](https://zhuanlan.zhihu.com/p/296233114)
- 每个应用都可以提供资源，形成共享区，类似服务中台的概念
- 运行时代码复用解决方案

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  // other webpack configs...
  plugins: [
    new ModuleFederationPlugin({
      name: "app_one_remote",
      remotes: {
        app_two: "app_two_remote",
        app_three: "app_three_remote"
      },
      exposes: {
        'AppContainer':'./src/App'
      },
      shared: ["react", "react-dom","react-router-dom"]
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      chunks: ["main"]
    })
  ]
}

```

<br>

## Qiankun!
&emsp; 基于Single-spa开发的微前端技术框架，蚂蚁金服内部前端架构的云产品统一接入平台，抽取内核开源而来

以下介绍Qiankun实现微前端的过程

### 主应用

主应用主要充当基座，用于注册和加载子应用。

##### 1、安装qiankun
```bash
npm i qiankun -S
或
yarn add qiankun
```
##### 2、注册及挂载子应用
```javascript
import { registerMicroApps, start } from 'qiankun'
registerMicroApps({
    name: 'micro-app-one', // 自定义名称
    entry: '//one.longfor.com', // 子应用的HTML入口
    container: '#microAppOne', // 挂载的容器
    activeRule: '/subapp/one', // 匹配的路由规则
    props: {} // 主应用给子应用传递的数据
})

start(
    sandbox :{strictStyleIsolation: true}, //开启沙盒环境，用于隔离基座和子应用之间的样式
    prefetch: false // 取消预加载
);

```
?> 总结就是：在主应用中，当匹配到activeRule的时候，请求获取 entry 资源，渲染到 container 中

【注】如果主应用没有路由，则用loadMicroApp来手动加载微应用
```javascript
import { loadMicroApp } from 'qiankun'
loadMicroApp({
    name: 'app',
    entry: '//one.longfor.com',
    container: 'microAppOne'
})
```

#### 3、主应用的子应用容器

与主应用路由同级【推荐】，此策略一般在路由分发的页面插入子应用。
```html
// layout.vue
<template>
    <el-container>
        <el-aside>
            <app-menu></app-menu>
        </el-aside>
        <el-main>
            <router-view></router-view> // 主应用路由渲染出口
            <div id="microAppOne"></div> // 微前端子应用渲染出口
        </el-main>
    <el-container>
</template>
```

另外也可以将子应用放在主应用某个路由页面下，本文不做描述。


### 子应用

qiankun的子应用无需安装额外的依赖，但需要在自己的入口文件导出相应的必要的生命周期钩子，以供主应用在必要时期调用

（1）**渲染之前，bootstrap：**只会在微应用初始化时调用一次，下次微饮用重新进入时会直接调用 mount 钩子。通常可以做全局变量初始化，如不会再 unmount 阶段被销毁的应用级别缓存等

（2）**渲染：mount：**当主应用切入至子应用时调用，触发调用

（3）**销毁：unmount：**子应用被每次被切出时调用，通常会在这里卸载微应用实例，清理路由等信息，<span style="color: red;">如果不及时清理，在多子应用切换时，可能会出现路由来回跳或切不进去的现象</span>

```javascript
// 改造自己的render方法
// props.container 就是基座的微应用出口对应id的容器
function render(props) {
    const { container } = props
    instance = new Vue({
        render: h => h(App)
    }).$mount(container ? container.querySelector('#app') : '#app')
}

export async function bootstrap() {
    const microAppCache = {
        startCount: 0
        ...
    }
}

// 主应用切入时调用
export async function mount(props) {
    render(props) // 改写原生mounted生命周期钩子方法
}

// 当子应用需要独立运行时, 通过__POWER_BY_QIANKUN__判断是否在微前端环境中
if (!window.__POWERD_BY_QIANKUN__) {
    render()
}

export async function unmount(props) {
    instance.$destroy()
    instance.$el.innerHTML = ''
    instance = null
    router = null
}
```

（4）**更新：Updata：**（适用loadMicroApp方式）

```javascript
export async function update(props) {
    console.log('update props', props)
}

```

### 配置打包工具

#### 1、配置webpack

为了让qiankun主应用能正确识别微应用暴露出来的一些信息，微应用的打包工具需要增加配置如下：

```javascript
// package.json
const { name } = require('./package.json')
module.exports = {
    configerWebpack: {
        // 必须打包出一个库文件，格式为umd，以便主应用兼容调用
        output: {
            library: `${name}-[name]`,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${name}` //jsonp方式调用使用
        }
    }
}
```

#### 2、配置跨域
由于主应用匹配到activeRule时，需要去请求获取微应用的资源，子应用需要允许CORS跨域

**本地配置开发环境**
```javascript
// 本地应用代理 - 开发环境
module.exports = {
    devServer: {
        port: 8090,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}
```

**线上Nginx配置**
```bash
// Nginx - 线上环境
location /app-path {
    add_header Access-Control-Allow-Origin $http_origin;
    add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,PATCH,OPTIONS,FETCH;
    add_header Access-Control-Allow-Credentials true;
    add_header Access-Control-Allow-Headers access-control-allow-headers,content-type,access-control-allow-methods,access-control-allow-origin,x-requested-``with``,source,CASTGC,Host,Origin,Referer,Authorization,Cache-Control,If-Modified-Since,User-Agent,Keep-Alive,X-Mx-ReqToken;
    add_header Vary Origin; // 解决微前端跨域请求静态资源失败的问题,Origin丢失问题
    try_files $uri $uri/ /project-path/index.html;
    alias /project-path/;
    index index.html;
    ...
}
```

<br>

### 主微应用通讯与交互

**(1) `lifeCycle` - 主应用监听子应用加载状态**

```javascript
const lifeCycles = {
    beforeLoad: (app) => console.log('before load', app.name),
    beforeMount: (app) => console.log('before mount', app.name),
    afterMount: (app) => console.log('after mount', app.name),
    beforeUnmount: (app) => console.log('before unmount', app.name),
    afterUnmount: (app) => console.log('after unmount', app.name),
}
```

**（2）`apps.props` -子应用获取主应用下发的参数值**
```javascript
// 主应用设置下发的参数
registerMicroApps([
    {
        name: 'app1',
        ...
        props: {
            name: 'app1 param name'
        }
    }
])
// 子应用获取参数
export async function mount(props) {
    console.log('params from frameApp:', props)
}

```
![apps_props](https://img-blog.csdnimg.cn/a702481ea8c743c5a6d18c84f94f4bc0.png)


#### 主微应用的通信模型

&emsp; 通过主应用定义全局状态，返回qiankun生成的通信方法，该方法会在registerMicroApp时通过 props 传给微应用。qiankun内部维护了state状态的变更，我们只需通过官方提供的api进行state的修改、追踪。对于我们主要做两个事情：<br>
1、同步主应用状态变化到微应用；
2、同步微应用状态变化到主应用

**第一步：初始化**

主应用初始化全局状态，并开启状态变化监听通信

```javascript
import { initGlobalState, MicroAppStateActions } from 'qiankun'
// 初始化
const state = { microName: '' }
const actions = initGlobalSatte(state)
actions.onGlobalStateChange((state, preState) => {
    // state: 变更后的状态，preState：变更前的状态
    console.log(state, preState)
}, false) // 第二个参数表示是否立即触发回调

actions.setGlobalState(state)
actions.offGlobalSatteChange()
```

微应用在mount中获取主应用的通信方法

```javascript
export function mount(props) {
    props.onGlobalStateChange((state, preState => {
        // state: 变更后的状态，preState：变更前的状态
        console.log(state, preState)
    })
    props.setGlobalState(state)
}
```

**第二步：微应用新建store/globalStore.js文件**

```javascript
const state = {
    store: {}
}
const getters = {
    iptValue: state => state.store.iptValue
}
const mutations = {
    initStore(state, data) {
        state.store = data
    },
    setStore(state, data) {
        state.store = {
            ...state.store,
            ...data
        }
    }
}
const actions = {}
export default {
    actions,
    getters,
    state,
    mutations,
    modules: {},
    strict: false,
    plugins: []
}
```

**第三步：初始化微应用store，绑定状态同步逻辑**
```javascript
import Store from './store/globalStore'
/**
 * 初始化主微应用通信逻辑
 * 1.主应用状态变更同步到微应用；
 * 2.微应用状态变更同步到主应用；
 */
function initStore(props) {
    const myPlugin = store => {
        let prevState = _.cloneDeep(store.state)
        // 当 store 初始化后调用
        store.subscribe((mutation, state) => {
            // 每次 mutation 之后调用
            let nextState = _.cloneDeep(state)
            if(JSON.stringify(nextState) !== JSON.stringify(prevState)) {
                prevState = nextState
                // 微应用中store变更后，将状态更新到主应用
                props.setGlobalState &&
                props.setGlobalState({...state.store})
            }
        })
    }

    const storeInstance =  new Vuex.Store({
        ...Store,
        plugins: [myPlugin]
    })

    // 主应用状态变化后，同步到微应用
    props.onGlobalStateChange &&
    props.onGlobalStateChange(
          (state, prev) => {
            storeInstance.commit('initStore', state)
            console.log('vue-app onGlobalStateChange', state, prev)
        }, true
    )

    return storeInstance
}
```

**第四步：为vue实例绑定store**
```javascript
function render(props = {}) {
    ...
    store = initStore(props)
    instance = new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount(container ? container.querySelector('#app') : '#app')
}
```

<br>

### 常见问题

##### 1、微应用更新后主应用里访问依旧是旧版本
这是因为应用缓存配置的不合理，需要更改nginx配置协商缓存策略，参考如下
```Nginx
location /path {
  # html文件不缓存
  if ($request_filename ~* .*\.(?:htm|html)$)
  {
    add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
  }
  # 缓存css、js
  if ($request_filename ~* .*\.(?:js|css)$)
  {
    expires 7d;
  }
  # 缓存图片、字体
  if ($request_filename ~* .*\.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|woff2|ttf)$)
  {
    expires 7d;
  }
}
```

##### 2、微应用的样式和主应用产生了冲突
一般情况下不会出现这个问题，但如果真的出现了，需要主子应用遵循应用名称A + BEM策略。

<small style="color: #909399">BEM策略，一种用于前端实现多项目合作可重复组件和代码共享的CSS规范策略</small>

【A】Application: 应用名称
【B】block: 独立的页面即逻辑单元，如下： header 就是block
【E】element: 块中的组成元素，不能脱离块单独存在，如下 title就是 element
【M】modifier: 修饰符，可修饰块，或元素；如下 red-border就是modifier

```html
// BEM style
application_block_element--modifier

// sample
<div class="yts_header">
    <div class="yts_header_title yts_header_title--red-border">
        input invalid
    </div>
</div>
```

##### 微应用打包之后css中的字体文件和图片找不到
&emsp; 原因是qiankun 将外链样式改成了内联样式，但字体文件和背景图片的加载路径是相对路径。而 css 文件一旦打包完成，就无法通过动态修改 publicPath 来修正其中的字体文件和背景图片的路径。那么上诉方案也就无法解决此问题。

有两种解决办法：

（1）对于字体文件，简单的、体积较小的图片借助webpack url-loader转化成base64，大图片将静态资源上床至CDN【建议】，css中直接引用 cdn 地址

```javascript
// vue-cli2
module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|webp|woff2?|eot|ttf|otf)$/i,
                use: [
                    { loader: 'url-loader' , options: {} }
                ]
            }
        ]
    }
}
// vue-cli3
module.exports = {
  chainWebpack: (config) => {
    config.module.rule('fonts').use('url-loader').loader('url-loader').options({}).end();
    config.module.rule('images').use('url-loader').loader('url-loader').options({}).end();
  },
};
```

（2）设置阈值，同样借助webpack能力，小文件使用url-loader转base64，大文件使用file-loader注入路径前缀

```javascript
// vue-cli3
const publicPath = process.env.NODE_ENV === 'production' ? 'https://qiankun.umijs.org/' : `http://localhost:${port}`;
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('fonts'). // 匹配字体文件
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096, // 小于4kb将会被打包成 base64
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash:8].[ext]',
            publicPath,
          },
        },
      })
      .end();
    config.module
      .rule('images')  // 匹配图片文件
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096, // 小于4kb将会被打包成 base64
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]',
            publicPath,
          },
        },
      });
  },
};
```

（3）最省事的方案：将css文件打包到js里面。如果项目较小可以使用
```javascript
module.exports = {
  css: {
    extract: false,
  },
};
```

##### 4、微应用引入的第三方资源，因为跨域问题无法获取
&emsp; 由于qiankun是通过fetch去获取微应用引入的静态资源，必然存在跨域现象，正文中已提及如何去配置子应用的跨域（本地+线上），对于第三方资源如果发生跨域，也需要处理
- 如果是自研的CDN资源包，可以邀请CDN提供团队按相同方案支持跨域
- 如果是网上的第三方资源，可以将资源转化成本地文件，由自己的服务器提供跨域支持

##### 5、微应用加载资源404

&emsp; 这是因为webpack加载资源时没有正确使用publicPath 导致，需要重写webpack运行时publicPath变量为qiankun提供的值
```javascript
__webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
```
【注】如果你的项目在入口文件中使用ES6模块imports 各种资源，请务必在入口文件的最顶部完成publicPath的重写。建议创建文件public-path.js 并在main.js即入口文件顶部 import './public-path.js' 

> [!NOTE]
> runtime publicPath 主要解决的是微应用动态载入的 脚本、样式、图片 等地址不正确的问题。

#### React脚手架配置代理总结

### 背景介绍

本地项目借助webpack-dev-server能力，React脚手架启动了本地前端服务`http://localhost:3000`，需要调用服务器Ajax请求。

前端利用express启动了两个web服务器，服务地址分别为 
`http://localhost:4000`、 `http://localhost:5000`

&emsp;

### 方法一

>在package.json中追加如下配置

```
"proxy": "http://localhost:5000"
```

说明：
1. 优点：配置简单，前端请求资源时可以不加任何前缀
2. 缺点：不能配置多个代理
3. 工作方式：当请求了前端3000服务public下不存在的资源时，那么该请求会转发给5000。（优先匹配前端资源）

&emsp;

### 方法二

##### 1、创建代理配置文件

```
在src下创建配置文件： src/setupProxy.js
```
- 必须在该路径且为该名字，react会在该路径下找到该文件，并给webpack执行。
- 该文件必须是commonJs规范，不能使用ES6规则，因为webpack是在node环境下运行的。

##### 2、编写setupProxy.js配置具体代理规则

```js
// v1.x版本后不能使用 const proxy = require('http-proxy-middleware')，需改成如下
// 为了兼容代码，可以在结构复值时重写一下变量名。
// 推荐与时俱进使用createProxyMiddleware变量名，形成记忆习惯。
const { createProxyMiddleware:proxy } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        proxy('/api', { // 所有带/api前缀的请求，都代理到该服务器，代理配置
            target: 'http://localhost:8080', // 要代理的目标服务器，即转发给谁
            changeOrigin: true, // 控制服务器收到的响应透中的Host字段的值。true-谁发出就是谁即代理服务端口4000，false-始终为原始发起者即前端服务端口3000。
            // 通常changeOrigin都会设置为true，避免服务器做过多的限制。
            pathRewrite: { // 去除请求前缀，保证服务器拿到的是正确的API地址
                '^/api': ''
            }
        }),
        proxy('/proxy4000', {
            target: 'http://localhost:3300',
            changeOrigin: true,
            pathRewrite: {
                '^/proxy4000': ''
            }
        }),
        proxy('/proxy5000', {
            target: 'http://localhost:3500',
            changeOrigin: true,
            pathRewrite: {
                '^/proxy5000': ''
            }
        })
    )
}

```

说明
1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。

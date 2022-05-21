#### API层架构设计

### 实现目标

应该尽可能的避免服务端与业务层直接交互，因为这样服务端设计的很多api path会被引入到业务代码中，很脏乱。因此我们需要设计API层，用来中和这个矛盾。

- 目标文件1： `service.js`
- 功能：二次封装Axios
- 功能要点：
    - 统一处理请求和响应拦截器，接口`token`统一处理
    - 统一处理取消请求控制器
    - 统一处理Axios请求配置
    - 接口层（`http code`）异常统一处理
    - 封装ESM供业务API引用

- 目标文件2： `businessApi.js`
- 功能：业务API实现
- 功能要点：
    - 封装服务端接口，与前端项目解耦
    - 引用`service.js`，封装ESM供页面使用
    - 支持灵活的Axios私有化配置


### 实现路径
关于axios的基本知识、相关特性等，需要了解的同学可以访问 [axios中文官网](http://www.axios-js.com/zh-cn/docs/) 进行了解，本文只给出分装api层的成熟方案

#### `service.js`

```javascript
import axios from 'axios'

// 根据url和请求方式生成url的唯一key
const getUrlKey = config => `SYSTEM_NAME_${config.url}`
const cancelToken = {} // 数组用于储存每个请求的取消函数和请求标识
const CancelToken = axios.CancelToken

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    withCredentials: true, // 跨域携带cookie
    timeout: 8000
})

// 取消被多次发起的请求，保留最后一个
const cancelAjax = (type, config) => {
    const key = getUrlKey(config)
    if (type === 'check') {
        if (!cancelToken[key]) {
            config.cancelToken = new CancelToken((c) => {
                cancelToken[key] = c
            })
        } else {
            cancelToken[key]()
        }
    } else if (type === 'remove') {
        delete cancelToken[key]
    }
}

// 允许多次重复调用的API白名单
const cancelTokenWhiteList = []
// 无需校验token的白名单
const checkTokenWhiteList = [
    '/login'
]

// request interceptor
service.interceptors.request.use((config) => {
    if (!cancelTokenWhiteList.includes(config.url)) {
        cancelAjax('check', config)
    }
    // 统一添加token
    if (!checkTokenWhiteList.includes(config.url)) {
        if (getTokenBySession()) {
            config.headers['token'] = getTokenBySession()
        } else {
            // to login
            // 这里要用vue调用，需要再main.js文件，将vue导出 export default vue。
            // 然后再本文件引入
            vue.$router.push('/login')
        }
    }
    return config
}, err => {
    console.log('request intercepter err:' + err) // 打印错误
    return Promise.reject(err)
})

// response interceptor
service.interceptors.response.use(
    async response => {
        cancelAjax('remove', response.config)
        // 检测当前用户信息与SSO信息是否一致
        response.headers.account && checkAccount(response)
        const res = response.data
        // 业务Code为200-成功
        if (res.code !== 200 && res.code !== '200') {
            try {
                // 403 用户越权访问
                if (res.code === 403 || res.code === '403') {
                    const query = parseUrl(window.location.href) || {}
                    router.push({ path: '/403', query })
                } else {
                    // 防止过多访问
                    if (!window.MessageShow) {
                        window.MessageShow = true
                        Message({
                            message: res.message || 'Error',
                            type: 'error',
                            duration: 2 * 1000,
                            onClose: () => {
                                window.MessageShow = false
                            }
                        })
                    }
                }
                return Promise.reject(new Error(res.message || 'Error'))
            } catch (err) {
                console.log('response interceptor处理异常业务时发生错误', err)
            }
        } else {
            return res.data
        }
    },
    err => {
        console.log('response intercepter err: ' + err) // 打印错误
        if (err && err.response) {
            const query = parseUrl(window.location.href) || {}
            switch (Number(err.response.status)) {
            case 401:
                // 在云图梭内运行
                err.message = err.response.data.msg || '登录信息已失效，请您重新登录'
                window.location.href = err.response.data.loginUrl
                break
            case 403:
                router.push({ path: '/403', query })
                break
            case 404:
                router.push({ path: '/404', query })
                break
            default:
                window.failPageUrl = window.location.href
                router.push({ path: '/500', query })
            }
        }
        if (err.toString().indexOf('timeout') !== -1) {
            Message({
                message: '您当前网络较差，请切换网络活稍后重试！',
                type: 'error',
                duration: 2 * 1000
            })
        }
        return Promise.reject(err)
    }
)

export default service
```

<br>

#### `businessApi.js`

```js
import service from './service.js'

// get request
export function getApi(params) {
    return service({
        url: '/api/get/getApi',
        methods: 'get',
        params
    })
}

// post request
export function postApi(data) {
    return service({
        url: '/api/post/postApi',
        methods: 'post',
        data
    })
}
```


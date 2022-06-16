# 指南
本文为基础指南，更多编写语法请参见Navbar: <kbd>Help</kbd> ---> <kbd>markdown</kbd>

!> docsify的md文档编写依赖markdown语法


## 二级目录
bash命令示例
```Bash
npm install docsify-demo
```

### 三级目录
Javascript代码示例
```Javascript
// 防抖函数 (本案例利用闭包实现，这样无需再antiShake外部定义timeout变量)
function antiShake(fn, wait) {
    let timeout = null
    return args => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(fn, wait)
    }
}
```

### 忽略标题 <!-- {docsify-ignore} -->
本标题只在文档中显示，不在左侧目录中显示

#### 四级标题
在index.html页面我配置了只显示三级目录，因此四级及以上目录不在左侧导航栏显示

##### 五级标题
无序列表示例
- 列表项1
- 列表项2
- 列表项3

有序列表示例
1. 列表项1
2. 列表项2
3. 列表项3

文字加粗示例
> br 代表换行
<br/> 

**加粗文字**

###### 六级标题

## 二级目录
bash命令示例
```Json
josn = {
    "a": 1,
    "b": 2
}
```
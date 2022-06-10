#### ES6字符串增强的方法

- `.includes()`：指定字符串是否在原字符串中。
- `.startsWith()`：指定字符串是否在原字符串头部。支持第二个参数，表示检索开始位置
- `.endsWith()`：指定字符串是否在原字符串尾部。支持第二个参数，表示前N个字符
- `.repeat()`；将指定字符串重复n次。
- `.padStart()`；使用指定字符串在原字符串首部补齐，如果超出截取部分补齐字符串。
- `.padEnd()`；使用指定字符串在原字符串尾部补齐，如果超出截取部分补齐字符串。
- `.trimStart()/.trimLeft()`；删除字符串首部的空格、换行符、tab符。
- `.trimEnd()/.trimRight()`删除字符串尾部的空格、换行符、tab符。
- `.replaceAll()`；匹配替换全部
- `.at()`；根据索引取值


> 新增的方法均为字符串实例下的方法

&emsp;
#### 使用
##### 字符的Unicode表示法
ES6允许采用\uxxxx形式表示一个字符，其中：`\u` 为unicode的识别码，`xxxx`表示码点  <br/>
只限于码点在\u0000~\uFFFF之间的字符，超出的如五位的请使用{}括起来。
```javascript
let strUnicode = '\u5F20\u82B3\u5E05'
console.log(strUnicode) // 张芳帅
```

##### 模版字符串
使用反引号标识 <br/>
可用作普通字符串，换行字符串，嵌入变量字符串 <br/>
换行字符串所有的空格和换行符都将被保留。常用作input-placeholder里的多行描述。<br>
```javascript
let moduleStr = `我是第一行
我是第二行`
console.log(moduleStr)
```
&emsp;

### `include`、`startsWith`、`endsWith`
1、`.includes()`：指定字符串是否在原字符串中。支持第二个参数<br>
2、`.startsWith()`: 指定字符串是否在原字符串中。支持第二个参数，表示检索的开始位置 <br>
3、`.endsWith()`：指定字符串是否在原字符串尾部。支持第二个参数，表示前N个字符

```javascript
let s = 'hello world'
s.startsWith('hel')  // true
s.endsWith('ld') // true
s.includes('o wo')  // true

s.startsWith('llo', 2)  // true  
s.endsWith('llo', 5)  // true   前五个字符中以llo结尾
```

### `repeat`
将原字符串重复n次。返回新值，不改变自身 <br>
n传入正整数。传入小数直接被舍去取整，传入负数或infinity报错。注，-1～0的小数不报错，当作0处理
```javascript
let demoStr = 'ou'
demoStr.repeat(3)  // 'ououou'
console.log(demoStr) // ‘ou’
```

### `padStart`、`padEnd`
1、 `.padStart()`；使用指定字符串在原字符串首部补齐，如果超出截取部分补齐字符串。<br>
2、 `.padEnd()`；使用指定字符串在原字符串尾部补齐，如果超出截取部分补齐字符串。 
```javascript
let padStr = 'string'
padStr.padStart(10, 'x') // 'xxxxstring'
padStr.padEnd(10, 'y') // stringyyyy
// 常用做指定格式提示
'12'.padStart(10, 'YYYY-MM-DD') // YYYY-MM-12
'09-12'.padStart(10, 'YYYY-MM-DD') // YYYY-09-12
```

### `trimStart`、`trimEnd`
1、 `.trimStart()`：同`.trimLeft()`，删除字符串首部的空格、换行符、tab符。
2、 `.trimEnd()`：同`.trimRight()`，删除字符串尾部的空格、换行符、tab符。
3、`trim()`：-ES5,前后都删除
```javascript
let trimStr = '  abc  '
trimStr.trimStart() // 'abc  '
trimStr.trimEnd() // '  abc'
```

### `replaceAll`
1、`replace()`：替换所有的匹配，第二个参数可以接受一个函数
2、`replace()`：ES5，仅匹配第一个,需要全替换需正则支持
```javascript
let replaceStr = 'aabbcc'
let rep = replaceStr.replace('b', '_') // 'aa_bcc'
let repReg = replaceStr.replace(/b/g, '_') // 'aa__cc'
let repAll = replaceStr.replaceAll('b', '_') // 'aa__cc'
let repAllFn = replaceStr.replaceAll('b', () => '_') // 'aa__cc'
```


### `at`
索引取值 <br/>
参数为正整数指从前往后查找，参数为负指从后往前查找
```javascript
let atStr = 'handsome'
atStr.at(2) // n
atStr.at(-2) // m
```

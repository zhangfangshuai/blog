#### ES6数值增强的方法

1、Number的增强
- `Number.isFinite()`：判断是否为有限数值
- `Number.isNaN()`：判断是否为NaN
- `Number.parseInt()`： 同 parseInt() 方法
- `Number.parseFloat()`： 同parseFloat() 方法
- `Number.isInteger()`：判断是否为整数
- `Number.EPSILON`：允许的最小误差范围，用来解决js浮点数运算存在误差的问题 <br>

2、Math的增强
- `Math.trunc()`：去除一个数的小数部分，返回整数部分，非四舍五入。
- `Math.sign()`：判断一个数是正数、负数、还是0
- `Math.cbrt()`：计算一个数的立方根
- `Math.hypot()`：返回所有参数的平方和的平方根
- ... <br>

3、BigInt - JS的第八种数据类型

<br>

?>Number新增的方法均为`Number`构造函数下的方法，一是为了提高js的易用性。二是移植部分全局方法，逐步减少全局方法，使得js更加模块化

&emsp;
#### 使用
### `Number.isFinite()`
检查数值是否时有限的，即不是infinite。如果不是数值类型，一律返回false
```javascript
Number.isFinite(15)  // true
Number.isFinite(0.8) // true
Number.isFinite('15') // false
Number.isFinite(NaN)  // false
Number.isFinite(Infinity) // false
isFinite('15') // true - 传统的全局方法isFinite会默认调用Number()方法非数值类型转化为数值再判断
```

### `Number.isNaN()`
检查数值是否时有限的，即不是infinite。如果不是数值类型，一律返回false
```javascript
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(false)  // false
isNaN('NaN') // true - 传统的全局方法isNaN会默认调用Number()方法非数值类型转化为数值再判断
```

### `Number.parseInt()`、`Number.parseFloat()`
同全局方法parseInt(), 逐步减少全局方法
```javascript
Number.parseInt(12.23) // 12
Number.parseInt('12.23') // 12
Number.parseFloat('12.45')  // 12.45
Number.parseFloat('12.34bNumber43') // 12.34
Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true
```

### `Number.isInteger()`
判断是否为整数; <br>
当精度大于52个二进制位，即16位十进制位时，可能发生误判。原因是js存在最大精度，见下例子
```javascript
Number.parseInt(12.23) // 12
Number.parseInt('12.23') // 12
Number.parseFloat('12.45')  // 12.45
Number.parseFloat('12.34bNumber43') // 12.34
Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true
```


### `Number.EPSILON`
一个极小的常量。js所能表示的最小常量浮点数 <br>
是一个属性，而不是方法，常用来设置能够接受的误差范围
```javascript
let jsNum = 0.1 + 0.2
console.log(jsNum); // 0.30000000000000004 - js浮点数计算导致
console.log(0.1 + 0.2 === 0.3)  // false
Number.EPSILON === Math.pow(2, -52)  // true

// 用Number.EPSILON解决误差问题, 一般设置为误差小于Number.EPSILON * Math.pow(2, 2)即认为两个数相等
 function withinErrorMargin(left, right) {
    return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2)
}
withinErrorMargin(0.1 + 0.2, 0.3)  // true
```


### `Number.isSafeInteger()`
安全整数 <br>
安全整数范围 -2^53 到 2^53 之间，超过后，JS即无法精确表示 <br>
最大安全整数 `Number.MAX_SAFE_INTEGER` <br>
最小安全整数 `Number.MIN_SAFE_INTEGER` <br>
如果业务代码请求参数超过最大安全整数，请协商转字符串、或BigInt等方式处理 <br>
```javascript
// 超过安全整数范围JS就无法正确判定
Math.pow(2, 53) === Math.pow(2, 53) + 1  // true
Number.MAX_SAFE_INTEGER === 9007199254740991  // true
Number.MIN_SAFE_INTEGER === -9007199254740991 // true
let num = 12345
Number.isSafeInteger(num) // true - 判断num是否落在最大安全整数和最小安全整数之间
```
&emsp; <br>
#### Math对象的扩展
!> 以下列出可能用到的几个，更多的如32位浮点数运算方法、对数运算方法、双曲函数方法等，感兴趣的可以自己查询
### `Math.trunc()`
去除一个数的小数部分，返回整数部分；小数部分是直接删除，而不是四舍五入
```javascript
Math.trunc(4.1) // 4
Math.trunc(4.8) // 4
Math.trunc(-4.6) // 4
Math.trunc(-0.34981) // 0
Math.trunc('125.233') // 125 - 非数值部分，会先调用Number()转为数值
Math.trunc('foo') // NaN - 空值，非数值，无法截取类型，返回NaN
// 实现原理
Math.trunc = Math.trunc || function(x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
}
```

### `Math.sign()`
判断一个数是正数、负数、还是0；对于非数值，先调用`Number()`转为数值再进行判断
```javascript
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN
// 实现原理
Math.sign = Math.sign || function(x) {
    x = +x; // convert to a number
    if (x === 0 || isNaN(x)) {
        return x;
    }
    return x > 0 ? 1 : -1;
}
```

### `Math.cbrt()`
计算一个数的立方根；对于非数值，先调用`Number()`转为数值再进行判断
```javascript
Math.cbrt(-1) // -1
Math.cbrt(0) // 0
Math.cbrt(27) // 3
Math.cbrt('8') // 2
Math.cbrt('hello') // NaN
// 实现原理
Math.cbrt = Math.cbrt || function(x) {
    let y = Math.pow(Math.abs(x), 1/3)
    return x < 0 ? -y : y;
}
```

### `Math.hypot()`
返回所有参数的平方和的平方根，用于类似勾股定理的计算逻辑
```javascript
Math.hypot(3, 4);  // 5  3^2 + 4^2 = 5^2
```

&emsp; <br>
### BigInt数据类型
!> BigInt是JS的第八种数据类型，用于解决js无法精确表示大于2^53的数，即最大安全整数；

BigInt没有位数的限制，任何位数的整数都可以精确表示。<br>
为了与 Number 类型区别，BigInt 类型的数据必须添加后缀n
```javascript
Math.pow(2, 53) === Math.pow(2, 53) + 1  // true
Math.pow(2, 1024) // Infinity
const a = 2172141653n // BigInt-添加后缀n
const b = 15346349309n // BigInt-添加后缀n
console.log(a * b) // 33334444555566667777n
console.log(a * b > Number.MAX_SAFE_INTEGER) // true
// 普通整型数据无法保持精度
console.log(Number(a) * Number(b)) // 33334444555566670000
// 对BigInt进行转换也无法保持进度
console.log(Number(a * b)) // 33334444555566670000
console.log(typeof a) // bigint
```

### BigInt函数
!> Bigint函数不是BigInt数据类型的构造函数！！！

它与Number()类似，用于将普通Integer类型、字符串数值转换为BigInt类型数据。 <br>
必须要有且是可以正常转为数值的参数 <br>
只针对整型数据，不支持小数 <br>
支持于Boolean进行互相转换
```javascript
BigInt(123) // 123n
BigInt('123') // 123n
BigInt(false) // 0n
BigInt(true) // 1n

new BigInt() // TypeError - 不是构造函数，不能实例化，函数必须要有参数
BigInt('123n') // SyntaxError - BigInt的n不是手动加的
BigInt(1.5) // RangeError - 只针对整形数据，不支持小数

// 继承了 Object的两个实例方法
BigInt.prototype.toString()
BigInt.prototype.valueOf()
// 继承了Number对象一个实例方法
BigInt.prototype.toLocaleString()
```

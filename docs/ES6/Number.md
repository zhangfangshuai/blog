#### ES6数值增强的方法

- `Number.isFinite()`：判断是否为有限数值
- `Number.isNaN()`：判断是否为NaN
- `Number.parseInt()`： 同 parseInt() 方法
- `Number.parseFloat()`： 同parseFloat() 方法
- `Number.isInteger()`: 判断是否为整数
- `Number.EPSILON`: 允许的最小误差范围，用来解决js浮点数运算存在误差的问题


>新增的方法均为`Number`构造函数下的方法，一是为了提高js的易用性。二是移植部分全局方法，逐步减少全局方法，使得js更加模块化

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
&emsp;

### `Number.isNaN()`
检查数值是否时有限的，即不是infinite。如果不是数值类型，一律返回false
```javascript
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(false)  // false
isNaN('NaN') // true - 传统的全局方法isNaN会默认调用Number()方法非数值类型转化为数值再判断
```
&emsp;

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
&emsp;

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
安全整数
安全整数范围 -2^53 到 2^53 之间，超过后，JS即无法精确表示
最大安全整数 `Number.MAX_SAFE_INTEGER`
最小安全整数 `Number.MIN_SAFE_INTEGER`
```javascript
// 超过安全整数范围JS就无法正确判定
Math.pow(2, 53) === Math.pow(2, 53) + 1  // true
```


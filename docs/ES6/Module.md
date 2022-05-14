#### ES6模块-Module

历史上，JS一直缺少模块体系，也就是无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来的策略。其他语言如Ruby由`require`、Python有`import`，甚至连CSS都有`@import`.

ES6之前，社区的模块加载方案，主要有 CommonJS 和 AMD 两种策略。前者用于服务器，后者用于浏览器。

由于 CommonJS 和 AMD 都只能在 **运行时** 确定模块所需要的依赖关系，比如 CommonJS就是对象，导入时必须查找对象属性。它本质上是加载了整个对象的所有方法，然后从中导入取出所需的指定方法。这种策略没办法在 **编译时** 做“静态优化”
```js
// CommonJS模块
let { stat } = require('fs');

// 等同于
let _fs = require('fs');  // fs模块所有方法已经加载
let stat = _fs.stat;
```

ES6实现了模块化，且非常简单，能成为服务器和浏览器通用模块解决方案。与CommonJS模块不同的是，ES6模块不是对象，而是通过`export`显式的指定输出代码，再通过`import`命令输入。
```js
// ES6模块
import { stat, exists } from 'fs'
```
以上实质是从`fs`模块加载了3个方法，其他方法不加载。这种加载称做 **“编译时加载”** 或 **静态加载**。即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。


除了静态加载带来的各种好处，ES6 模块还有以下好处。

- 不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
- 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者`navigator`对象的属性。
- 不再需要对象作为命名空间（比如`Math`对象），未来这些功能可以通过模块提供。

<br>

### 严格模式  <!-- {docsify-ignore} -->

ES6模块自动采用严格模式，不论你有没有在文件头部加上`“use strict”`
关于严格模式的限制，可以阅读[use_strict](/JS_basic/usr_strict)一文，这里特别提醒：尤其需要注意`this`的限制。ES6 模块之中，顶层的`this`指向`undefined`，即不应该在顶层代码使用`this`。

<br>

### `export`命令

模块功能主要由两个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量。

```js
// 写法一
export const firstName = 'zhang'
export const lastName = 'fs'
export function getName() { return `${firstName} ${lastName}`  }

// 写法二 - 优先考虑
const firstName = 'zhang'
const lastName = 'fs'
function getName() { return `${firstName}${lastName}`  }
export { firstName, lastName, getName }
```

可以使用 <strong> `as` </strong> 来对要导出的变量重命名
```js
export { getName as getFullName }
```

`export`必须导出对外提供的接口，不能是`10`这种显性的值，如 `export 10`，应改成`export var num = 10`，这里对外接口是`num`


?> `export`命令可以出现在模块的任意处，只要处于模块顶层就可以。不能出现在函数内部等位置。


<br>

### `import`命令
使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块。需要注意的是，导入进来的接口，是不允许被修改的。一种场景例外，如果接口是对象，允许改写属性。

?>`import`命令具有提升效果，会提升到整个模块的头部，首先执行。

```js
import { firstName, lastName, getName } from './profile.js'
```
`import`也可以使用**`as`**来重命名
```js
import { getName as getFullName } from './profile.js'
```
!>由于ES模块是静态加载的，因此`import`内不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构，编译时无法完成计算
```js
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

!> ES6模块`import` 执行在静态解析编译阶段，CommonJS`require`执行在运行阶段，`import`比`require`执行的更早一些。因此在混用两种模块化方案，时，不能有 `import` 依赖 `require` 的情况


<br>

### 模块整体加载 <!-- {docsify-ignore} -->

ES6的模块不是一个对象，因此无法通过`import`模块名来导入整个模块，但是可以通过 **星号**`*`指定一个对象，所有输出的值都会加载在这个对象上。

```js
import { firstName, lastName, getName } from './profile.js'
// 可以写成
import * as profile from './profile.js'

// 使用时
console.log(profile.getName)  // zhangfs
```


<br>

### `export default`

用于指定模块默认输出的变量，它的含义是：**将某个要导出的变量赋值给`default`**。 需要注意的是，这时`import`命令后面，不使用大括号。

如果`export default`的是匿名变量时，则`import`时名字可以随便取。

!> 一个模块只能有一个默认输出

```js
// export-default.js
export default function foo() {
  console.log('foo');
}

// 或者写成

function foo() {
  console.log('foo');
}

export default foo;
```

同时引入带有`default`变量和普通变量
```js
import _, { each, forEach } from 'lodash';
```


---
<br>


### `import()`函数

`import()`函数 与 `import`命令的主要区别是：<br>
`import`命令是静态加载的，因此无法加入一些运行时才能得到的结果，如表达式和变量。另外，`import`命令具有提升效果，无法在条件判断中导入特定模块 <br>
`import()`函数 正是为了解决这个问题而提出的，由ES2020提案引入。它支持动态加载模块，同时也是为了替代Node的`require`运行时加载所特有的能力而做的弥补。

`import()`返回一个 Promise 对象，加载模块成功以后，这个模块会作为一个对象，当作`then`方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。

```js
import('./myModule.js')
.then(({export1, export2}) => {
  // ...·
});
```


#### 适用场景
##### 1、按需加载

在需要的时候，再加载某个模块

```js
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```

##### 2、条件加载
`import()`可以放在`if`代码块，根据不同的情况，加载不同的模块。

```
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```

##### 3、动态模块路径
`import()`允许模块路径动态生成。

```js
import(getImportUrl())
.then(...);
```

<br>

### 作为html的script引入

浏览器加载 ES6 模块，也使用`<script>`标签，但是要加入`type="module"`属性。浏览器对该标签是异步加载的，效果等同于`defer`属性，【[defer于async用法与区别](/JS_basic/defer、async)】，即等到整个页面渲染完，再执行脚本。
```js
<script type="module" src="./foo.js"></script>
// 等同于
<script type="module" src="./foo.js" defer></script>
```
当然也可以添加`async`属性，那么将默认走async加载逻辑.

<br>

### ES6模块与CommonJS模块区别
它们有三个重大差异：
1. **CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的<font style="color: red">引用</font>。**
2. **CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。**
3. **CommonJS 模块的`require()`是同步加载模块，ES6 模块的`import`命令是异步加载，有一个独立的模块依赖的解析阶段。**

对于CommoonJS模块，当页面`require()`了一个值之后，这个值就不再受内部变化所影响
```js
// lib.js
var counter = 3;
function incCounter() {
    counter++;
}
module.exports = {
    counter: counter,
    incCounter: incCounter,
};
```
```js
// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3 - 不受影响，因为是值的拷贝
```


而ES6模块机制则不同，JS 引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。

```js
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```


!> 因为ES6的模块，输出的是值的引用，因此具备引用数据类型的特性。当不同的脚本加载这个模块，得到的都是同一个值，当有某个脚本对其进行更新时，将会作用到其他脚本去



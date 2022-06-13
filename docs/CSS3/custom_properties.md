#### 使用CSS自定义属性（变量）


自定义属性，又称称作CSS变量或者级联变量，它包含的值可以在整个文档中重复使用。

兼容性

<br>

### 基本用法

#### 1. 定义
声明一个自定义属性，属性名需要以两个减号（`--`）开始，属性值则可以是任何有效的 CSS 值。和其他属性一样，自定义属性也是写在规则集之内的，如下：

```css
element {
  --main-bg-color: #F5F5F5;
}
```

规则集所指定的选择器定义了自定义属性的可见作用域。通常的最佳实践是定义在根伪类 `:root` 下，这样就可以在 HTML 文档的任何地方访问到它。

而这条规则不是绝对的，如果有理由去限制你的自定义属性，那么就应该限制。

```css
:root {
  --main-bg-color: #F5F5F5;
}
```

!> 注意：自定义属性名是大小写敏感的，`--my-color` 和 `--My-color` 会被认为是两个不同的自定义属性。


#### 2. 使用

使用一个局部变量时用 `var()` 函数包裹以表示一个合法的属性值：

```css
element {
  background-color: var(--main-bg-color);
}
```

<br>

### 属性继承

自定义属性会继承。这意味着如果在一个给定的元素上，没有为这个自定义属性设置值，在其父元素上的值会被使用。

```html
<div class="one">
  <div class="two">
    <div class="three"></div>
    <div class="four"></div>
  </div>
</div>
```

定义如下CSS3

```css
.two {
  --font-size: 10px;
}

.three {
  --font-size: 1.2em;
}
```

在这个情况下， `var(--font-size)` 的结果分别是：

- 对于元素 `class="two"` ：`10px`
- 对于元素 `class="three"` ：`2em`
- 对于元素 `class="four"` ：`10px` （继承自父属性）
- 对于元素 `class="one"` ：`非法值`，会变成自定义属性的默认值（css的默认值如`color`默认值为`black`）

!> 注意，这些是自定义属性的值仅当需要的时候才会计算，且并不会按其他规则进行保存


### 设置备用值

给 `var()` 函数接受第二个参数，表示备用值，当给定值未定义或无效时备用值生效。不接受第三个参数。第二个参数也可以是`var()`函数，继续接受第二个参数嵌套定义。

?>备用值并不能用做实现浏览器兼容性，也解决不了兼容性问题，仅是`var()`函数自己的特性。

```css
.custom {
    color: var(--my-color, red)
}

.custom-nest {
    color: var(--my-color, var(--my-color-back, pink))
}

/* 错误用法 */
.custom-nest {
    color: var(--my-color, var(--my-color-back), pink)
}
```

<br>

### 无效值

当浏览器遇到无效的 `var()` 时，会使用继承值或初始值代替，这点与普通CSS不同

```css
:root { --text-color: 16px; }
p { color: blue; }
p { color: var(--text-color); }
```

以上，浏览器将 `--text-color` 的值替换给了 `var(--text-color)`，但是 `16px` 并不是 `color` 的合法属性值。因此根据规则，<br>
（1）查找是否有可继承的来自父级的自定义属性`--text-color`，显然本例没有 <br>
（2）查找是否有备用的值，即`var()`函数的第二个参数，显然本例没有 <br>
（3）将该值设置为CSS默认的初始值。如`black`。

本例第二行虽然有定义`<p>`标签的`color`样式，但被第三行的定义所覆盖

!> 注意：当 CSS 属性 - 值对中存在语法错误，该行则会被忽略。然而如果自定义属性的值无效，它并不会被忽略，从而会导致该值被覆盖为默认值。



<br>

### JS获取

在 JavaScript 中获取或者修改 CSS  变量和操作普通 CSS 属性是一样的：

```javascript
// 获取一个 Dom 节点上的 CSS 变量
element.style.getPropertyValue("--my-var");

// 获取任意 Dom 节点上的 CSS 变量
getComputedStyle(element).getPropertyValue("--my-var");

// 修改一个 Dom 节点上的 CSS 变量
element.style.setProperty("--my-var", jsVar + 4);
```

?> 自定义属性的前缀 var- 是早期标准规定的，后期改为了 --

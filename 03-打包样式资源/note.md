## 创建 src/index.js文件 和 src/index.css

```css
/* src/index.css */

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: pink;
}
```

```js
// src/index.js

// 引入样式资源
import './index.css'
```

webpack只可以识别打包js和json资源，像这样直接引入样式资源是打包不成功的，所以需要用到前边说的<font color="FF0000">loader</font>，通过配置loader使得webpack可以识别打包更多的模块。

## 创建 webpack.config.js 文件

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

webpack.config.js 文件是 webpack 的配置文件。指示 webpack 干哪些活（当运行 webpack 指令时，会加载这里的配置）

所有的构建工具都是基于Node平台运行的 ~~ 模块化默认采用commonjs(项目代码使用的是 ES6 的模块化)

```js
const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    // 打包输出的文件名称
    filename: 'built.js',
    // __dirname是nodejs的变量，代表当前文件的目录绝对路径
    // 打包输出的路径
    path: resolve(__dirname, 'build'),
  },
  // loader 配置
  module: {
    rules: [
      // 详细的loader配置
      {
        // 匹配哪些文件(test 字段的值千万不可加引号)
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          /**
           * use数组中的loader执行顺序：从右到左（或者这个格式下的从下到上）依次执行
           * 
           * 这里的包 webpack 在本级目录下找不到会到上级目录中找
           */
          // 创建style标签，将js中的样式资源插入，并添加到header中生效
          'style-loader',
          // 将css文件变成commonjs模块加载到js中，里边的内容是样式字符串
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    // 详细的plugins配置
  ],
  mode: 'development',
  // mode: 'production'
}
```

执行 `webpack` 命令进行打包，可以成功将 css 文件打包。

## 创建 src/index.less 文件

```css
#title {
  color: aqua;
}
```

将 index.less 文件引入 index.js 中。使用 `webpack` 命令打包，报错。需要下载 `less-loader` 和 `less` 包，并在 webpack.config.js 文件中配置 less 文件对应的 loader

## 修改 webpack.config.js 文件

添加 less 的 loader 配置

```js
/**
 * webpack.config.js  webpack的配置文件
 *  作用：指示 webpack 干那些活（当运行 webpack 指令时，会加载这里的配置）
 * 
 * 
 * 所有的构建工具都是基于Node平台运行的 ~~ 模块化默认才用commonjs(项目代码使用的是 ES6 的模块化)
 */

const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    // __dirname是nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build'),
  },
  // loader 配置
  module: {
    rules: [
      // 详细的loader配置
      {
        // 匹配哪些文件(test 字段的值千万不可加引号)
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          /**
           * use数组中的loader执行顺序：从右到左（或者这个格式下的从下到上）依次执行
           * 
           * 这里的包 webpack 在本级目录下找不到会到上级目录中找
           */
          // 创建style标签，将js中的样式资源插入，并添加到header中生效
          'style-loader',
          // 将css文件编程commonjs模块加载到js中，里边的内容是样式字符串
          'css-loader'
        ]
      },
      // 不同文件需要配置不同的loader
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // 详细的plugins配置
  ],
  mode: 'development',
  // mode: 'production'
}
```

使用 `webpack` 命令可以成功打包。

## 新建 src/index.html 文件

引入打包成功后的文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1 id="title">webpack</h1>

  <!-- 引入解析打包后的文件 -->
  <script src="../build/built.js"></script>
</body>
</html>
```

在浏览器中打开页面，index.css 及 index.less 文件的样式成功添加。

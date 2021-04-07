## 创建 src/index.js 文件

```js
function add(x, y) {
  return x + y;
}

console.log(add(2, 3));
```

## 创建 src/index.html 文件

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
  <h1>Webpack</h1>
</body>
</html>
```

## 创建 webpack.config.js 文件

打包 html 文件，需要用到 html-webpack-plugin 插件

> 区别于loader的配置：
> 
>    loader: 安装 ==> 使用(在配置文件中配置)
> 
>    plugin: 安装 ==> <font color="ff0000">引入</font> ==> 使用

```js
const { resolve } = require('path')
// 引入
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // loader 配置
    ]
  },
  plugins: [
    // plugin 配置
    // 这里需要用到 html-webpack-plugin 插件
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}
```

使用 `webpack` 命令打包，发现在 build 文件下除了打包好的 built.js 文件还有一个 html 文件。查看 html 文件，其中自动引入了打包好的 built.js 文件。

在之前的学习中都是自己创建 index.html ，<font color="ff0000">打包后手动</font>将 built.js 文件引入。使用了 html-webpack-plugin 插件后，他在打包后会自动生成一个 html 模板，并自动将打包后的文件引入。但是由插件自动生成的 html 文件，没有额外的元素。如果想在有元素的 html 文件中自动引入打包文件。则需要在 webpack.config.js 文件中对 html-webpack-plugin 进行配置

将前边手动创建的 index.html 作为模板配置给 html-webpack-plugin 的 template 属性。

```js
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // loader 配置
    ]
  },
  plugins: [
    // plugin 配置
    // 这里需要用到 html-webpack-plugin 插件
    new HtmlWebpackPlugin(
      {
        template: './src/index.html'
      }
    )
  ],
  mode: 'development'
}
```

使用 `webpack` 打包后，查看 build 文件中生成的 html 文件，发现已经有了手动创建文件中的元素，并自动引入了 built.js 文件。
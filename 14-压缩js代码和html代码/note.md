> 13-js兼容性处理 复制一份

## 压缩 js 代码

压缩 js 代码只需要在 webpack.config.js 中，将 mode 设置为 `production`，之前在 `01-webpack简介` 中放了一张 webpack 在开发环境与生产环境默认配置不同的图，其中webpack在生产环境会自动启用 js 压缩的插件，webpack 5.x 之前是是启用 `uglifyjs-webpack-plugin`，webpack 5.x 之后启用 `terser-webpack-plugin`，所以只需要吧 webpack 设置为生产环境就可以自动压缩 js 代码了。

## 压缩 html 代码

压缩 html 代码只需要为之前引入的 html-webpack-plugin 添加  `minify` 配置

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html
      minify: {
        // 去除空格
        collapseWhitespace: true,
        // 去除注释
        removeComments: true,
      }
    })
  ],
  mode: 'production'
}
```

在 src/index.html 文件中添加一些注释

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>js语法检查</title>
</head>
<body>
  <!-- comments -->
  <h1>eslint语法检查</h1>
</body>
</html>
```

使用 `webpack` 命令打包，查看输出的 build/index.html 文件，成功去掉了空格一级注释。
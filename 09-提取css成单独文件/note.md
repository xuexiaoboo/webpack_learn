> 前边的学习，在打包过程中对于样式文件的处理都是用 `css-loader` 和 `style-loader` 将样式插入到打包的 built.js 文件中,并生成 style 标签插入到页面中。这样会使 built.js 文件<font color="ff0000">体积更大</font>，并可能在加载页面样式的时候发生<font color="ff0000">闪屏</font>的现象。所以这次是使用 `mini-css-extract-plugin` 插件，将 css 文件单独提取出来。

## 创建目录结构

```
-- src
 |
 |--- js
 |  |-- index.js
 |
 |--- style
 | |-- a.css
 | |
 | |-- b.css
 |
 |-- index.html
 |
-- webpack.config.js
```

## 文件内容

### 1. src/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>提取css成单独文件</title>
</head>
<body>
  <div class="box1"></div>
  <div class="box2"></div>
</body>
</html>
```

### 2. src/style/a.css & src/style/b.css

```css
/* a.css */

#box1 {
  height: 100px;
  width: 100px;
  background-color: pink;
}
```

```css
/* b.css */

#box1 {
  height: 200px;
  width: 200px;
  background-color: deeppink;
}
```

### 3. src/js/index.js

```js
import '../style/a.css'
import '../style/b.css'
```

### 4. webpack.config.js

之前打包样式文件使用 `css-loader` 和 `style-loader` 两个 loader，其中 `css-loader` 负责将样式文件打包插入到输出的 built.js 文件中，`style-loader` 负责将 built.js 中的样式字符串抽出并创建 style 标签插入到浏览器打开的页面中（可通过在浏览器打开页面查并看源码）。

这里需要将样式资源单独抽出打包成文件。需要用到 `mini-css-extract-plugin` 插件，在 plugin 中配置抽出的样式资源输出的目录。在处理样式资源的 loader 中用 `MiniCssExtractPlugin.loader` 代替 `style-loader`，将打包输出的样式文件通过 link 标签引入到输出的 index.html 文件中。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolve } = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style/built.css'
    })
  ],
  mode: 'development'
}
```
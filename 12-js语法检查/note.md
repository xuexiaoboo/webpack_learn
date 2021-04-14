## 创建目录结构

```
-- src
 |
 |--- js
 |  |-- index.js
 |
 |-- index.html
 |
-- webpack.config.js
```

## src/js/index.js

格式略微不规范一点，方便打包是查看 eslint 效果

```js


function add (x,y) {
  return x+y;
}

console.log(add(2,3));
```

## src/index.html

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
  <h1>eslint语法检查</h1>
</body>
</html>
```

## webpack.config.js

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
    rules: [
      // 代码检查：eslint，需要使用eslint-loader，eslint-loader依赖eslint库
      // 注意：只对项目源码进行检查，而eslint默认会对项目关联代码都检查，包括 node_modules 中的代码。
      // 设置检查规则：package.json 中 eslintConfig中设置
      // airbnb：eslint-config-airbnb-base    eslint-plugin-import
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'eslint-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}
```

使用 eslint 检查代码需要下载 `eslint`、`eslint-loader`；

这里使用 airbnb 的代码校验规范，需要下载相关 `eslint-config-airbnb-base`、`eslint-plugin-import`。airbnb 具体可到 github 查看，airbnb 对于 eslint 的使用可到[npmjs.com](https://www.npmjs.com)查看，这里选择使用 `eslint-config-airbnb-base`

注意：需要在配置 eslint-loader 时，将 node_modules 排除，eslint-loader 默认检查项目中所有匹配文件。

## package.json

```json
{
  "name": "webpack_learn",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/xuexiaoboo/webpack_learn.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/xuexiaoboo/webpack_learn/issues"
  },
  "homepage": "https://github.com/xuexiaoboo/webpack_learn#readme",
  "devDependencies": {
    "css-loader": "^5.1.3",
    "eslint": "^7.24.0",
    "eslint-config-airbnb-base": "^14.2.1",
    "eslint-loader": "^4.0.2",
    "eslint-plugin-import": "^2.22.1",
    "file-loader": "^6.2.0",
    "html-loader": "^2.1.2",
    "html-webpack-plugin": "^5.3.1",
    "less": "^4.1.1",
    "less-loader": "^8.0.0",
    "mini-css-extract-plugin": "^1.4.1",
    "optimize-css-assets-webpack-plugin": "^5.0.4",
    "postcss-loader": "^5.2.0",
    "postcss-preset-env": "^6.7.0",
    "style-loader": "^2.0.0",
    "url-loader": "^4.1.1",
    "webpack": "^5.28.0",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.11.2"
  },
  "dependencies": {},
  "browserslist": {
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ]
  },
  "eslintConfig": {
    "extends": "airbnb-base"
  }
}
```

使用 `webpack` 打包，可以看到打包失败，并且 eslint 在控制台报出 src/js/index.js 文件中的格式错误。

在 webpack.config.js 中对 eslint-loader 配置

```js
options: {
  fix: true
}
```

这个配置会自动修复 eslint-loader 发现的格式错误，可以通过查看打包后输出的 build/js/built.js 文件查看自动修复结果。

再使用 `webpack` 打包，已经没有格式报错了，但是有一个 warning，提示 console 不推荐使用。可以再 console 的前一行使用 `// eslint-desable-next-line` 让 eslint-loader 不对下一行进行校验，但不推荐使用。

## .eslinttc

除了在 package.json 文件中对 eslint 进行配置，还可以在 package.json 的同级目录下创建 `.eslintrc` 文件进行配置。

```json
// .eslintrc

{
  "extends": "airbnb-base"
}
```
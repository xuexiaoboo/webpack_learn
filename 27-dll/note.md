> 04复制一份

正常情况下，node_modules 中的包会被打包成一个文件，这个打包后的文件体积会很大。而 dll 就会把一些包拆分打包成不同的 chunk 。

## 1.新建 webpack.dll.js 文件(名称任意)

```js
/**
 * 使用 dll 技术，对某些库（第三方库：jquery、vue...）进行单独打包
 *    当运行 webpack 指令时，默认执行的是 webpack.config.js 文件，而现在需要先运行 webpack.dll.js 文件
 *    需要使用: webpack --config webpack.dll.js
 */

const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // key值：最终打包生成的[name] --> jquery
    // value：要单独打包的库
    jquery: ['jquery'],
  },
  output: {
    filename: '[name].dll.js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]', // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    // 打包生成一个 manifest.json 文件，提供和jquery的映射
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json'),
    }),
  ],
  mode: 'production',
};
```

## 2.修改 webpack.config.js 文件

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // loader 配置
    ],
  },
  plugins: [
    // plugin 配置
    // 这里需要用到 html-webpack-plugin 插件
    new HtmlWebpackPlugin(
      {
        template: './src/index.html',
      },
    ),
    // 告诉 webpack 哪些库不参与打包
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json'),
    }),
    // 由于不需要webpack打包这些库，就会导致无法在打包的 html 页面文件依赖中引入
    // 需要插件处理 add-asset-html-webpack-plugin,他会自动将包引入到打包输出的index.html中
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.dll.js'),
      // 必须指定 publicPath，否则引入路径会变成 auto/jquery.dll.js 导致引入文件找不到
      publicPath: '',
    }),
  ],
  mode: 'production',
};
```

注意配置 add-asset-html-webpack-plugin 插件时要设置 publicPath
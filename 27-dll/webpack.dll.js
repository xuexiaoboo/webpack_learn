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

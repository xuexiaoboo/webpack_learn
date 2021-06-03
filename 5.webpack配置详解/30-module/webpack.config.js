const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * module:
 *  exclude    include   enforce: 'pre'/'post'
 */

module.exports = {
  entry: './src/index.js',
  output: {
    // 文件名称（指定名称 + 目录）
    filename: 'js/build.js',
    // 输出文件目录（将来所以资源输出的公共目录）
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // loader 配置
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  mode: 'development',
};

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * entry:
 *  1.string --> './src/index.js' --> 单入口
 *    打包形成一个chunk，输出一个bundle文件,此时chunk名称默认是 main（[name]）
 *
 *  2.array --> ['./src/index.js', './src/add.js'] --> 多入口
 *    所有入口文件最终只会形成一个chunk，输出一个bundle文件（数组中所有的文件会打包到第一个文件中），此时chunk名称默认是 main
 *      --> 一般不使用这种多入口的方式，只有在HMR功能中让html热更新生效时使用~
 *
 *  3.object --> { key: string } --> key 为chunk名称，string 为 入口文件路径 --> 多入口
 *    有n个入口文件,就形成n个chunk，输出n个bundle文件
 */

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  mode: 'development',
};

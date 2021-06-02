const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * output:
 */

module.exports = {
  entry: './src/index.js',
  output: {
    // 文件名称（指定名称 + 目录）
    filename: 'js/build.js',
    // 输出文件目录（将来所以资源输出的公共目录）
    path: resolve(__dirname, 'build'),
    // 所有资源引入的引入公共路径前缀  --> 'imgs/a.jpg' --> '/imgs/a.jpg'
    publicPath: '/',
    chunkFilename: 'js/[name]_chunk.js', // 非入口chunk名称（查看 index.js 中使用 import 导入的 add）
    library: '[name]', // 将打包输出的文件向外暴露一个可引用的名称  --> 一般配合 dll 使用
    libraryTarget: 'window', // 变量名添加到哪里 browser
    // libraryTarget: 'global' // 变量名添加到哪里 node
    // libraryTarget: 'commonjs'
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  mode: 'development',
};

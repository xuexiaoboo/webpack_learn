const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  // entry: {
  //   main: './src/js/index.js',
  //   test: './src/js/test.js',
  // },
  output: {
    // 设置[name]来区分输出的多个bundle文件，这里[name]取 mian 和 test，与上边设置入口名对应
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        // 压缩空格
        collapseWhitespace: true,
        // 去除注释
        removeComments: true,
      },
    }),
  ],
  /**
   * 1.可以将node_modules中的文件单独打包
   * 2.自动分析多入口模式下的chunk中，有没有体积较大的公共文件，会单独打包成一个chunk
   */
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: 'production',
  // mode: 'development',
};

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * module:
 *  exclude    include   enforce: 'pre'/'post'
 */

module.exports = {
  entry: './src/js/index.js',
  output: {
    // 文件名称（指定名称 + 目录）
    filename: 'js/build.js',
    // 输出文件目录（将来所以资源输出的公共目录）
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // loader 配置
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  mode: 'development',
  // 解析模块的规则
  resolve: {
    // 配置解析模块路径别名  就像 Vue 里的 @   --> 可以简写路径，缺点是路径没有提示
    alias: {
      $css: resolve(__dirname, 'src/css'),
    },
    // 配置省略文件路径的后缀名(这里配置省略后缀名的文件文件名千万不能一样)
    extensions: ['.js', 'json'],
    // 告诉 webpack 解析模块是去哪个目录，就不用一层一层的找了
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules'],
  },
};

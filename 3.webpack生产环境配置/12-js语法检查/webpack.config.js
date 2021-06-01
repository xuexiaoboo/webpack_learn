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
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
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
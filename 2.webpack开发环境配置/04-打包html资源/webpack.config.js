const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // loader 配置
    ]
  },
  plugins: [
    // plugin 配置
    // 这里需要用到 html-webpack-plugin 插件
    new HtmlWebpackPlugin(
      {
        template: './src/index.html'
      }
    )
  ],
  mode: 'development'
}
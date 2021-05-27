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

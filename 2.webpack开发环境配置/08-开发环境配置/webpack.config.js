/**
 * 开发环境的配置
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // loader 配置
      {
        // 处理样式资源, 这里以 less 为例
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        // 处理图片资源, 这个配置只能处理样式文件中引入的图片资源，不能处理img标签中的图片
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 20 * 1024,
          name: '[hash:10].[ext]',
          esModule: false,
          outputPath: 'imgs',
        },
      },
      {
        // 这个 loader 的配置可以处理 html 文件中的img标签
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          esModule: false,
        },
      },
      {
        // 处理其他资源
        exclude: /\.(less|html|jpg|png|gif|js|css)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    // plugins 插件配置，切记是数组
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    open: true,
    port: 3000,
  },
};

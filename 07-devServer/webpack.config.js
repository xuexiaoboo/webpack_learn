const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // 打包其他资源的loader
      {
        // 可以使用 test匹配文件，也可以使用exclude去排除文件，然后打包排除剩下的
        exclude: /\.(html|css|js|png)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]'
        }
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 20 * 1024,
          esModule: false,
          name: '[hash:10].[ext]'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          esModule: false
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './src/index.html'
      }
    )
  ],
  mode: 'development',

  // 开发服务器 DevServer：用来自动化（自动编译、自动打开浏览器、自动刷新浏览器~~）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动devServer指令为：npx webpack-dev-server，需要下载 webpack-dev-server 包
  devServer: {
    // 告诉服务器内容的来源。仅在需要提供静态文件时才进行配置。
    // contentBase: resolve(__dirname, 'build'),
    // // 为每个静态文件开启gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开本地默认浏览器
    open: true
  }
}
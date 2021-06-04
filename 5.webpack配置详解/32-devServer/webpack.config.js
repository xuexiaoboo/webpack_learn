const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * devServer
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
  devServer: {
    // 运行代码的目录
    contentBase: resolve(__dirname, 'build'),
    // 监视 contentBase 目录下的所有文件，一旦文件变化就 reload
    watchContentBase: true,
    // 监视文件是只需要监视源代码，需要忽略一些文件
    watchOptions: {
      ignored: /node_modules/,
    },
    compress: true,
    port: 5000,
    host: 'localhost',
    open: true,
    hot: true,
    // 不显示启动服务器日志信息
    clientLogLevel: 'none',
    // 除了一些基本启动信息外，其他内容都不显示
    quiet: true,
    // 如果出错了不要全屏提示
    overlay: false,
    // 服务器代理
    proxy: {
      // 一旦 devServer（5000）服务器接收到  api/xxx  的请求，就会吧请求转发到另一个服务器（3000）
      '/api': {
        target: 'http:/loaclhost: 3000',
        // /api/xxx  --->  /xxx
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};

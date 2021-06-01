const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        // 这个loader配置只能处理url引入的图片资源，处理不了html页面中img标签引入的图片
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        // 配置url-loader，但是需要下载两个loader，url-loader file-loader,url-loader 依赖 file-loader
        // 只使用一个loader的简写
        loader: 'url-loader',
        // loader 的配置
        options: {
          // limit设置需要编译打包的图片最小限制，这里小于20kb就会被base64处理
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：图片体积会变大（文件请求速度更慢）
          // 这里为了学习，一般7，8kb的小图片设置成base64处理
          limit: 20 * 1024,
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是使用commonjs，解析时会出问题
          // 解决：关闭url-loader的es6模块化，使用commonjs解析(在webpack5 中不光要将 url-loader 的 esModule 设置为false，同时需要将html-loader同样进行配置才行)
          esModule: false,
          // 给解析的图片进行重命名
          // [hash:10]  取图片解析后hash的前10位
          // [ext]   取文件的原扩展名
          name: '[hash:10].[ext]',
        },
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img,从而能被url-loader进行处理）
        loader: 'html-loader',
        options: {
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './src/index.html',
      },
    ),
  ],
  mode: 'development',
};

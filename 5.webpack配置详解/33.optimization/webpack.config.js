const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

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
  mode: 'production',
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
  optimization: {
    splitChunks: {
      chunks: 'all',
      /**
       * 都是些默认配置
       */
      // minSize: 30 * 1024, // 分割的chunk最小为30kb
      // maxSize: 0, // 最大没有限制
      // minChunks: 1, // 要提取的chunk最少被引用1次
      // maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 3, // 入口js文件最大并行请求数量
      // automativNameDelimiter: '~', // 名称连接符
      // name: true, // 可以使用命名规则，
      // cacheGroups: { // 分割chunk的组
      //   // node_modules 会被打包到 vendors 组的 chunk 中， vendors~xxx.js
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10,
      //   },
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     // 如果当前打包的模块和之前被提取的模块是同一个，就会复用，而不是重新打包模块
      //     reuseExistingChunks: true,
      //   },
      // },
    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件
    // 解决问题：修改a文件导致引用a文件的b文件contenthash变化
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    minimizer: [
      // 配置生产环境的压缩方案： js 和 css  --> terser库
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动source map
        sourceMap: true,
      }),
    ],
  },
};

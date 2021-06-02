> - 将 `06-打包其他资源` 复制一份
>
> - 之前的 webpack 配置，在修改了 src 文件中的代码内容都需要重新使用 `webpack` 命令打包，才可以在页面中生效。Webpack 为了避免重复的编译，就有 devServer 的配置。它并不属于五大核心概念。(还是需要手动刷新浏览器的 --> 添加 target: 'web' 配置，可以实现devServer自动刷新)

## 修改 webpack.config.js 文件

添加 devServer 属性配置

```js
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
        exclude: /\.(html|css|js)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]'
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
    contentBase: resolve(__dirname, 'build'),
    // // 为每个静态文件开启gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开本地默认浏览器
    open: true
  }
}
```

由于 webpack-dev-server 是在项目本地下载的包，而不是全局安装的包，所以需要使用 `npx webpack-dev-server` 命令启动。启动如果报错，可能是 webpack-dev-server 与 webpack-cli 的版本不兼容，可以到 `node_modules/webpack-dev-server/bin/webpack-dev-server.js` 中查找 webpack-dev-server 依赖的webpack-cli版本号。

> 将 `10-css兼容性处理` 复制一份
> 下载 `optimize-css-assets-webpack-plugin`

## 修改 webpack.config.js 文件

引入配置 `optimize-css-assets-webpack-plugin`

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { resolve } = require('path');

// 设置node环境变量
process.env.NODE_ENV = "development"

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style/built.css'
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'development'
}
```

使用 `webpack` 打包，查看打包后的样式文件 

> 压缩后输出大小 <font color="ff0000">184 bytes</font>
> 
> 压缩前输出大小 <font color="ff0000">285 bytes</font>


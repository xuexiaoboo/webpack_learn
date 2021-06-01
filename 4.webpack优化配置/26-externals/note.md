> 04 复制一份

当有一些包在生产环境中需要使用 CDN 进行手动引入，而又不希望将开发是下载的包一起打包的话，就使用 `externals` 将这个包忽略掉

见 webpack.config.js

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './src/index.html',
      },
    ),
  ],
  mode: 'production',
  externals: {
    jquery: 'jQuery',
  },
};
```

切记：忽略包打包后一定要手动进行引入
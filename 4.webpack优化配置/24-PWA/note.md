> PWA: 渐进式网络开发应用程序（离线可访问）
>   workbox ==>  workbox-webpack-plugin

### 1.下载 workbox-webpack-plugin

`npm i workbox-webpack-plugin -D`

### 2.修改 `webpack.config.js`

在 plugins 中，对workbox-webpack-plugin 进行配置

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// css抽离成单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// css压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

process.env.NODE_ENV = 'production';

const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // css 兼容性处理，外部添加postcss配置文件以及package.json中定义browserslist,以及修改node环境，匹配browserslist
    loader: 'postcss-loader',
  },
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        // js 格式校验。因为使用airbnb的校验规则，需要在外部创建 .eslint 配置文件，或在 package.json 中配置
        // 当有两个loader同时处理同一类文件时，一定要规定好，处理的先后,这里先执行eslint，后执行babel
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        // 一下loader只会匹配一个
        // 注意不能两个loader处理同类文件
        oneOf: [
          {
            test: /\.css$/,
            use: [
              // 'style-loader',
              // MiniCssExtractPlugin.loader,
              // 'css-loader',
              // {
              //   css 兼容性处理，外部添加postcss配置文件以及package.json中定义browserslist,以及修改node环境，匹配browserslist
              //   loader: 'postcss-loader',
              // },
              ...commonCssLoader,
            ],
          },
          {
            test: /\.less$/,
            use: [
              // MiniCssExtractPlugin.loader,
              // 'css-loader',
              // {
              //   loader: 'postcss-loader',
              // },
              ...commonCssLoader,
              'less-loader',
            ],
          },
          {
            // js 兼容性处理
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    // 按需加载配置
                    useBuiltIns: 'usage',
                    corejs: { version: 3 },
                    // 指定兼容的浏览器版本下限
                    targets: {
                      chrome: '60',
                      firefox: '60',
                      ie: '9',
                      safari: '10',
                      edge: '17',
                    },
                  },

                ],
              ],
              // 开启babel缓存
              // 第二次构建时，未改变的文件会读取之前的缓存
              cacheDirectory: true,
            },
          },
          {
            test: /\.(png|jpg|gif)/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'imgs',
              esModule: false,
            },
          },
          {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
              esModule: false,
            },
          },
          {
            exclude: /\.(js|css|less|html|jpg|png|gif)$/,
            loader: 'file-loader',
            options: {
              outputPath: 'media',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        // 压缩空格
        collapseWhitespace: true,
        // 去除注释
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin(
      {
        filename: 'style/built.[contenthash:10].css',
      },
    ),
    new OptimizeCssAssetsWebpackPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      /**
       * 1.帮助 serviceworker 快速启动
       * 2.删除旧的 serviceworker
       *
       * 生成一个 serviceworker 文件，要在入口文件进行注册（servicework有兼容性问题，在注册的时候要处理下）
       */
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  mode: 'production',
  // mode: 'development',
  devtool: 'source-map',
};
```

使用 `webpack` 对文件进行打包。发现在打包输出的 build 文件夹中生成了 service-work 相关的文件

### 3.在 src/js/index.js 文件中对 service-work 文件进行注册

在 src/js/index.js 中添加注册代码，由于 serviceWork 在不同浏览器有兼容性问题，简单做下处理，浏览器支持就用，不支持就不用

```js
// 注册servicework
// 简单处理下兼容性问题，支持就用不支持就不用
// 1. airbeb 的校验规则不识别一些浏览器的全局变量，在.eslintrc 中设置 env（具体查看文件代码）
// 2. sw 代码必须运行在服务器上
//   --> nodejs
//   --> npm i serve -g
//       serve -s build  启动服务器，将build目录下所有资源作为静态文件暴露出去
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功~');
      })
      .catch(() => {
        console.log('sw注册成功~');
      });
  });
}
```

根据注释 下载启动服务的工具，并启动

启动服务后根据工具提供的启动连接，访问页面，可以再浏览器工具的 Application 中的 Service Workers 中查看缓存的文件，将页面设置为 offline 后刷新页面，在 NetWork 中也可以看待，资源文件是从 Service Works 中加载的。


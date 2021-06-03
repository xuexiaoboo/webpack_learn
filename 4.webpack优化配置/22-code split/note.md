> 21-tree_shaking 复制一份

## 第一种配置方式（demo1）

### 1.由于 code split 是针对于js代码的，所以样式文件啥的都删掉，webpack中的配置也进行精简。
  ```js
  // webpack.config.js

  const { resolve } = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/js/index.js',
    output: {
      filename: 'js/built.[contenthash:10].js',
      path: resolve(__dirname, 'build'),
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
    ],
    mode: 'production',
    // mode: 'development',
  };
  ```

当前在 demo1 中有两个 js 文件，使用 `webpack` 打包查看输出文件。

打包后的 built 文件中包含两个文件的所有内容

### 2.修改webpack.config.js文件

修改入口文件格式,改成多入口的形式，之前的形式是单入口的形式

多入口特点：有一个入口对应输出一个bundle

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: './src/js/index.js',
  entry: {
    main: './src/js/index.js',
    test: './src/js/test.js',
  },
  output: {
    // 设置[name]来区分输出的多个bundle文件，这里[name]取 mian 和 test，与上边设置入口名对应
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
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
  ],
  mode: 'production',
  // mode: 'development',
};
```

这种配置方式，在入口文件变动的情况下，要进行重新配置，比较繁琐

## 第二种配置方式(demo2)

> demo1 复制一份

### 1.修改 webpack.config.js 文件

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  // entry: {
  //   main: './src/js/index.js',
  //   test: './src/js/test.js',
  // },
  output: {
    // 设置[name]来区分输出的多个bundle文件，这里[name]取 mian 和 test，与上边设置入口名对应
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
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
  ],
  /**
   * 1.可以将node_modules中的文件单独打包
   * 2.自动分析多入口模式下的chunk中，有没有体积较大的公共文件，会单独打包成一个chunk
   */
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: 'production',
  // mode: 'development',
};
```

## 第三种配置方式（demo3）

> demo2 复制一份

通过 js 代码，让某个文件单独打包

### 1.修改 index.js 文件

```js
function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

/**
 * 通过 js 代码，使文件单独打包
 */

import(/* webpackChunkName: 'test' */ './test').then((res) => {
  // eslint-disable-next-line
  console.log(res);
}).catch(() => {
  // eslint-disable-next-line
  console.log('文件加载失败');
})

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));
```




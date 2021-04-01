## 创建 src/index.html 文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="box1"></div>
  <div id="box2"></div>
</body>
</html>
```

## 创建 src/img 文件夹

添加图片，我这儿加了两张图片，1.png(61kb)、2.png(19kb)。最好是体积一大一小的，后边打包看差异。

## 创建 src/index.less 文件

```css
#box1 {
  width: 100px;
  height: 100px;
  background-image: url('./img/1.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#box2 {
  width: 100px;
  height: 100px;
  background-image: url('./img/2.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
```

## 创建 src/index.js 入口文件

```js
/**
 * 入口文件
 */

import './index.less'
```

## 创建 webpack.config.js 配置文件

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
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
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
  mode: 'development'
}
```

- 执行 `webpack` 命令打包，报错。查看打包log发现是在处理 less 文件中的图片引入的时候出现了问题。所以需要引入一个处理图片的 loader；
- 处理图片引入需要用到 url-loader ，url-loader 依赖 file-loader，所以同时下载这两个 loader；
- 在 webpac.config.js 文件中对 url-loader 进行配置
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
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader'
          ]
        },
        {
          // 处理图片资源
          test: /\.(jpg|png|gif)$/,
          // 只使用一个loader的简写
          loader: 'url-loader',
          // loader 的配置
          options: {
          // limit设置需要编译打包的图片最小限制，这里小于20kb就会被base64处理
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：图片体积会变大（文件请求速度更慢）
          // 这里是为了学习，一般7，8kb的小图片设置成base64处理
            limit: 20 * 1024
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
    mode: 'development'
  }
  ```
- 再次使用 `webpack` 命令打包成功
  1. 查看 build 文件，其中有一张乱码名称的图片，是打包后的1.png，查看打包前后体积比较；
  2. 同时引入了两张图片，但打包只打包了一张，是因为图片 2.png 的体积大小小于 url-loader 配置的 limit，被base64处理。具体可以查看 built.js 文件，可以查看打包的log查看 2.png 打包前后体积变化;
  3. 在浏览器打开打包生成 index.html，图片正常显示；
  4. 打包后图片的乱码名称是打包组员路径的 hash值，如果觉得太长，可以对 url-loader 的name属性进行配置。
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
            test: /\.less$/,
            use: [
              'style-loader',
              'css-loader',
              'less-loader'
            ]
          },
          {
            // 处理图片资源
            test: /\.(jpg|png|gif)$/,
            // 只使用一个loader的简写
            loader: 'url-loader',
            // loader 的配置
            options: {
              limit: 20 * 1024,
              // 给解析的图片进行重命名
              // [hash:10]  取图片解析后hash的前10位,也可以使用[name]取原名称
              // [ext]   取文件的原扩展名
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
      mode: 'development'
    }
   ```
  5. 再次打包，查看打包图片名称。

## 修改 src/index.html 文件

添加 img 标签

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="box1"></div>
  <div id="box2"></div>
  <img src="./img/1.png" alt="1.png">
</body>
</html>
```

- 添加标签后打包可能成功，可能失败，如果没有失败，在浏览器打开 build/index.html 文件，img标签并没有成功显示，这是因为 url-loader只能处理url引入的图片资源，处理不了html页面中img标签引入的图片，需要配置 html-loader；
- 下载 html-loader 并配置;
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
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader'
          ]
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
            // 给解析的图片进行重命名
            // [hash:10]  取图片解析后hash的前10位
            // [ext]   取文件的原扩展名
            name: '[hash:10].[ext]'
          }
        },
        {
          test: /\.html$/,
          // 处理html文件的img图片（负责引入img,从而能被url-loader进行处理）
          loader: 'html-loader'
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
    mode: 'development'
  }
  ```
- 执行命令打包，成功打包，打开 build/index.html 文件,还是显示失败，查看生成的 build/index.html 文件代码，在 img 标签的 src 属性的图片 hash 和 less 文件引入同样图片生成 hash 不一致。
  > 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs模块化，解析是会出问题的
  
  > 解决：关闭url-loader的es6模块化，使用commonjs解析(在webpack5 中不光要将 url-loader 的esModule 设置为false，同时需要将html-loader同样进行配置才行。试了下，<font color="ff0000">只</font>将 html-loader 的es6模块化关闭也可以)
- 修改配置文件
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
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader'
          ]
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
            // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs，解析是会出问题(在webpack5 中不光要将 url-loader 的 esModule 设置为false，同时需要将html-loader同样进行配置才行)
            // 解决：关闭url-loader的es6模块化，使用commonjs解析
            esModule: false,
            // 给解析的图片进行重命名
            // [hash:10]  取图片解析后hash的前10位
            // [ext]   取文件的原扩展名
            name: '[hash:10].[ext]'
          }
        },
        {
          test: /\.html$/,
          // 处理html文件的img图片（负责引入img,从而能被url-loader进行处理）
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
    mode: 'development'
  }
  ```
- 打包，打开 build/index.html img标签可以正常显示。可以发现，img标签的图片并没有打包生成新的图片，还是仅有处理 less 文件中的引入时生成的图片。可见，webpack 对打包结果相同的资源不会进行重复打包
  
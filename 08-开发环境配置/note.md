> 这里是将之前的学习整合到一起

## 项目文件准备

### 1. 创建目录结构

在项目中文件太多，都放到 src 一个目录下很乱，按文件类型放到不同文件夹下

```
-- src
 |--- imgs
 |
 |--- js
 |  |-- index.js
 |
 | 
 |--- media
 |
 |--- style
 | |-- index.less
 |
 |-- index.html
 |
-- webpack.config.js
```

### 2. 文件内容

- 找两张图片放到 src/imgs 目录中，这里是之前用到的两张 1.png(61kb)、2.png(19kb);
  
- 将之前学习的 iconfont 文件引入。将 `iconfont.css` 文件放到 src/style 目录下，将 `iconfont.css` 文件依赖的4个文件放到 src/media 目录下;
  
- src/index.html 文件内容
  
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>开发环境配置</title>
  </head>
  <body>
    <h1>Webpack 开发环境配置</h1>
    <span class="iconfont icon-aixin"></span>
    <span class="iconfont icon-chenggong"></span>
    <span class="iconfont icon-dianyingpiao"></span>
    <div id="box"></div>
    <img src="./imgs/1.png" alt="61kb">
  </body>
  </html>
  ```

- src/style/index.less 文件内容

  ```css
  #box {
    height: 200px;
    width: 200px;
    background-image: url(../imgs/2.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  ```

- src/js/index.js 文件内容
  
  ```js
  import '../style/iconfont.css';
  import '../style/index.less';

  function add (x, y) {
    return x + y;
  }

  console.log(add(2, 3));
  ```

- webpack.config.js 文件

  ```js
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { resolve } = require('path');

  module.exports = {
    entry: './src/js/index.js',
    output: {
      filename: 'built.js',
      path: resolve(__dirname, 'build')
    },
    module: {
      rules: [
        // loader 配置
        {
          // 处理样式资源, 这里以 less 为例
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader'
          ]
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          // 处理图片资源, 这个配置只能处理样式文件中引入的图片资源，不能处理img标签中的图片
          test: /\.(jpg|png|gif)$/,
          loader: 'url-loader',
          options: {
            limit: 20 * 1024,
            name: '[hash:10].[ext]',
            esModule: false
          }
        },
        {
          // 这个 loader 的配置可以处理 html 文件中的img标签
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            esModule: false
          }
        },
        {
          // 处理其他资源
          exclude: /\.(less|html|jpg|png|gif|js|css)$/,
          loader: 'file-loader',
          options: {
            name: '[hash:10].[ext]'
          }
        }
      ]
    },
    plugins: [
      // plugins 插件配置，切记是数组
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    mode: 'development',
    devServer: {
      contentBase: resolve(__dirname, 'build'),
      compress: true,
      open: true,
      port: 3000
    }
  }
  ```

  <font color="ff0000">注：devServer 的端口号开始准备用 6666 ，可是 chrome 默认将一些端口号禁用了，比如 6666 ...</font>

## 文件打包

- 使用 `npx webpack-dev-server` 命令启动devServer。可以成功打开页面并展示图标，图片;

- 使用 `webpack` 命令进行打包输出，可以成功生成打包文件build。但是所有的资源文件全都在 build 目录下。修改 `webpack.config.js` 文件，让打包后的资源文件可以像 src 目录结构一样(具体查看文件配置)。
  
  - 将 output 中 filename 的值 改为 `js/built.js`，就可以将打包后的 built.js 文件输出到 build/js 目录下；

  - 在 url-loader 的 options 中添加 `outputPath: 'imgs'`;

  - 在 file-loader 的 options 中添加 `outputPath: 'media'`;

- 重新打包，查看打包输出文件结构

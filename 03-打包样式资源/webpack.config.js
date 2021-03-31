/**
 * webpack.config.js  webpack的配置文件
 *  作用：指示 webpack 干那些活（当运行 webpack 指令时，会加载这里的配置）
 * 
 * 
 * 所有的构建工具都是基于Node平台运行的 ~~ 模块化默认才用commonjs(项目代码使用的是 ES6 的模块化)
 */

const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    // __dirname是nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build'),
  },
  // loader 配置
  module: {
    rules: [
      // 详细的loader配置
      {
        // 匹配哪些文件(test 字段的值千万不可加引号)
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          /**
           * use数组中的loader执行顺序：从右到左（或者这个格式下的从下到上）依次执行
           * 
           * 这里的包 webpack 在本级目录下找不到会到上级目录中找
           */
          // 创建style标签，将js中的样式资源插入，并添加到header中生效
          'style-loader',
          // 将css文件编程commonjs模块加载到js中，里边的内容是样式字符串
          'css-loader'
        ]
      },
      // 不同文件需要配置不同的loader
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
    // 详细的plugins配置
  ],
  mode: 'development',
  // mode: 'production'
}
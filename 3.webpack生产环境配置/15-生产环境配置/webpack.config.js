const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// css抽离成单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// css压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

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
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          // MiniCssExtractPlugin.loader,
          // 'css-loader',
          // {
          //   // css 兼容性处理，外部添加postcss配置文件以及package.json中定义browserslist,以及修改node环境，匹配browserslist
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
  plugin: [
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
        filename: 'css/built.css',
      },
    ),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: 'production',
};

## 学习准备

1. `npm init`
2. `npm install webpack webpack-cli -g`
3. `npm install webpack webpack-cli -D`

## 创建目录结构

```js
-- 02-webpack初体验
 |
 |-- build  // 经过webpack打包后输出的目录
 |
 |-- src  // 源代码目录
   |
   |-- index.js // webpack打包入口文件
```

## 修改 src/index.js

```js
/*
  index.js: webpack起点文件

  1. 运行指令：
    开发环境： webpack ./src/index.js -o ./build/built.js --mode=development
      (webpack会以./src/index.js为入口文件开始打包，打包后输出到./build/built.js。整体的打包环境是开发环境)
      
    生产环境： webpack ./src/index.js -o ./build/built.js --mode=production
      (webpack会以./src/index.js为入口文件开始打包，打包后输出到./build/built.js。整体的打包环境是生产环境，可以查看输出的built文件，比开发环境多个一个压缩)
*/

function add(x, y) {
  return x + y;
}

console.log(add(1, 2));
```

控制台输入运行指令，会在 build 文件夹下新建 built.js 文件（新版的 webpack 会在build文件加下创建 built.js 文件夹并在此文件夹下添加 main.js 文件作为打包输出文件。），执行命令后如果报错<font color="red">Invalid regular expression: /(\p{Uppercase_Letter}+|\p{Lowercase_Letter}|\d)(\p{Uppercase_Letter}+)/: Invalid escape</font>则是Node版本不对。切换为10+版本。

## 分别以开发环境及生产环境运行命令分别执行后查看打包后文件

生产环境命令打包后的文件较开发环境打包后的文件体积更小，其中代码也进行了压缩。

## 创建 build/index.html 文件

将打包后的文件引入，浏览器打开页面，可以正常执行（之前将文件直接引入页面中是不能正常被浏览器解析执行的）

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
  
  <script src="./built.js/main.js"></script>
</body>
</html>
```

## 创建 src/data.json 文件

```json
{
  "name": "zhangsan",
  "age": 18
}
```

在 src/index.js 问你件中引入，打开 build/index.html 页面，也可以正常执行。

## 创建 src/index.css 文件

```css
body, html {
  height: 100%;
  background-color: pink;
}
```

将 index.css 文件引入 index.js 文件。使用命令打包<font color="red">报错</font>，可查看打包文件查看报错信息。

## 结论（目前为止）

1. webpack 能处理 js、json 资源，不能处理 css、img 等其他资源。
2. 开发环境和生产环境将ES6模块化编译成浏览器可以识别的模块化。
3. 生产环境比开发环境多一个代码的压缩。
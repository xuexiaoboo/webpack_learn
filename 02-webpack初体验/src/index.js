/*
  index.js: webpack起点文件

  1. 运行指令：
    开发环境： webpack ./src/index.js -o ./build/built.js --mode=development
      (webpack会以./src/index.js为入口文件开始打包，打包后输出到./build/built.js。整体的打包环境是开发环境)
      Invalid regular expression: /(\p{Uppercase_Letter}+|\p{Lowercase_Letter}|\d)(\p{Uppercase_Letter}+)/: Invalid escape
      
    生产环境： webpack ./src/index.js -o ./build/built.js --mode=production
      (webpack会以./src/index.js为入口文件开始打包，打包后输出到./build/built.js。整体的打包环境是生产环境，可以查看输出的built文件，比开发环境多个一个压缩)
*/

import './index.css'

import data from './data.json'
console.log(data);

function add(x, y) {
  return x + y;
}

console.log(add(1, 2));
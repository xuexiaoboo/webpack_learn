import '../style/index.css';
import { square } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(square(2));

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));

// 注册servicework
// 简单处理下兼容性问题，支持就用不支持就不用
// 1. airbeb 的校验规则不识别一些浏览器的全局变量，在.eslintrc 中设置 env
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

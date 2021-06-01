import '../style/iconfont.css';
import '../style/index.less';
import print from './print';

console.log('index.js 被执行了~~');

print();

function add(x, y) {
  return x + y;
}

console.log(add(2, 2));

if (module.hot) {
  // 一旦 module.hot 为 true，说明开启了 HMR 功能
  module.hot.accept('./print.js', () => {
    // 该方法会监听 print.js 文件的变化，一旦发生变化，会重新打包该文件而其他文件不会重新打包
    print();
  });
}

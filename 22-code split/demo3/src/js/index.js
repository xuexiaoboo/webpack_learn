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

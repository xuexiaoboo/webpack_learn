// import { square } from './test';

// eslint-disable-next-line
console.log('index.js 文件被加载了~');

document.getElementById('btn').onclick = function () {
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ square }) => {
    console.log(square(2*2));
  })
}

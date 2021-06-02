// import add from './add';
import sub from './sub';

console.log('index.js 被加载了');

import('./add').then(({default: add}) => {
  console.log(add(1, 2));
})

console.log(sub(2, 1));

> 22-code split / demo3 复制一份
> 
> 处理 js 文件 懒加载、预加载

## 文件正常加载

### 1.修改 js 文件

- index.js
  ```js
  // index.js

  import { square } from './test';

  // eslint-disable-next-line
  console.log('index.js 文件被加载了~');

  // eslint-disable-next-line
  console.log(square);
  ```


- test.js
  ```js
  // test.js
  // eslint-disable-next-line
  console.log('test.js 文件被加载了~');

  export function square(x) {
    return x * x;
  }

  export function cube(x) {
    return x * x * x;
  }
  ```

### 2.使用webpack打包。浏览 html 文件，查看控制台输出

index.js 文件，test.js 文件同时被加载

## js 文件懒加载

### 1.修改index.js 文件

```js
// eslint-disable-next-line
console.log('index.js 文件被加载了~');

document.getElementById('btn').onclick = function () {
  import(/* webpackChunkName: 'test' */ './test').then(({ square }) => {
    console.log(square(2*2));
  })
}
```

使用webpack打包，浏览 html 文件，查看控制台输出，发现只有在按钮点击是，即需要使用该文件时，才对该文件进行加载

## 文件预加载

### 1.修改index.js 文件

```js
// import { square } from './test';

// eslint-disable-next-line
console.log('index.js 文件被加载了~');

document.getElementById('btn').onclick = function () {
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ square }) => {
    console.log(square(2*2));
  })
}
```

通过使用 webpackPrefetch 的注释，对引入文件进项预加载处理，使用 webpack 打包，查看控制台，会发现，在 index.js 文件被加载后 test.js 文件也被加载了但是，还是在按钮点击的时候才去执行。

- 正常文件加载：文件并行加载（同一时间加载多个）
- 预加载 prefetch：等页面需要资源加载完毕，浏览器空闲的时候对预加载资源进行加载

<font color="ff0000">懒加载的兼容性还行，但是prefetch 的兼容性很差，可以在一些web端的高版本浏览器中使用，移动端慎用</font>
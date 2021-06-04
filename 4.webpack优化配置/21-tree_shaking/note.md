> tree shaking需要满足两个条件
> 1. mode 为  `production`。
> 2. 使用 ES6 模块化。（即 import 和 export，确保编译器或者插件没有将 ES6 的模块化转为 commonJS 的）

> 有一些文件是没有被引入或导出但是在全局有其他作用的文件，不想被 tree shaking 忽略
> - 在 package.json 中配置 `"sideEfficts"` 属性：使用数组添加不需要 shaking 的文件

优点: 减少打包体积

注：`development` 环境开启 tree shaking 需要配置 `usedExports`

```js
// webpack.config.js

optimization: {
  usedExports: true
}
```
> tree shaking需要满足两个条件
> 1. mode 为  `production`。
> 2. 使用 ES6 模块化。（即 import 和 export，确保编译器或者插件没有将 ES6 的模块化转为 commonJS 的）
> 3. 在 package.json 中配置 `"sideEfficts"` 属性：使用数组添加不需要 shaking 的文件

优点: 减少打包体积
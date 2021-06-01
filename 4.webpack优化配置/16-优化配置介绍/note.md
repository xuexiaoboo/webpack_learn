## webpack 性能优化
> - 开发环境性能优化
> 
> - 生产环境性能优化

### 1. 开发环境性能优化
- 优化打包构建速度
  - HMR


- 优化代码调试
  - source-map

### 2. 生产环境性能优化
- 优化打包构建速度
  - oneOf
  - babel缓存
  - 多进程打包
  - externals
  - dll
  
- 优化代码运行性能
  - 缓存（hash、chunkhash、contenthash）
  - tree shaking
  - code split
  - 懒加载、预加载（js代码）
  - PWA
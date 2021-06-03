- 问题：在之前的 webpack.config.js 配置下，每一个文件在打包时会和配置的每一个loader都匹配一遍，loader 根据 test 去识别是否处理，这是没有必要的，十分影响打包速度。

- 解决：将 loader 的配置使用 `oneOf` 包裹，如下：
  ```js
  ...

  module: {
    rules: [
      {
        oneOf: [
          // ...loader配置...
        ]
      }
    ]
  }

  ...
  ```

- 结果：在文件打包过程中，如果匹配到 oneOf 中的某个 loader，需要对其进行处理，则不会再继续让文件匹配下面的 loader
  - 造成的新问题：有些文件需要通过多个 loader 进行处理，而 oneOf 只允许匹配一个
  - 新问题解决：将需要同时对某类文件处理的其他 loader，仍然放到 rules 的数组中进行配置，oneOf 中的 loader 匹配之后，还会接着匹配外部配置的 loader
    ```js
    ...

    module: {
      rules: [
        {
          oneOf: [
            // ...loader配置...
          ]
        },
        {
          // ...其他loader...
        }
      ]
    }

    ...
    ```
    - ~注~注~注~：  在多个 loader 处理的时候一定要区别 loader 处理的优先级
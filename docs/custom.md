### 如何处理定制化

为了确保项目可以轻松应对定制化，不要在项目中硬编码任何公司相关的信息，你应该

1. 在 [config-xx.json](src/assets/config/config-zh-CN.json) 中配置
2. 在 startup 时候将配置注入 LayoutService
3. 通过 LayoutService 显示不同的逻辑或者执行不同的操作

### 贡献指南

### 1. 首先请确保你已经：
  * 【必须】正确配置编辑器(缩进，换行规则，tslint，stylelint 等)
  * 【必须】完整阅读[ Angular 文档](https://angular.cn/)
  * 【推荐】完整阅读 [Rxjs 文档](https://rxjs-dev.firebaseapp.com/)
  * 【推荐】完整阅读 [Lodash 文档](https://lodash.com/docs/4.17.15)
  * 【必须】完整阅读 [TypeScript 文档](https://www.typescriptlang.org/)
  * 【必须】知道[如何编写 Commit Message](https://git.datagrand.com/frontend_utils/fe-conventions/blob/master/commit-message/README.md)
  * 【必须】知道[什么是 GitFlow 和 Github Flow](https://git.datagrand.com/frontend_utils/fe-conventions/blob/master/git-flow/README.md)
  * 【必须】知道[如何发起一个合格的 Merge Request](https://git.datagrand.com/frontend_utils/fe-conventions/blob/master/mr-issue-tmp/README.md)
  * 【必须】知道[如何解决冲突，知道 Merge 和 Rebase 的区别](https://www.jianshu.com/p/6294343f3782)
  * 【必须】知道[如何编写可维护的前端代码](https://zhuanlan.zhihu.com/p/141633166)

### 2. 安全处理边界情况
  * 文字溢出省略
  * 对话框关闭的数据重置
  * JSON 正反序列化是否安全
  * 以及其它各种异常的处理

### 3. 正确处理引用类型
  * 优先使用 cloneDeep

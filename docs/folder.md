
### 目录结构解释

```
├── .gitlab                 # 存放 Gitlab/Github 模板
├── .vscode                 # 存放 VsCode 项目配置
├── build                   # 存放构建相关文件
├── docs                    # 存放项目的文档
├── e2e                     # 存放 e2e 测试文件
├── scripts                 # 存放项目的脚本文件
├── src
│   ├── app
│   │   ├── bases           # 存放通用基类
│   │   ├── constants       # 存放常量
│   │   ├── cores           # 存放应用的核心配置
│   │   │   ├── auth
│   │   │   ├── guard
│   │   │   ├── i18n
│   │   │   ├── net
│   │   │   ├── preload
│   │   │   ├── sentry
│   │   │   └── startup
│   │   ├── layouts         # 基本布局
│   │   ├── models          # 通用类型定义，数据模型
│   │   ├── modules         # 可以跨路由使用的模块(领域划分明确)
│   │   │   ├── bixi
│   │   │   ├── zorro
│   │   │   └── chart
│   │   ├── routes
│   │   │   ├── a           # 一个路由模块
│   │   │   │   ├── components
│   │   │   │   ├── models
│   │   │   │   ├── pages
│   │   │   │   ├── services
│   │   │   │   ├── directives
│   │   │   │   ├── pipes
│   │   │   │   ├── a-routing.module.ts
│   │   │   │   └── a.module.ts
│   │   │   └── b
│   │   ├── services        # providedIn 为 root 的全局公用 service
│   │   ├── styles          # 样式文件
│   │   └── utils           # 纯函数的工具函数
│   ├── assets              # 静态资源
│   │   ├── config          # 应用配置文件（菜单，文案等）
│   │   ├── i18n            # 国际化翻译素材
│   │   ├── icons           # 图标
│   │   └── images          # 图片
│   └── environments        # 环境差异配置
├── package.json
└── yarn.lock
```

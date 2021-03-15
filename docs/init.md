### 初始化项目必读


1. 执行更换项目名称的脚本

    ```
    node scripts/rename.js my_project_name
    ```
    > 该脚本将会取得 package.json 下的 name 字段作为旧名称，扫描整个项目文件替换为新名称

2. 修改 `.gitlab-ci.yml` 下的 Gitlab/镜像仓库地址
   ``` yml
    variables:
      GIT_STRATEGY: none
      GIT_REPO_GROUP: Gitlab 空间
      GIT_REPO_NAME: Gitlab 仓库
      IMAGE_REPO_NAMESPACE: Dockerhub 空间
      IMAGE_REPO_NAME: Dockerhub 仓库
   ```

3. 修改 `src/assets/config/config-xx.json` 下的 Sentry DSN
   ```
   {
     "sentry": {
       "open": true,
       "dsn": "xxxx@xxx/xxx",
     }
   }
   ```

4. 在 `Settings -> CI/CD` 下修改私密变量

    |  KEY   | 备注  |
    |  ----  | ----  |
    | GIT_REPO_GROUP  | Git 仓库组 |
    | GIT_REPO_NAME  | Git 仓库名 |
    | IMAGE_REPO_NAMESPACE  | Docker 镜像命名空间 |
    | IMAGE_REPO_NAME  | Docker 镜像名 |
    | REGISTRY_USER  | 镜像仓库账号 |
    | REGISTRY_PWD  | 镜像仓库密码 |
    | SENTRY_URL | Sentry 地址(http://starport.datagrand.com/) |
    | SENTRY_ORG  | Sentry 组织(默认 starport) |
    | SENTRY_PROJECT | Sentry 项目 |
    | SENTRY_AUTH_TOKEN | [用于上传 Sourcemap 的 Token](http://wiki.datagrand.com/pages/viewpage.action?pageId=3147181) |
    | SONAR_KEY | Sonar Key |
    | SONAR_NAME | Sonar 项目名称  |

5. 提交代码，检验项目是否一切正常
  
    1. `yarn dev` 可以正常启动
    2. `yarn build` 可以正常构建
    3. 构建出来的镜像可以正常使用
    4. Sentry 可以正常捕获到错误
    5. Sonar 可以正常扫描

5. 更换 .git 仓库，提交代码

<br/>
<br/>

> 初始化完成后可以将该文档删除

# sujor-api

> 这是一个 koa2 项目

## npm 相关命令

``` bash
# 安装工程依赖
npm install

# 在本地启动调试 server
npm run dev

# 构建线上生产环境产物
npm run build

# 启动编译后的代码，注意，需要在 dist 目录中启动，仅 SSR 模式下有效
npm run start

# 检查代码是否符合规范
npm run lint

# git push 服务器自动 pull 并部署
首次推送项目（从 git 到 服务器） pm2 deploy ecosystem.json production setup
之后的项目更新重启服务 pm2 deploy ecosystem.json production
```
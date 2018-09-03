const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')
const koaBody = require('koa-body')
const debug = require('debug')('sujor-api')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')
const path = require('path')
const static = require('koa-static')

// 使用响应处理中间件
app.use(response)

// koa-body 中间件
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 5000 * 1024 * 1024
  }
}))

// const staticPath = './apidoc'
const uploadPath = './upload'

// app.use(static(
//   path.join( __dirname,  staticPath)
// ))

app.use(static(
  path.join(__dirname, uploadPath)
))

// 解析请求体
app.use(bodyParser())

// cors 跨域
app.use(cors({
  origin: function (ctx) {
    return '*' // 允许来自所有域名的请求
    // return ['https://www.sujor.com/', 'http://admin.sujor.com/'] // 允许来自该域名的请求
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// 引入路由分发
const router = require('./routes')
app
  .use(router.routes())
  .use(router.allowedMethods())

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))

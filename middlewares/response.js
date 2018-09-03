const debug = require('debug')('sujor-api')

/**
 * 响应处理模块
 */
module.exports = async function (ctx, next) {
  try {
      // 调用下一个 middleware
    await next()
    // 处理响应结果
    // 如果直接写入在 body 中，则不作处理
    // 如果写在 ctx.body 为空，则使用 state 作为响应
    ctx.body = ctx.body ? ctx.body : { 
      code: ctx.state.code !== undefined ? ctx.state.code : 0,
      msg: ctx.state.msg !== undefined ? ctx.state.msg : '',
      data: ctx.state.data !== undefined ? ctx.state.data : {}
    }
  } catch (e) {
      // catch 住全局的错误信息
    debug('Catch Error: %o', e)

      // 设置状态码为 200 - 服务端错误
    ctx.status = 200

      // 输出详细的错误信息
    ctx.body = {
      code: -1,
      msg: '服务内部错误，请稍后再试！',
      error: e && e.message ? e.message : e.toString()
    }
  }
}
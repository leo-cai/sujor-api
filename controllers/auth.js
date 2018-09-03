// auth controller 登录与鉴权
const {signIn, signUp, signOut} = require('../modules/auth')
/**
 * @api {post} /signin 用户登录
 * @apiVersion 1.0.0
 * @apiName signin用户登录接口
 * @apiGroup Auth
 * @apiDescription 用户登录接口
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 *
 * @apiParamExample {JSON} 请求示例
   {
      username: 'admin',
      password: '123456'
   }
 *
 *
 * @apiSuccessExample {JSON} 返回成功示例
   {
      code: 0,
      data: {
        user_id: 1,
        username: admin,
        signed_time: 1531288719067,
        msg: '登录成功！',
        token: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTMxMjg0NDExLCJleHAiOjE1MzE4ODkyMTF9.3lMb_NGPhoaX8tK6BRu47sLd_py8OfVH3j7ymAtdCV0"',
        expires: 7
      }
    }
 *
 * @apiErrorExample {JSON} 返回失败示例
   {
      code: -1,
      data: {
        msg: '用户名或密码不正确！'
      }
    }
 */
const signInApi = async (ctx) => {
  let data = ctx.request.body
  ctx.state = await signIn(data)
}

/**
 * @api {post} /signup 用户注册
 * @apiVersion 1.0.0
 * @apiName signup用户注册接口
 * @apiGroup Auth
 * @apiDescription 用户注册接口
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 * @apiParam {String} repassword 确认密码
 *
 * @apiParamExample {JSON} 请求示例
   {
      username: 'admin',
      password: '123456'
      repassword: '123456'
   }
 *
 *
 * @apiSuccessExample {JSON} 返回成功示例
   {
      code: 0,
      data: {
        msg: '注册成功！',
      }
    }
 *
 * @apiErrorExample {JSON} 返回失败示例
   {
      code: -1,
      data: {
        msg: '注册失败！请稍后再试！'
      }
    }
 */
const signUpApi = async (ctx) => {
  let data = ctx.request.body
  ctx.state = await signUp(data)
}

/**
 * @api {put} /signout 用户注销
 * @apiVersion 1.0.0
 * @apiName signout用户注销接口
 * @apiGroup Auth
 * @apiDescription 用户注销接口
 *
 * @apiSuccessExample {JSON} 返回成功示例
   {
      code: 0,
      data: {
        msg: '注销成功！',
      }
    }
 *
 * @apiErrorExample {JSON} 返回失败示例
   {
      code: -1,
      data: {
        msg: '注销失败！请稍后再试！'
      }
    }
 */
const signOutApi = async (ctx) => {
  let data = ctx.request.body
  ctx.state = await signOut(data)
}

module.exports = {
  signInApi,
  signUpApi,
  signOutApi
}

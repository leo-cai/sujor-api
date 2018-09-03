// user controller
const {getUsers, getUser, updateUser} = require('../modules/user')

/**
 * @api {get} 获取用户列表
 * @apiVersion 1.0.0
 * @apiName 获取用户列表接口
 * @apiGroup User
 *
 * @apiParam {Number} page 页数
 * @apiParam {Number} limit 数目
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   total: 1,
 *   data: [
 *     {
 *       user_id: 1,
 *       username: '',
 *       mail: '',
 *       activated: 1, // 是否激活
 *       disabled: 0, // 是否禁用账号
 *       signed_time: 1531288719067,
 *       updated_time: 1531288719067,
 *       created_time: 1531288719067
 *     }
 *   ]
 * }
 */
const getUsersApi = async (ctx) => {
  const page = parseInt(ctx.request.query.page)
  const limit = parseInt(ctx.request.query.limit)
  ctx.state = await getUsers(page, limit)
}

/**
 * * @api {get} 获取用户详情
 * @apiVersion 1.0.0
 * @apiName 获取用户详情接口
 * @apiGroup User
 *
 * @apiParam {Number} userId 用户id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   data: {
 *     user_id: 1,
 *     birthday: 1531288719067,
 *     avatar: '',
 *     province: '',
 *     city: ''
 *   }
 * }
 */
const getUserApi = async (ctx) => {
  const userId = parseInt(ctx.request.query.user_id)
  ctx.state =  await getUser(userId)
}

/**
 * @api {put} 修改用户
 * @apiVersion 1.0.0
 * @apiName 修改用户接口
 * @apiGroup User
 *
 * @apiParam {Number} user_id 用户id
 * @apiParam {Number} username 用户名
 * @apiParam {Number} disabled 是否禁用
 * @apiParam {Number} activated 是否激活
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '用户修改成功',
 *   data: {
 *     user_id: 1,
 *     username: '',
 *     ...
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '用户修改失败'
 * }
 */
const updateUserApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await updateUser(data)
}

module.exports = {
  getUsersApi,
  getUserApi,
  updateUserApi
}

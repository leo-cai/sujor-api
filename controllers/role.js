// role controller
const {getRoles, getRole, addRole, updateRole, deleteRole} = require('../modules/role')

/**
 * @api {get} 获取角色列表
 * @apiVersion 1.0.0
 * @apiName 获取角色列表接口
 * @apiGroup Role
 *
 * @apiParam {Number} page 页数
 * @apiParam {Number} limit 数目
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '查询成功',
 *   total: 1,
 *   data: [
 *     {
 *       role_id: 1,
 *       role_name: '',
 *       updated_time: 1531288719067,
 *       created_time: 1531288719067
 *     }
 *   ]
 * }
 */
const getRolesApi = async (ctx) => {
  const page = parseInt(ctx.request.query.page)
  const limit = parseInt(ctx.request.query.limit)
  ctx.state = await getRoles(page, limit)
}

/**
 * * @api {get} 获取角色详情
 * @apiVersion 1.0.0
 * @apiName 获取角色详情接口
 * @apiGroup Role
 *
 * @apiParam {Number} roleId 角色id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '查询成功',
 *   data: {
 *     role_id: 1,
 *     role_name: ''
 *   }
 * }
 */
const getRoleApi = async (ctx) => {
  const roleId = parseInt(ctx.request.query.role_id)
  ctx.state =  await getRole(roleId)
}

/**
 * @api {post} 增加角色
 * @apiVersion 1.0.0
 * @apiName 增加角色接口
 * @apiGroup Role
 *
 * @apiParam {Number} role_name 角色名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: 'role新增成功',
 *   data: {
 *     role_id: 1,
 *     role_name: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: 'role新增失败'
 * }
 */
const addRoleApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await addRole(data)
}

/**
 * @api {put} 修改角色
 * @apiVersion 1.0.0
 * @apiName 修改角色接口
 * @apiGroup Role
 *
 * @apiParam {Number} role_id 角色id
 * @apiParam {Number} role_name 角色名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '角色修改成功',
 *   data: {
 *     role_id: 1,
 *     role_name: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '角色修改失败'
 * }
 */
const updateRoleApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await updateRole(data)
}

/**
 * @api {delete} 删除角色
 * @apiVersion 1.0.0
 * @apiName 删除角色接口
 * @apiGroup Role
 *
 * @apiParam {Number} role_id 角色id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '角色删除成功'
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '角色删除失败'
 * }
 */
const deleteRoleApi = async (ctx) => {
  const roleId = ctx.params.role_id
  ctx.state = await deleteRole(roleId)
}
module.exports = {
  getRolesApi,
  getRoleApi,
  addRoleApi,
  updateRoleApi,
  deleteRoleApi
}

// permission controller
const {getPermissions, getPermission, addPermission, updatePermission, deletePermission} = require('../modules/permission')

/**
 * @api {get} 获取权限列表
 * @apiVersion 1.0.0
 * @apiName 获取权限列表接口
 * @apiGroup Permission
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
 *       permission_id: 1,
 *       permission_name: '',
 *       updated_time: 1531288719067,
 *       created_time: 1531288719067
 *     }
 *   ]
 * }
 */
const getPermissionsApi = async (ctx) => {
  const page = parseInt(ctx.request.query.page)
  const limit = parseInt(ctx.request.query.limit)
  ctx.state = await getPermissions(page, limit)
}

/**
 * * @api {get} 获取权限详情
 * @apiVersion 1.0.0
 * @apiName 获取权限详情接口
 * @apiGroup Permission
 *
 * @apiParam {Number} permissionId 权限id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '查询成功',
 *   data: {
 *     permission_id: 1,
 *     permission_name: ''
 *   }
 * }
 */
const getPermissionApi = async (ctx) => {
  const permissionId = parseInt(ctx.request.query.permission_id)
  ctx.state =  await getPermission(permissionId)
}

/**
 * @api {post} 增加权限
 * @apiVersion 1.0.0
 * @apiName 增加权限接口
 * @apiGroup Permission
 *
 * @apiParam {Number} permission_name 权限名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: 'permission新增成功',
 *   data: {
 *     permission_id: 1,
 *     permission_name: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: 'permission新增失败'
 * }
 */
const addPermissionApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await addPermission(data)
}

/**
 * @api {put} 修改权限
 * @apiVersion 1.0.0
 * @apiName 修改权限接口
 * @apiGroup Permission
 *
 * @apiParam {Number} permission_id 权限id
 * @apiParam {Number} permission_name 权限名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '权限修改成功',
 *   data: {
 *     permission_id: 1,
 *     permission_name: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '权限修改失败'
 * }
 */
const updatePermissionApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await updatePermission(data)
}

/**
 * @api {delete} 删除权限
 * @apiVersion 1.0.0
 * @apiName 删除权限接口
 * @apiGroup Permission
 *
 * @apiParam {Number} permission_id 权限id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '权限删除成功'
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '权限删除失败'
 * }
 */
const deletePermissionApi = async (ctx) => {
  const permissionId = ctx.params.permission_id
  ctx.state = await deletePermission(permissionId)
}
module.exports = {
  getPermissionsApi,
  getPermissionApi,
  addPermissionApi,
  updatePermissionApi,
  deletePermissionApi
}

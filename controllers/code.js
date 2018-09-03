// code controller
const {getCodes, getCode, addCode, updateCode, deleteCode} = require('../modules/code')

/**
 * @api {get} 获取代码列表
 * @apiVersion 1.0.0
 * @apiName 获取代码列表接口
 * @apiGroup Code
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
 *       code_id: 1,
 *       titile: '',
 *       updated_time: 1531288719067,
 *       created_time: 1531288719067,
 *       ...
 *     }
 *   ]
 * }
 */
const getCodesApi = async (ctx) => {
  const page = parseInt(ctx.request.query.page)
  const limit = parseInt(ctx.request.query.limit)
  const utmSource = ctx.request.query.utm_source
  ctx.state = await getCodes(page, limit, utmSource)
}

/**
 * * @api {get} 获取代码详情
 * @apiVersion 1.0.0
 * @apiName 获取代码详情接口
 * @apiGroup Code
 *
 * @apiParam {Number} codeId 代码id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '查询成功',
 *   data: {
 *     code_id: 1,
 *     title: '',
 *     ...
 *   }
 * }
 */
const getCodeApi = async (ctx) => {
  const codeId = parseInt(ctx.request.query.code_id)
  const utmSource = ctx.request.query.utm_source
  ctx.state =  await getCode(codeId, utmSource)
}

/**
 * @api {post} 增加代码
 * @apiVersion 1.0.0
 * @apiName 增加代码接口
 * @apiGroup Code
 *
 * @apiParam {Number} code_name 代码名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: 'code新增成功',
 *   data: {
 *     code_id: 1,
 *     title: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: 'code新增失败'
 * }
 */
const addCodeApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await addCode(data)
}

/**
 * @api {put} 修改代码
 * @apiVersion 1.0.0
 * @apiName 修改代码接口
 * @apiGroup Code
 *
 * @apiParam {Number} code_id 代码id
 * @apiParam {Number} code_name 代码名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '代码修改成功',
 *   data: {
 *     code_id: 1,
 *     code_name: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '代码修改失败'
 * }
 */
const updateCodeApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await updateCode(data)
}

/**
 * @api {delete} 删除代码
 * @apiVersion 1.0.0
 * @apiName 删除代码接口
 * @apiGroup Code
 *
 * @apiParam {Number} code_id 代码id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '代码删除成功'
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '代码删除失败'
 * }
 */
const deleteCodeApi = async (ctx) => {
  const codeId = ctx.params.code_id
  ctx.state = await deleteCode(codeId)
}
module.exports = {
  getCodesApi,
  getCodeApi,
  addCodeApi,
  updateCodeApi,
  deleteCodeApi
}

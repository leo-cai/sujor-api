// category controller
const {getCodeCategories, getCodeCategory, addCodeCategory, updateCodeCategory, deleteCodeCategory} = require('../modules/codeCategory')

/**
 * @api {get} 获取代码分类列表
 * @apiVersion 1.0.0
 * @apiName 获取代码分类列表接口
 * @apiGroup CodeCategory
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
 *       category_id: 1,
 *       category_name: '',
 *       updated_time: 1531288719067,
 *       created_time: 1531288719067
 *     }
 *   ]
 * }
 */
const getCodeCategoriesApi = async (ctx) => {
  const page = parseInt(ctx.request.query.page)
  const limit = parseInt(ctx.request.query.limit)
  ctx.state = await getCodeCategories(page, limit)
}

/**
 * * @api {get} 获取代码分类详情
 * @apiVersion 1.0.0
 * @apiName 获取代码分类详情接口
 * @apiGroup CodeCategory
 *
 * @apiParam {Number} categoryId 代码分类id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '查询成功',
 *   data: {
 *     category_id: 1,
 *     category_name: ''
 *   }
 * }
 */
const getCodeCategoryApi = async (ctx) => {
  const categoryId = parseInt(ctx.request.query.category_id)
  ctx.state =  await getCodeCategory(categoryId)
}

/**
 * @api {post} 增加代码分类
 * @apiVersion 1.0.0
 * @apiName 增加代码分类接口
 * @apiGroup CodeCategory
 *
 * @apiParam {Number} category_name 代码分类名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '代码分类新增成功',
 *   data: {
 *     category_id: 1,
 *     category_name: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '代码分类新增失败'
 * }
 */
const addCodeCategoryApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await addCodeCategory(data)
}

/**
 * @api {put} 修改代码分类
 * @apiVersion 1.0.0
 * @apiName 修改代码分类接口
 * @apiGroup CodeCategory
 *
 * @apiParam {Number} category_id 代码分类id
 * @apiParam {Number} category_name 代码分类名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '代码分类修改成功',
 *   data: {
 *     category_id: 1,
 *     category_name: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '代码分类修改失败'
 * }
 */
const updateCodeCategoryApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await updateCodeCategory(data)
}

/**
 * @api {delete} 删除代码分类
 * @apiVersion 1.0.0
 * @apiName 删除代码分类接口
 * @apiGroup CodeCategory
 *
 * @apiParam {Number} category_id 代码分类id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '代码分类删除成功'
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '代码分类删除失败'
 * }
 */
const deleteCodeCategoryApi = async (ctx) => {
  const categoryId = ctx.params.category_id
  ctx.state = await deleteCodeCategory(categoryId)
}
module.exports = {
  getCodeCategoriesApi,
  getCodeCategoryApi,
  addCodeCategoryApi,
  updateCodeCategoryApi,
  deleteCodeCategoryApi
}

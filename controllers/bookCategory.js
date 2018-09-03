// category controller
const {getBookCategories, getBookCategory, addBookCategory, updateBookCategory, deleteBookCategory} = require('../modules/bookCategory')

/**
 * @api {get} 获取书籍分类列表
 * @apiVersion 1.0.0
 * @apiName 获取书籍分类列表接口
 * @apiGroup BookCategory
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
const getBookCategoriesApi = async (ctx) => {
  const page = parseInt(ctx.request.query.page)
  const limit = parseInt(ctx.request.query.limit)
  ctx.state = await getBookCategories(page, limit)
}

/**
 * * @api {get} 获取书籍分类详情
 * @apiVersion 1.0.0
 * @apiName 获取书籍分类详情接口
 * @apiGroup BookCategory
 *
 * @apiParam {Number} categoryId 书籍分类id
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
const getBookCategoryApi = async (ctx) => {
  const categoryId = parseInt(ctx.request.query.category_id)
  ctx.state =  await getBookCategory(categoryId)
}

/**
 * @api {post} 增加书籍分类
 * @apiVersion 1.0.0
 * @apiName 增加书籍分类接口
 * @apiGroup BookCategory
 *
 * @apiParam {Number} category_name 书籍分类名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '书籍分类新增成功',
 *   data: {
 *     category_id: 1,
 *     category_name: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '书籍分类新增失败'
 * }
 */
const addBookCategoryApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await addBookCategory(data)
}

/**
 * @api {put} 修改书籍分类
 * @apiVersion 1.0.0
 * @apiName 修改书籍分类接口
 * @apiGroup BookCategory
 *
 * @apiParam {Number} category_id 书籍分类id
 * @apiParam {Number} category_name 书籍分类名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '书籍分类修改成功',
 *   data: {
 *     category_id: 1,
 *     category_name: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '书籍分类修改失败'
 * }
 */
const updateBookCategoryApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await updateBookCategory(data)
}

/**
 * @api {delete} 删除书籍分类
 * @apiVersion 1.0.0
 * @apiName 删除书籍分类接口
 * @apiGroup BookCategory
 *
 * @apiParam {Number} category_id 书籍分类id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '书籍分类删除成功'
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '书籍分类删除失败'
 * }
 */
const deleteBookCategoryApi = async (ctx) => {
  const categoryId = ctx.params.category_id
  ctx.state = await deleteBookCategory(categoryId)
}
module.exports = {
  getBookCategoriesApi,
  getBookCategoryApi,
  addBookCategoryApi,
  updateBookCategoryApi,
  deleteBookCategoryApi
}

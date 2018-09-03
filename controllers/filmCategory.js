// category controller
const {getFilmCategories, getFilmCategory, addFilmCategory, updateFilmCategory, deleteFilmCategory} = require('../modules/filmCategory')

/**
 * @api {get} 获取电影分类列表
 * @apiVersion 1.0.0
 * @apiName 获取电影分类列表接口
 * @apiGroup FilmCategory
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
const getFilmCategoriesApi = async (ctx) => {
  const page = parseInt(ctx.request.query.page)
  const limit = parseInt(ctx.request.query.limit)
  ctx.state = await getFilmCategories(page, limit)
}

/**
 * * @api {get} 获取电影分类详情
 * @apiVersion 1.0.0
 * @apiName 获取电影分类详情接口
 * @apiGroup FilmCategory
 *
 * @apiParam {Number} categoryId 电影分类id
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
const getFilmCategoryApi = async (ctx) => {
  const categoryId = parseInt(ctx.request.query.category_id)
  ctx.state =  await getFilmCategory(categoryId)
}

/**
 * @api {post} 增加电影分类
 * @apiVersion 1.0.0
 * @apiName 增加电影分类接口
 * @apiGroup FilmCategory
 *
 * @apiParam {Number} category_name 电影分类名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '电影分类新增成功',
 *   data: {
 *     category_id: 1,
 *     category_name: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '电影分类新增失败'
 * }
 */
const addFilmCategoryApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await addFilmCategory(data)
}

/**
 * @api {put} 修改电影分类
 * @apiVersion 1.0.0
 * @apiName 修改电影分类接口
 * @apiGroup FilmCategory
 *
 * @apiParam {Number} category_id 电影分类id
 * @apiParam {Number} category_name 电影分类名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '电影分类修改成功',
 *   data: {
 *     category_id: 1,
 *     category_name: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '电影分类修改失败'
 * }
 */
const updateFilmCategoryApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await updateFilmCategory(data)
}

/**
 * @api {delete} 删除电影分类
 * @apiVersion 1.0.0
 * @apiName 删除电影分类接口
 * @apiGroup FilmCategory
 *
 * @apiParam {Number} category_id 电影分类id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '电影分类删除成功'
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '电影分类删除失败'
 * }
 */
const deleteFilmCategoryApi = async (ctx) => {
  const categoryId = ctx.params.category_id
  ctx.state = await deleteFilmCategory(categoryId)
}
module.exports = {
  getFilmCategoriesApi,
  getFilmCategoryApi,
  addFilmCategoryApi,
  updateFilmCategoryApi,
  deleteFilmCategoryApi
}

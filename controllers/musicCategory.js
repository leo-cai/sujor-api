// category controller
const {getMusicCategories, getMusicCategory, addMusicCategory, updateMusicCategory, deleteMusicCategory} = require('../modules/musicCategory')

/**
 * @api {get} 获取音乐分类列表
 * @apiVersion 1.0.0
 * @apiName 获取音乐分类列表接口
 * @apiGroup MusicCategory
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
const getMusicCategoriesApi = async (ctx) => {
  const page = parseInt(ctx.request.query.page)
  const limit = parseInt(ctx.request.query.limit)
  ctx.state = await getMusicCategories(page, limit)
}

/**
 * * @api {get} 获取音乐分类详情
 * @apiVersion 1.0.0
 * @apiName 获取音乐分类详情接口
 * @apiGroup MusicCategory
 *
 * @apiParam {Number} categoryId 音乐分类id
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
const getMusicCategoryApi = async (ctx) => {
  const categoryId = parseInt(ctx.request.query.category_id)
  ctx.state =  await getMusicCategory(categoryId)
}

/**
 * @api {post} 增加音乐分类
 * @apiVersion 1.0.0
 * @apiName 增加音乐分类接口
 * @apiGroup MusicCategory
 *
 * @apiParam {Number} category_name 音乐分类名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '音乐分类新增成功',
 *   data: {
 *     category_id: 1,
 *     category_name: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '音乐分类新增失败'
 * }
 */
const addMusicCategoryApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await addMusicCategory(data)
}

/**
 * @api {put} 修改音乐分类
 * @apiVersion 1.0.0
 * @apiName 修改音乐分类接口
 * @apiGroup MusicCategory
 *
 * @apiParam {Number} category_id 音乐分类id
 * @apiParam {Number} category_name 音乐分类名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '音乐分类修改成功',
 *   data: {
 *     category_id: 1,
 *     category_name: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '音乐分类修改失败'
 * }
 */
const updateMusicCategoryApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await updateMusicCategory(data)
}

/**
 * @api {delete} 删除音乐分类
 * @apiVersion 1.0.0
 * @apiName 删除音乐分类接口
 * @apiGroup MusicCategory
 *
 * @apiParam {Number} category_id 音乐分类id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '音乐分类删除成功'
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '音乐分类删除失败'
 * }
 */
const deleteMusicCategoryApi = async (ctx) => {
  const categoryId = ctx.params.category_id
  ctx.state = await deleteMusicCategory(categoryId)
}
module.exports = {
  getMusicCategoriesApi,
  getMusicCategoryApi,
  addMusicCategoryApi,
  updateMusicCategoryApi,
  deleteMusicCategoryApi
}

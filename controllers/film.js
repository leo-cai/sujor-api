// film controller
const {getFilms, getFilm, addFilm, updateFilm, deleteFilm} = require('../modules/film')

/**
 * @api {get} 获取电影列表
 * @apiVersion 1.0.0
 * @apiName 获取电影列表接口
 * @apiGroup Film
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
 *       film_id: 1,
 *       titile: '',
 *       updated_time: 1531288719067,
 *       created_time: 1531288719067,
 *       ...
 *     }
 *   ]
 * }
 */
const getFilmsApi = async (ctx) => {
  const page = parseInt(ctx.request.query.page)
  const limit = parseInt(ctx.request.query.limit)
  const utmSource = ctx.request.query.utm_source
  ctx.state = await getFilms(page, limit, utmSource)
}

/**
 * * @api {get} 获取电影详情
 * @apiVersion 1.0.0
 * @apiName 获取电影详情接口
 * @apiGroup Film
 *
 * @apiParam {Number} filmId 电影id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '查询成功',
 *   data: {
 *     film_id: 1,
 *     title: '',
 *     ...
 *   }
 * }
 */
const getFilmApi = async (ctx) => {
  const filmId = parseInt(ctx.request.query.film_id)
  const utmSource = ctx.request.query.utm_source
  ctx.state =  await getFilm(filmId, utmSource)
}

/**
 * @api {post} 增加电影
 * @apiVersion 1.0.0
 * @apiName 增加电影接口
 * @apiGroup Film
 *
 * @apiParam {Number} film_name 电影名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: 'film新增成功',
 *   data: {
 *     film_id: 1,
 *     title: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: 'film新增失败'
 * }
 */
const addFilmApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await addFilm(data)
}

/**
 * @api {put} 修改电影
 * @apiVersion 1.0.0
 * @apiName 修改电影接口
 * @apiGroup Film
 *
 * @apiParam {Number} film_id 电影id
 * @apiParam {Number} film_name 电影名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '电影修改成功',
 *   data: {
 *     film_id: 1,
 *     film_name: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '电影修改失败'
 * }
 */
const updateFilmApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await updateFilm(data)
}

/**
 * @api {delete} 删除电影
 * @apiVersion 1.0.0
 * @apiName 删除电影接口
 * @apiGroup Film
 *
 * @apiParam {Number} film_id 电影id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '电影删除成功'
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '电影删除失败'
 * }
 */
const deleteFilmApi = async (ctx) => {
  const filmId = ctx.params.film_id
  ctx.state = await deleteFilm(filmId)
}
module.exports = {
  getFilmsApi,
  getFilmApi,
  addFilmApi,
  updateFilmApi,
  deleteFilmApi
}

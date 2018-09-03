// music controller
const {getMusics, getMusic, addMusic, updateMusic, deleteMusic} = require('../modules/music')

/**
 * @api {get} 获取音乐列表
 * @apiVersion 1.0.0
 * @apiName 获取音乐列表接口
 * @apiGroup Music
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
 *       music_id: 1,
 *       titile: '',
 *       updated_time: 1531288719067,
 *       created_time: 1531288719067,
 *       ...
 *     }
 *   ]
 * }
 */
const getMusicsApi = async (ctx) => {
  const page = parseInt(ctx.request.query.page)
  const limit = parseInt(ctx.request.query.limit)
  const utmSource = ctx.request.query.utm_source
  ctx.state = await getMusics(page, limit, utmSource)
}

/**
 * * @api {get} 获取音乐详情
 * @apiVersion 1.0.0
 * @apiName 获取音乐详情接口
 * @apiGroup Music
 *
 * @apiParam {Number} musicId 音乐id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '查询成功',
 *   data: {
 *     music_id: 1,
 *     title: '',
 *     ...
 *   }
 * }
 */
const getMusicApi = async (ctx) => {
  const musicId = parseInt(ctx.request.query.music_id)
  const utmSource = ctx.request.query.utm_source
  ctx.state =  await getMusic(musicId, utmSource)
}

/**
 * @api {post} 增加音乐
 * @apiVersion 1.0.0
 * @apiName 增加音乐接口
 * @apiGroup Music
 *
 * @apiParam {Number} music_name 音乐名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: 'music新增成功',
 *   data: {
 *     music_id: 1,
 *     title: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: 'music新增失败'
 * }
 */
const addMusicApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await addMusic(data)
}

/**
 * @api {put} 修改音乐
 * @apiVersion 1.0.0
 * @apiName 修改音乐接口
 * @apiGroup Music
 *
 * @apiParam {Number} music_id 音乐id
 * @apiParam {Number} music_name 音乐名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '音乐修改成功',
 *   data: {
 *     music_id: 1,
 *     music_name: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '音乐修改失败'
 * }
 */
const updateMusicApi = async (ctx) => {
  const data = ctx.request.body
  const utmSource = ctx.request.query.utm_source
  ctx.state = await updateMusic(data)
}

/**
 * @api {delete} 删除音乐
 * @apiVersion 1.0.0
 * @apiName 删除音乐接口
 * @apiGroup Music
 *
 * @apiParam {Number} music_id 音乐id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '音乐删除成功'
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '音乐删除失败'
 * }
 */
const deleteMusicApi = async (ctx) => {
  const musicId = ctx.params.music_id
  ctx.state = await deleteMusic(musicId)
}
module.exports = {
  getMusicsApi,
  getMusicApi,
  addMusicApi,
  updateMusicApi,
  deleteMusicApi
}

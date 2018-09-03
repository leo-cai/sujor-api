// home controller
const {getIndexList} = require('../modules/home')

/**
 * @api {get} 获取首页列表
 * @apiVersion 1.0.0
 * @apiName 获取首页列表接口
 * @apiGroup Index
 *
 * @apiParam {Number} limit 数目
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '查询成功',
 *   total: 1,
 *   data: {
 *     codes: [],
 *     musics: [],
 *     films: [],
 *     books: []
 *   }
 * }
 */
const getIndexListApi = async (ctx) => {
  const limit = parseInt(ctx.request.query.limit)
  ctx.state = await getIndexList(limit)
}

module.exports = {
  getIndexListApi
}

// book controller
const {getBooks, getBook, addBook, updateBook, deleteBook} = require('../modules/book')

/**
 * @api {get} 获取书籍列表
 * @apiVersion 1.0.0
 * @apiName 获取书籍列表接口
 * @apiGroup Book
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
 *       book_id: 1,
 *       titile: '',
 *       updated_time: 1531288719067,
 *       created_time: 1531288719067,
 *       ...
 *     }
 *   ]
 * }
 */
const getBooksApi = async (ctx) => {
  const page = parseInt(ctx.request.query.page)
  const limit = parseInt(ctx.request.query.limit)
  const utmSource = ctx.request.query.utm_source
  ctx.state = await getBooks(page, limit, utmSource)
}

/**
 * * @api {get} 获取书籍详情
 * @apiVersion 1.0.0
 * @apiName 获取书籍详情接口
 * @apiGroup Book
 *
 * @apiParam {Number} bookId 书籍id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '查询成功',
 *   data: {
 *     book_id: 1,
 *     title: '',
 *     ...
 *   }
 * }
 */
const getBookApi = async (ctx) => {
  const bookId = parseInt(ctx.request.query.book_id)
  const utmSource = ctx.request.query.utm_source
  ctx.state =  await getBook(bookId, utmSource)
}

/**
 * @api {post} 增加书籍
 * @apiVersion 1.0.0
 * @apiName 增加书籍接口
 * @apiGroup Book
 *
 * @apiParam {Number} book_name 书籍名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: 'book新增成功',
 *   data: {
 *     book_id: 1,
 *     title: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: 'book新增失败'
 * }
 */
const addBookApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await addBook(data)
}

/**
 * @api {put} 修改书籍
 * @apiVersion 1.0.0
 * @apiName 修改书籍接口
 * @apiGroup Book
 *
 * @apiParam {Number} book_id 书籍id
 * @apiParam {Number} book_name 书籍名
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '书籍修改成功',
 *   data: {
 *     book_id: 1,
 *     book_name: ''
 *   }
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '书籍修改失败'
 * }
 */
const updateBookApi = async (ctx) => {
  const data = ctx.request.body
  ctx.state = await updateBook(data)
}

/**
 * @api {delete} 删除书籍
 * @apiVersion 1.0.0
 * @apiName 删除书籍接口
 * @apiGroup Book
 *
 * @apiParam {Number} book_id 书籍id
 * 
 * @apiSuccessExample {JSON} 返回成功示例
 * {
 *   code: 0,
 *   msg: '书籍删除成功'
 * }
 * 
 * @apiFailExample {JSON} 返回失败示例
 * {
 *   code: -1,
 *   msg: '书籍删除失败'
 * }
 */
const deleteBookApi = async (ctx) => {
  const bookId = ctx.params.book_id
  ctx.state = await deleteBook(bookId)
}
module.exports = {
  getBooksApi,
  getBookApi,
  addBookApi,
  updateBookApi,
  deleteBookApi
}

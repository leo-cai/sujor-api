// book module
const {mysql} = require('../qcloud')
const configs = require('../config')

// getBooks
const getBooks = async (page, limit, utmSource) => {
  const offset = (page - 1) * limit
  let books = []
  let results
  if (utmSource === 'admin') {
    books = await mysql('t_book').select('*').limit(limit).offset(offset).orderBy('created_time', 'desc')
    results = await mysql('t_book').count('* as total')
    return {
      code: 0,
      msg: `查询成功`,
      data: {
        total: results[0].total,
        list: books
      }
    }
  } else {
    books = await mysql('t_book').select('t_book.*', 't_user.username').leftJoin('t_user', 't_user.user_id', 't_book.user_id').limit(limit).offset(offset).where('t_book.activated', 1).andWhere('t_book.audited', 1).orderBy('t_book.created_time', 'desc')
    results = await mysql('t_book').where('activated', 1).andWhere('audited', 1).count('* as total')
    let bookList = []
    for (let i = 0; i < books.length; i++) {
      const e = books[i]
      let obj = {}
      const categories = await mysql('t_book_category')
        .select('t_book_category.category_id', 't_book_category.category_name')
        .leftJoin('t_book_category_rel', 't_book_category_rel.category_id', 't_book_category.category_id')
        .where('t_book_category_rel.book_id', e.book_id)
      obj.id = e.book_id
      obj.type = 'book'
      obj.background_url = `${configs.serverHost}background/${e.background_url}`
      obj.pre_background_url = `${configs.serverHost}background/${e.pre_background_url}`
      obj.categories = categories
      obj.title = e.title
      obj.username = e.username
      obj.summary = e.summary
      obj.created_time = e.created_time
      bookList.push(obj)
    }
    return {
      code: 0,
      msg: `查询成功`,
      data: {
        total: results[0].total,
        list: bookList
      }
    }
  }
}

// getBook
const getBook = async (bookId, utmSource) => {
  // 如果来源于前端访问 则增加点击量
  if (utmSource !== 'admin') {
    try {
      await mysql('t_book').where('book_id', bookId).increment('clicks', 1)
    } catch (error) {
      console.log(error)
      return {
        code: -1,
        msg: `访问量增加失败`
      }
    }
  }
  const books = await mysql('t_book')
    .select('t_book.*', 't_user.username')
    .leftJoin('t_user', 't_user.user_id', 't_book.user_id')
    .where('book_id', bookId)
  // search categories
  const categories = await mysql('t_book_category_rel')
    .select('t_book_category.category_id', 't_book_category.category_name')
    .leftJoin('t_book_category', 't_book_category.category_id', 't_book_category_rel.category_id')
    .where('t_book_category_rel.book_id', bookId)
  // 获取单个book
  let data = books[0] || {}
  data.background_url = `${configs.serverHost}background/${data.background_url}`
  data.pre_background_url = `${configs.serverHost}background/${data.pre_background_url}`
  data.cover = `${configs.serverHost}cover/${data.cover}`
  data.pre_cover = `${configs.serverHost}cover/${data.pre_cover}`
  data.categories = categories
  return {
    code: 0,
    msg: `查询成功`,
    data
  }
}

// addBook
const addBook = async (data) => {
  // 插入
  const createdTime = Date.now()
  const updatedTime = createdTime
  const auditedTime = createdTime
  let bookId
  try {
    await mysql('t_book').insert({
      'title': data.title, 'book_url': data.book_url, 'cover': data.cover, 'pre_cover': data.pre_cover, 'user_id': data.user_id, 'summary': data.summary, 'content': data.content, 'background_url': data.background_url, 'pre_background_url': data.pre_background_url, 'created_time': createdTime, 'updated_time': updatedTime, 'audited_time': auditedTime
    }).returning('book_id').then((res) => {
      console.log(res)
      bookId = parseInt(res)
    })
    // 插入关联数据库
    for (let i = 0; i < data.book_category_id_group.length; i++) {
      const e = data.book_category_id_group[i]
      await mysql('t_book_category_rel').insert({
        'book_id': bookId, 'category_id': e, 'created_time': createdTime, 'updated_time': updatedTime
      })
    }
    // 返回成功
    return {
      code: 0,
      msg: `新增成功`
    }
  } catch (error) {
    console.log(error)
    return {
      code: -1,
      msg: `新增失败`
    }
  }
}

// updateBook
const updateBook = async (data) => {
  // 更新
  const auditedTime = Date.now()
  try {
    await mysql('t_book').update({
      'activated': data.activated, 'audited': data.audited, 'audited_time': auditedTime
    }).where('book_id', data.book_id)
    // 返回成功
    return {
      code: 0,
      msg: `更新成功`
    }
  } catch (error) {
    console.log(error)
    return {
      code: -1,
      msg: `更新失败`
    }
  }
}

// deleteBook
const deleteBook = async (bookId) => {
  // 删除
  try {
    const deleteResults = await mysql('t_book').delete().where('book_id', bookId)
    if (deleteResults) {
      // 返回成功
      return {
        code: 0,
        msg: `删除成功`
      }
    } else {
      return {
        code: -1,
        msg: `已删除或不存在`
      }
    }
  } catch (error) {
    console.log(error)
    return {
      code: -1,
      msg: `删除失败`
    }
  }
}

module.exports = {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook
}
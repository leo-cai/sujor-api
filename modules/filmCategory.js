// filmCategory module
const {mysql} = require('../qcloud')

// getFilmCategories
const getFilmCategories = async (page, limit) => {
  const offset = (page - 1) * limit
  const roles = await mysql('t_film_category').select('*').limit(limit).offset(offset).orderBy('category_id')
  const results = await mysql('t_film_category').count('* as total')
  return {
    code: 0,
    msg: `查询成功`,
    data: {
      total: results[0].total,
      list: roles
    }
  }
}

// getFilmCategory
const getFilmCategory = async (categoryId) => {
  const results = await mysql('t_film_category').select('*').where('category_id', categoryId)
  return {
    code: 0,
    msg: `查询成功`,
    data: results[0] || {}
  }
}

// addFilmCategory
const addFilmCategory = async (data) => {
  // 查重
  const searchResults = await mysql('t_film_category').select('*').where('category_name', data.category_name)
  if (searchResults.length) {
    return {
      code: -1,
      msg: `${data.category_name}已存在`
    }
  }
  // 插入
  const createdTime = Date.now()
  const updatedTime = createdTime
  let obj = {}
  try {
    await mysql('t_film_category').insert({
      'category_name': data.category_name, 'created_time': createdTime, 'updated_time': updatedTime
    })
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

// updateFilmCategory
const updateFilmCategory = async (data) => {
  // 查重
  const searchResults = await mysql('t_film_category').select('*').where('category_name', data.category_name)
  if (searchResults.length) {
    return {
      code: -1,
      msg: `${data.category_name}已存在`
    }
  }
  // 更新
  const updatedTime = Date.now()
  try {
    await mysql('t_film_category').update({
      'category_name': data.category_name, 'updated_time': updatedTime
    }).where('category_id', data.category_id)
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

// deleteFilmCategory
const deleteFilmCategory = async (categoryId) => {
  // 删除
  try {
    const deleteResults = await mysql('t_film_category').delete().where('category_id', categoryId)
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
  getFilmCategories,
  getFilmCategory,
  addFilmCategory,
  updateFilmCategory,
  deleteFilmCategory
}

// film module
const {mysql} = require('../qcloud')
const configs = require('../config')

// getFilms
const getFilms = async (page, limit, utmSource) => {
  const offset = (page - 1) * limit
  let films = []
  let results
  if (utmSource === 'admin') {
    films = await mysql('t_film').select('*').limit(limit).offset(offset).orderBy('created_time', 'desc')
    results = await mysql('t_film').count('* as total')
    return {
      code: 0,
      msg: `查询成功`,
      data: {
        total: results[0].total,
        list: films
      }
    }
  } else {
    films = await mysql('t_film').select('t_film.*', 't_user.username').leftJoin('t_user', 't_user.user_id', 't_film.user_id').limit(limit).offset(offset).where('t_film.activated', 1).andWhere('t_film.audited', 1).orderBy('t_film.created_time', 'desc')
    results = await mysql('t_film').where('activated', 1).andWhere('audited', 1).count('* as total')
    let filmList = []
    for (let i = 0; i < films.length; i++) {
      const e = films[i]
      let obj = {}
      const categories = await mysql('t_film_category')
        .select('t_film_category.category_id', 't_film_category.category_name')
        .leftJoin('t_film_category_rel', 't_film_category_rel.category_id', 't_film_category.category_id')
        .where('t_film_category_rel.film_id', e.film_id)
      obj.id = e.film_id
      obj.type = 'film'
      obj.background_url = `${configs.serverHost}background/${e.background_url}`
      obj.pre_background_url = `${configs.serverHost}background/${e.pre_background_url}`
      obj.categories = categories
      obj.title = e.title
      obj.username = e.username
      obj.summary = e.summary
      obj.created_time = e.created_time
      filmList.push(obj)
    }
    return {
      code: 0,
      msg: `查询成功`,
      data: {
        total: results[0].total,
        list: filmList
      }
    }
  }
}

// getFilm
const getFilm = async (filmId, utmSource) => {
  // 如果来源于前端访问 则增加点击量
  if (utmSource !== 'admin') {
    try {
      await mysql('t_film').where('film_id', filmId).increment('clicks', 1)
    } catch (error) {
      console.log(error)
      return {
        code: -1,
        msg: `访问量增加失败`
      }
    }
  }
  let films = await mysql('t_film')
    .select('t_film.*', 't_user.username')
    .leftJoin('t_user', 't_user.user_id', 't_film.user_id')
    .where('film_id', filmId)
  // search categories
  const categories = await mysql('t_film_category_rel')
    .select('t_film_category.category_id', 't_film_category.category_name')
    .leftJoin('t_film_category', 't_film_category.category_id', 't_film_category_rel.category_id')
    .where('t_film_category_rel.film_id', filmId)
  // 获取单个film
  let data = films[0] || {}
  data.background_url = `${configs.serverHost}background/${data.background_url}`
  data.pre_background_url = `${configs.serverHost}background/${data.pre_background_url}`
  data.categories = categories
  return {
    code: 0,
    msg: `查询成功`,
    data
  }
}

// addFilm
const addFilm = async (data) => {
  // 插入
  const createdTime = Date.now()
  const updatedTime = createdTime
  const auditedTime = createdTime
  let filmId
  try {
    await mysql('t_film').insert({
      'title': data.title, 'user_id': data.user_id, 'film_url': data.film_url, 'summary': data.summary, 'content': data.content, 'background_url': data.background_url, 'pre_background_url': data.pre_background_url, 'created_time': createdTime, 'updated_time': updatedTime, 'audited_time': auditedTime
    }).returning('film_id').then((res) => {
      console.log(res)
      filmId = parseInt(res)
    })
    // 插入关联数据库
    for (let i = 0; i < data.film_category_id_group.length; i++) {
      const e = data.film_category_id_group[i]
      await mysql('t_film_category_rel').insert({
        'film_id': filmId, 'category_id': e, 'created_time': createdTime, 'updated_time': updatedTime
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

// updateFilm
const updateFilm = async (data) => {
  // 更新
  const auditedTime = Date.now()
  try {
    await mysql('t_film').update({
      'activated': data.activated, 'audited': data.audited, 'audited_time': auditedTime
    }).where('film_id', data.film_id)
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

// deleteFilm
const deleteFilm = async (filmId) => {
  // 删除
  try {
    const deleteResults = await mysql('t_film').delete().where('film_id', filmId)
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
  getFilms,
  getFilm,
  addFilm,
  updateFilm,
  deleteFilm
}
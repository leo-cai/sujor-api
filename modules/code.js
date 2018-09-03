// code module
const {mysql} = require('../qcloud')
const configs = require('../config')

// getCodes
const getCodes = async (page, limit, utmSource) => {
  const offset = (page - 1) * limit
  let codes = []
  let results
  // 如果来源于后端访问
  if (utmSource === 'admin') {
    codes = await mysql('t_code').select('*').limit(limit).offset(offset).orderBy('created_time', 'desc')
    results = await mysql('t_code').count('* as total')
    return {
      code: 0,
      msg: `查询成功`,
      data: {
        total: results[0].total,
        list: codes
      }
    }
  } else {
    codes = await mysql('t_code').select('t_code.*', 't_user.username').leftJoin('t_user', 't_user.user_id', 't_code.user_id').limit(limit).offset(offset).where('t_code.activated', 1).andWhere('t_code.audited', 1).orderBy('t_code.created_time', 'desc')
    results = await mysql('t_code').where('activated', 1).andWhere('audited', 1).count('* as total')
    let codeList = []
    for (let i = 0; i < codes.length; i++) {
      const e = codes[i]
      let obj = {}
      const categories = await mysql('t_code_category')
        .select('t_code_category.category_id', 't_code_category.category_name')
        .leftJoin('t_code_category_rel', 't_code_category_rel.category_id', 't_code_category.category_id')
        .where('t_code_category_rel.code_id', e.code_id)
      obj.id = e.code_id
      obj.type = 'code'
      obj.background_url = `${configs.serverHost}background/${e.background_url}`
      obj.pre_background_url = `${configs.serverHost}background/${e.pre_background_url}`
      obj.categories = categories
      obj.title = e.title
      obj.username = e.username
      obj.summary = e.summary
      obj.created_time = e.created_time
      codeList.push(obj)
    }
    return {
      code: 0,
      msg: `查询成功`,
      data: {
        total: results[0].total,
        list: codeList
      }
    }
  }
  
}

// getCode
const getCode = async (codeId, utmSource) => {
  // 如果来源于前端访问 则增加访问量
  if (utmSource !== 'admin') {
    try {
      await mysql('t_code').where('code_id', codeId).increment('clicks', 1)
    } catch (error) {
      console.log(error)
      return {
        code: -1,
        msg: `访问量增加失败`
      }
    }
  }
  let codes = await mysql('t_code')
    .select('t_code.*', 't_user.username')
    .leftJoin('t_user', 't_user.user_id', 't_code.user_id')
    .where('code_id', codeId)
  // search categories
  const categories = await mysql('t_code_category_rel')
    .select('t_code_category.category_id', 't_code_category.category_name')
    .leftJoin('t_code_category', 't_code_category.category_id', 't_code_category_rel.category_id')
    .where('t_code_category_rel.code_id', codeId)
  // 获取单个code
  let data = codes[0] || {}
  data.background_url = `${configs.serverHost}background/${data.background_url}`
  data.pre_background_url = `${configs.serverHost}background/${data.pre_background_url}`
  data.categories = categories
  return {
    code: 0,
    msg: `查询成功`,
    data
  }
}

// addCode
const addCode = async (data) => {
  // 插入
  const createdTime = Date.now()
  const updatedTime = createdTime
  const auditedTime = createdTime
  let codeId
  try {
    await mysql('t_code').insert({
      'title': data.title, 'user_id': data.user_id, 'summary': data.summary, 'content': data.content, 'background_url': data.background_url, 'pre_background_url': data.pre_background_url, 'created_time': createdTime, 'updated_time': updatedTime, 'audited_time': auditedTime
    }).returning('code_id').then((res) => {
      console.log(res)
      codeId = parseInt(res)
    })
    // 插入关联数据库
    for (let i = 0; i < data.code_category_id_group.length; i++) {
      const e = data.code_category_id_group[i]
      await mysql('t_code_category_rel').insert({
        'code_id': codeId, 'category_id': e, 'created_time': createdTime, 'updated_time': updatedTime
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

// updateCode
const updateCode = async (data) => {
  // 更新
  const auditedTime = Date.now()
  try {
    await mysql('t_code').update({
      'activated': data.activated, 'audited': data.audited, 'audited_time': auditedTime
    }).where('code_id', data.code_id)
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

// deleteCode
const deleteCode = async (codeId) => {
  // 删除
  try {
    const deleteResults = await mysql('t_code').delete().where('code_id', codeId)
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
  getCodes,
  getCode,
  addCode,
  updateCode,
  deleteCode
}
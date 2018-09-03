// role module
const {mysql} = require('../qcloud')

// getRoles
const getRoles = async (page, limit) => {
  const offset = (page - 1) * limit
  const roles = await mysql('t_role').select('*').limit(limit).offset(offset).orderBy('role_id')
  const results = await mysql('t_role').count('* as total')
  return {
    code: 0,
    msg: `查询成功`,
    data: {
      total: results[0].total,
      list: roles
    }
  }
}

// getRole
const getRole = async (roleId) => {
  const results = await mysql('t_role').select('*').where('role_id', roleId)
  return {
    code: 0,
    msg: `查询成功`,
    data: results[0] || {}
  }
}

// addRole
const addRole = async (data) => {
  // 查重
  const searchResults = await mysql('t_role').select('*').where('role_name', data.role_name)
  if (searchResults.length) {
    return {
      code: -1,
      msg: `${data.role_name}已存在`
    }
  }
  // 插入
  const createdTime = Date.now()
  const updatedTime = createdTime
  let obj = {}
  try {
    await mysql('t_role').insert({
      'role_name': data.role_name, 'created_time': createdTime, 'updated_time': updatedTime
    }).returning('role_id').then((res) => {
      obj.role_id = res[0]
      obj.role_name = data.role_name
      obj.create_time = createdTime
      obj.updated_time = updatedTime
    })
    // 返回成功
    return {
      code: 0,
      msg: `新增成功`,
      data: obj
    }
  } catch (error) {
    console.log(error)
    return {
      code: -1,
      msg: `新增失败`
    }
  }
}

// updateRole
const updateRole = async (data) => {
  // 查重
  const searchResults = await mysql('t_role').select('*').where('role_name', data.role_name)
  if (searchResults.length) {
    return {
      code: -1,
      msg: `${data.role_name}已存在`
    }
  }
  // 更新
  const updatedTime = Date.now()
  try {
    await mysql('t_role').update({
      'role_name': data.role_name, 'updated_time': updatedTime
    }).where('role_id', data.role_id)
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

// deleteRole
const deleteRole = async (roleId) => {
  // 删除
  try {
    const deleteResults = await mysql('t_role').delete().where('role_id', roleId)
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
  getRoles,
  getRole,
  addRole,
  updateRole,
  deleteRole
}
// permission module
const {mysql} = require('../qcloud')

// getPermissions
const getPermissions = async (page, limit) => {
  const offset = (page - 1) * limit
  const permissions = await mysql('t_permission').select('*').limit(limit).offset(offset).orderBy('permission_id')
  const results = await mysql('t_permission').count('* as total')
  return {
    code: 0,
    msg: `查询成功`,
    data: {
      total: results[0].total,
      list: permissions
    }
  }
}

// getPermission
const getPermission = async (permissionId) => {
  const results = await mysql('t_permission').select('*').where('permission_id', permissionId)
  return {
    code: 0,
    msg: `查询成功`,
    data: results[0] || {}
  }
}

// addPermission
const addPermission = async (data) => {
  // 查重
  const searchResults = await mysql('t_permission').select('*').where('permission_name', data.permission_name)
  if (searchResults.length) {
    return {
      code: -1,
      msg: `${data.permission_name}已存在`
    }
  }
  // 插入
  const createdTime = Date.now()
  const updatedTime = createdTime
  let obj = {}
  try {
    await mysql('t_permission').insert({
      'permission_name': data.permission_name, 'created_time': createdTime, 'updated_time': updatedTime
    }).returning('permission_id').then((res) => {
      obj.permission_id = res[0]
      obj.permission_name = data.permission_name
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

// updatePermission
const updatePermission = async (data) => {
  // 查重
  const searchResults = await mysql('t_permission').select('*').where('permission_name', data.permission_name)
  if (searchResults.length) {
    return {
      code: -1,
      msg: `${data.permission_name}已存在`
    }
  }
  // 更新
  const updatedTime = Date.now()
  try {
    await mysql('t_permission').update({
      'permission_name': data.permission_name, 'updated_time': updatedTime
    }).where('permission_id', data.permission_id)
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

// deletePermission
const deletePermission = async (permissionId) => {
  // 删除
  try {
    const deleteResults = await mysql('t_permission').delete().where('permission_id', permissionId)
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
  getPermissions,
  getPermission,
  addPermission,
  updatePermission,
  deletePermission
}
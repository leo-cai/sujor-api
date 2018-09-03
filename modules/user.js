// user module
const {mysql} = require('../qcloud')

// getUsers
const getUsers = async (page, limit) => {
  const offset = (page - 1) * limit
  const users = await mysql('t_user').select('user_id', 'username', 'activated', 'disabled', 'created_time', 'updated_time', 'signed_time').limit(limit).offset(offset).orderBy('user_id')
  const results = await mysql('t_user').count('* as total')
  return {
    code: 0,
    msg: `查询成功`,
    data: {
      total: results[0].total,
      list: users
    }
  }
}

// getUser
const getUser = async (userId) => {
  const results = await mysql('t_user').select('user_id', 'username', 'activated', 'disabled', 'created_time', 'updated_time', 'signed_time').where('user_id', userId)
  let data = results[0]
  const roles = await mysql('t_role')
    .select('t_role.role_id', 't_role.role_name')
    .leftJoin('t_user_role_rel', 't_role.role_id', 't_user_role_rel.role_id')
    .where('t_user_role_rel.user_id', userId)
  console.log(roles)
  data.roles = roles
  return {
    code: 0,
    msg: `查询成功`,
    data: data || {}
  }
}

// updateUser
const updateUser = async (data) => {
  // 更新
  const updatedTime = Date.now()
  try {
    await mysql('t_user').update({
      'disabled': data.disabled, 'activated': data.activated, 'updated_time': updatedTime
    }).where('user_id', data.user_id)
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

module.exports = {
  getUsers,
  getUser,
  updateUser
}

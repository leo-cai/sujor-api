// auth 登录与鉴权
const {mysql} = require('../qcloud')
const configs = require('../config')
const {signToken, encryptPassword} = require('../utils/encrypt')

// signIn
const signIn = async (data) => {
  // 数据校验
  if (data.username.length < 3) {
    return {
      code: -1,
      msg: `用户名长度应大于3个字符`
    }
  } else if (data.password.length < 6) {
    return {
      code: -1,
      msg: `密码长度应大于6个字符`
    }
  }
  // 密码加密
  let password = encryptPassword(data.password)
  // 查找数据库记录 如果没有数据 则返回用户名或密码不正确
  const result = await mysql('t_user').select().where('username', data.username).andWhere('password', password)
  if (result.length <= 0) {
    return {
      code: -1,
      msg: `用户名或密码不正确`
    }
  } else {
    // 如果有数据 则返回用户信息 并 登录成功
    let token = signToken(data.username, configs.secret, configs.expires)
    return {
      code: 0,
      msg: `登录成功`,
      data: {
        user_id: result[0].user_id,
        username: result[0].username,
        avatar: result[0].avatar === null ? '' : `${configs.serverHost}avatar/${result[0].avatar}`,
        signed_time: result[0].signed_time,
        token: token,
        expires: configs.expires
      }
    }
  }
}

// signUp
const signUp = async (data) => {
  // 数据校验
  if (data.username.length < 3) {
    return {
      code: -1,
      msg: `用户名长度应大于3个字符`
    }
  } else if (data.password !== data.repassword) {
    return {
      code: -1,
      msg: `两次密码不相同`
    }
  } else if (data.password.length < 6) {
    return {
      code: -1,
      msg: `密码长度应大于6个字符`
    }
  }
  // 查重
  const result = await mysql('t_user').select().where('username', data.username)
  if (result.length) {
    return {
      code: -1,
      msg: `用户已存在`
    }
  }
  // 密码加密
  let password = encryptPassword(data.password)
  // 获取当前时间
  let createdTime = Date.now()
  let updatedTime = createdTime
  let signedTime = createdTime
  // 插入数据库
  try {
    await mysql('t_user').insert({
      'username': data.username, 'password': password, 'created_time': createdTime, 'updated_time': updatedTime, 'signed_time': signedTime
    })
    return {
      code: 0,
      msg: `${data.username}注册成功`
    }
  } catch (error) {
    console.error(error)
    return {
      code: -1,
      msg: `注册失败`
    }
  }
}

// signOut
const signOut = async (data) => {
  try {
    await mysql('t_user').update('signed_time', Date.now()).where('username', data.username)
    return {
      code: 0,
      msg: `注销成功`
    }
  } catch (error) {
    console.error(error)
    return {
      code: -1,
      msg: `注销失败`
    }
  }
}

module.exports = {
  signIn,
  signUp,
  signOut
}

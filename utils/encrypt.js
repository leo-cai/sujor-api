const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const configs = require('../config')

// jwt_token 签名
const signToken = (username, secret, expires) => {
  const token = jwt.sign({
    username: username
  }, secret, {
    expiresIn: expires * 24 * 3600
  })
  console.log(token)
  return token
}

// 验证token是否有效
const checkToken = async (ctx, next) => {
  const authorization = ctx.request.get('Authorization')
  if (!authorization) {
    ctx.response.status = 401
    ctx.state = {
      code: -2,
      msg: '登录已失效，请重新登录'
    }
    return
  }
  const token = authorization.split(' ')[1]
  try {
    const payload = jwt.verify(token, configs.secret)
    ctx.username = payload.username
    await next()
  } catch (err) {
    console.log(err)
    ctx.response.status = 401
    ctx.state = {
      code: -2,
      msg: '没有权限'
    }
  }
}

// 密码加密 md5 base64
const encryptPassword = (password) => {
  const encryptKey = configs.encryptKey
  let md5 = crypto.createHash('md5')
  md5.update(password + encryptKey)
  let result = md5.digest('base64')
  return result
}

// encriptUrl
const encriptUrl = (url) => {
  const type = url.substring(url.lastIndexOf('.'))
  const filename = url.substring(0, url.lastIndexOf('.'))
  let md5 = crypto.createHash('md5')
  md5.update(filename + Date.now())
  const newFilename = md5.digest('hex')
  return newFilename + type
}

module.exports = {
  signToken,
  checkToken,
  encryptPassword,
  encriptUrl
}

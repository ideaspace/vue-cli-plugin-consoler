const jwt = require('jsonwebtoken')
const pkg = require('./../../../package')
module.exports = (token) => {
  // 验证用户 token 是否合法
  let decode = null
  try {
    decode = jwt.verify(token, pkg.name)
  } catch (e) {
  }
  return decode
}

/*
* https://jwt.io/introduction/
*
* https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4
*
* https://stackoverflow.com/questions/44133536/is-it-safe-to-store-a-jwt-in-localstorage-with-reactjs
*
* https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage
* */

const Users = require('../daos/users');
const jwt = require('jsonwebtoken');
const omit = require('lodash/omit');
const pkg = require('./../../../package');

module.exports = (app) => {
  // Log in a user with a username and password
  app.post('/api/login', (request, response) => {
    Users.authenticate(request.body)
      .then((user) => {
        const token = jwt.sign({
          userAccount: request.body.userAccount,
        }, pkg.name, {
          expiresIn: '1h'
        })
        response.cookie('token', token)
        const currentUser = Users.findBy('userAccount', request.body.userAccount)
        response.json({
          code: 0,
          data: omit(currentUser, ['password'])
        })
      })
      .catch((error) => {
        response.status(200).json({ code: 403, msg: '用户名或密码错误' })
      })
  })

  app.post('/api/logout', (request, response) => {
    response.clearCookie('token').json({
      code: 0
    })
  })
}

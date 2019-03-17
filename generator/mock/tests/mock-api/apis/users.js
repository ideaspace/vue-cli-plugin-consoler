const Users = require('../daos/users');
const verifyToken = require('./../utils/verifyToken')
module.exports = (app) => {
  app.get('/api/users/current', (request, response) => {

    const token = verifyToken(request.cookies.token)

    if (!token) {
      response.status(200).json({code: 401})
    } else {
      const matchedUser = Users.findBy('userAccount', token.userAccount)

      if (!matchedUser) {
        return response.status(200).json({
          code: 400,
          msg: 'No user with this name was found.',
        })
      }
      response.json({
        code: 0,
        data: matchedUser
      })
    }
  })
}

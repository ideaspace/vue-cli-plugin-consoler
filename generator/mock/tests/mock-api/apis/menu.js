const Menus = require('../daos/menu');
const verifyToken = require('./../utils/verifyToken')
module.exports = (app) => {
  app.get('/api/menu', (request, response) => {
    const token = verifyToken(request.cookies.token)
    if (!token) {
      response.status(200).json({code: 401})
    } else {
      const menuTree = Menus.findAll();
      response.json({
        code: 0,
        data: menuTree
      })
    }
  })
}

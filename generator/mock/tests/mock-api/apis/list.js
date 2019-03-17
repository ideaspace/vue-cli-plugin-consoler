const List = require('../daos/list');
const verifyToken = require('./../utils/verifyToken');
module.exports = (app) => {
  app.get('/api/list', (request, response) => {
    const token = verifyToken(request.cookies.token);
    if (!token) {
      response.status(200).json({code: 401});
    } else {
      const tableList = List.findAll();
      response.json({
        code: 0,
        data: tableList
      })
    }
  })
}

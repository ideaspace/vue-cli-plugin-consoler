const List = require('../daos/app');
const verifyToken = require('./../utils/verifyToken');
module.exports = (app) => {
  app.get('/api/appList', (request, response) => {
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
  app.get('/api/appItem', (request, response) => {
    const token = verifyToken(request.cookies.token);
    if (!token) {
      response.status(200).json({code: 401});
    } else {
      const tableList = List.find();
      response.json({
        code: 0,
        data: tableList
      })
    }
  })
}

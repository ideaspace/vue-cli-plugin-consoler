const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(cookieParser());

  fs.readdirSync(path.join(__dirname, 'apis')).forEach((apiFileName) => {
    if (/\.js$/.test(apiFileName)) {
      require(`./apis/${apiFileName}`)(app);
    }
  });
};

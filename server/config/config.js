require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'pix-up',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false
  }

};

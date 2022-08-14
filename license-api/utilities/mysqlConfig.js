var config = require("./config").config;
var mysql = require("mysql");
const Sequelize = require("sequelize");

var connection = mysql.createConnection({
  host: config.DB_URL_MYSQL.host,
  user: config.DB_URL_MYSQL.user,
  password: config.DB_URL_MYSQL.password,
  database: config.DB_URL_MYSQL.database,
});

connection.connect(() => {
  //require("../models/license.model").initialize();
  //require("../models/user.model").initialize();
  //require("../models/roll.model").initialize();
});

let getDB = () => {
  return connection;
};

module.exports = {
  getDB: getDB,
};

var config = require("./config");
var mysql = require("mysql");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.dbconfig.db,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }
);

var connection = mysql.createConnection({
  host: config.dbconfig.DB_URL_MYSQL.host,
  user: config.dbconfig.DB_URL_MYSQL.user,
  password: config.dbconfig.DB_URL_MYSQL.password,
  database: config.dbconfig.DB_URL_MYSQL.database,
});

connection.connect(() => {
  require("../models/license.model").initialize(sequelize, Sequelize);
  require("../models/user.model").initialize(sequelize, Sequelize);
  require("../models/role.model").initialize(sequelize, Sequelize);
});

let getDB = () => {
  return connection;
};

module.exports = {
  getDB: getDB,
};

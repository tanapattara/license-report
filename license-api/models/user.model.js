let initialize = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });
  return User;
};

let dbConfig = require("../utilities/mysqlConfig");

let getUsersFromDB = (criteria, callback) => {
  dbConfig
    .getDB()
    .query(`SELECT username,email FROM users`, criteria, callback);
};

let getUserFromDB = (criteria, callback) => {
  let conditions = "";
  criteria.id ? (conditions += ` and id = '${criteria.id}'`) : true;
  dbConfig.getDB().query(`SELECT * FROM users WHERE 1 ${conditions}`, callback);
};

let deleteUserFromDB = (criteria, callback) => {
  let conditions = "";
  criteria.id ? (conditions += ` and id = '${criteria.id}'`) : true;
  dbConfig.getDB().query(`delete from users where 1 ${conditions}`, callback);
};
module.exports = {
  initialize: initialize,
  getUserFromDB: getUserFromDB,
  getUsersFromDB: getUsersFromDB,
  deleteUserFromDB: deleteUserFromDB,
};

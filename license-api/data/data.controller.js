let dbConfig = require("../utilities/mysqlConfig");

let getColor = (criteria, callback) => {
  dbConfig
    .getDB()
    .query(`SELECT color FROM licenses GROUP BY color;`, criteria, callback);
};
let getProvince = (criteria, callback) => {
  dbConfig
    .getDB()
    .query(
      `SELECT province FROM licenses GROUP BY Province;`,
      criteria,
      callback
    );
};
let getBrand = (criteria, callback) => {
  dbConfig
    .getDB()
    .query(`SELECT brand FROM licenses GROUP BY brand`, criteria, callback);
};

module.exports = {
  getColor: getColor,
  getProvince: getProvince,
  getBrand: getBrand,
};

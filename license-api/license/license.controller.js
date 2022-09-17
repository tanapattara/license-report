let dbConfig = require("../utilities/mysqlConfig");

let getLicense = (criteria, callback) => {
  dbConfig
    .getDB()
    .query(`SELECT * FROM license ORDER BY aDate DESC`, criteria, callback);
};

let getLicenseByID = (criteria, callback) => {
  let conditions = "";
  criteria.id ? (conditions += ` and id = '${criteria.id}'`) : true;
  dbConfig
    .getDB()
    .query(
      `SELECT * FROM license WHERE 1 ${conditions} ORDER BY aDate DESC`,
      callback
    );
};
let getLicenseToday = (criteria, callback) => {
  dbConfig
    .getDB()
    .query(
      `SELECT * FROM license WHERE CAST(aDate AS DATE) = CAST(CURRENT_TIMESTAMP AS DATE) ORDER BY aDate DESC;`,
      criteria,
      callback
    );
};
let getLicenseWithParams = (criteria, callback) => {
  dbConfig
    .getDB()
    .query(`SELECT * FROM license ORDER BY aDate DESC`, criteria, callback);
};
module.exports = {
  getLicense: getLicense,
  getLicenseByID: getLicenseByID,
  getLicenseToday: getLicenseToday,
  getLicenseWithParams: getLicenseWithParams,
};

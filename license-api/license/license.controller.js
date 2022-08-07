let dbConfig = require("../utilities/mysqlConfig");

let getLicense = (criteria, callback) => {
  dbConfig
    .getDB()
    .query(`SELECT * FROM licenses ORDER BY aDate DESC`, criteria, callback);
};

let getLicenseByID = (criteria, callback) => {
  let conditions = "";
  criteria.id ? (conditions += ` and id = '${criteria.id}'`) : true;
  dbConfig
    .getDB()
    .query(
      `SELECT * FROM licenses WHERE 1 ${conditions} ORDER BY aDate DESC`,
      callback
    );
};

module.exports = {
  getLicense: getLicense,
  getLicenseByID: getLicenseByID,
};

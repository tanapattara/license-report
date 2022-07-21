let dbConfig = require("../utilities/mysqlConfig");

let getLicense = (criteria, callback) => {
  dbConfig.getDB().query(`SELECT * FROM licenses WHERE 1`, criteria, callback);
};

let getLicenseByID = (criteria, callback) => {
  let conditions = "";
  criteria.id ? (conditions += ` and id = '${criteria.id}'`) : true;
  dbConfig
    .getDB()
    .query(`SELECT * FROM licenses WHERE 1 ${conditions}`, callback);
};

module.exports = {
  getLicense: getLicense,
  getLicenseByID: getLicenseByID,
};

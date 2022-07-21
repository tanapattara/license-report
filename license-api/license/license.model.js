let mysqlConfig = require("../utilities/mysqlConfig");

let initialize = () => {
  //mysqlConfig.getDB().query("create table IF NOT EXISTS CREATE TABLE licenses");
};

module.exports = {
  initialize: initialize,
};

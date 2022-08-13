let initialize = (sequelize, Sequelize) => {
  //mysqlConfig.getDB().query("create table IF NOT EXISTS CREATE TABLE licenses");
  const license = sequelize.define("licenses", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    LicNo: {
      type: Sequelize.STRING,
    },
    Province: {
      type: Sequelize.STRING,
    },
    Color: {
      type: Sequelize.STRING,
    },
    Brand: {
      type: Sequelize.STRING,
    },
    Location: {
      type: Sequelize.STRING,
    },
    Path1: {
      type: Sequelize.STRING,
    },
    Path2: {
      type: Sequelize.STRING,
    },
    aDate: {
      type: Sequelize.STRING,
    },
    bDate: {
      type: Sequelize.STRING,
    },
    Speed: {
      type: Sequelize.INTEGER,
    },
    Type: {
      type: Sequelize.STRING,
    },
    Reserve1: {
      type: Sequelize.STRING,
    },
  });
  return license;
};

module.exports = {
  initialize: initialize,
};

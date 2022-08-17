let initialize = (sequelize, Sequelize) => {
  //mysqlConfig.getDB().query("create table IF NOT EXISTS CREATE TABLE licenses");
  const license = sequelize.define("license", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      type: Sequelize.TEXT,
    },
    Path2: {
      type: Sequelize.TEXT,
    },
    aDate: {
      type: Sequelize.DATE,
    },
    bDate: {
      type: Sequelize.DATE,
    },
    Speed: {
      type: Sequelize.STRING,
    },
    Type: {
      type: Sequelize.STRING,
    },
    Reserve1: {
      type: Sequelize.TEXT,
    },
    
  },{
    timestamps: false,
    freezeTableName: true});
  return license;
};

module.exports = {
  initialize: initialize,
};

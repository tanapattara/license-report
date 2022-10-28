const db = require("../models");
const License = db.license;
const lController = require("../license/license.controller");
const { array } = require("joi");
const { QueryTypes } = require("sequelize");

exports.getAllLicense = async (req, res) => {
  try {
    const licenses_data = await License.findAll();
    res.status(200).send(licenses_data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

checkandadd = (arrData) => {
  if (isNaN(arrData)) {
    return 1;
  } else {
    return arrData + 1;
  }
};

isbike = (type) => {
  return type == "7" || type == "9";
};
exports.getDashboard = async (req, res) => {
  try {
    const allrec = await db.sequelize.query(
      "SELECT count(id) AS data FROM license;",
      { type: QueryTypes.SELECT }
    );
    const bike = await db.sequelize.query(
      "SELECT count(id) AS data FROM license WHERE Type = '7' OR Type = '8';",
      { type: QueryTypes.SELECT }
    );
    const speed = await db.sequelize.query(
      "SELECT avg(Speed) AS data FROM license;",
      {
        type: QueryTypes.SELECT,
      }
    );
    const overspeed_all = await db.sequelize.query(
      "SELECT count(id) AS data FROM license WHERE CONVERT(Speed, SIGNED) > 50;",
      {
        type: QueryTypes.SELECT,
      }
    );
    const overspeed_bike = await db.sequelize.query(
      "SELECT count(id) AS data FROM license WHERE CONVERT(Speed, SIGNED) > 50 AND (Type = '7' OR Type = '8');",
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).send({
      all: allrec[0].data,
      car: allrec[0].data - bike[0].data,
      bike: bike[0].data,
      avg_speed: speed[0].data,
      overspeed_all: overspeed_all[0].data,
      overspeed_bike: overspeed_bike[0].data,
      overspeed_car: overspeed_all[0].data - overspeed_bike[0].data,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.getGraphDashboard = async (reg, res) => {
  var hour = [];
  var hBike = [];
  var hCar = [];
  var mBike = [];
  var mCar = [];
  var dBike = [];
  var dCar = [];
  try {
    const licenses_data = await License.findAll();
    //loop for hour
    licenses_data.forEach((element) => {
      var d = new Date(element.aDate);

      if (isbike(element.Type)) {
        mBike[d.getMonth()] = checkandadd(mBike[d.getMonth()]);
        dBike[d.getDay()] = checkandadd(dBike[d.getDay()]);
        hBike[d.getHours()] = checkandadd(hBike[d.getHours()]);
      } else {
        mCar[d.getMonth()] = checkandadd(mCar[d.getMonth()]);
        dCar[d.getDay()] = checkandadd(dCar[d.getDay()]);
        hCar[d.getHours()] = checkandadd(hCar[d.getHours()]);
      }
    });

    res.status(200).send({
      hour_bike: hBike,
      hour_car: hCar,
      dayofweek_bike: dBike,
      dayofweek_car: dCar,
      month_bike: mBike,
      month_car: mCar,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateLicense = async (req, res) => {
  try {
    const updatedRows = await License.update(
      {
        LicNo: req.body.LicNo,
        Province: req.body.Province,
        Speed: req.body.Speed,
        Color: req.body.Color,
        bDate: new Date(),
      },
      { where: { ID: req.body.ID } }
    );

    res.status(201).send({ message: `data update successful` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

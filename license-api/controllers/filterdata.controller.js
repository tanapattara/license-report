const { queue } = require("async");
const db = require("../models");
const License = db.license;

exports.getDataColor = async (req, res) => {
  try {
    const [results, metadata] = await db.sequelize.query(
      "SELECT color FROM license GROUP BY color;"
    );
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.getDataProvice = async (req, res) => {
  try {
    const [results, metadata] = await db.sequelize.query(
      "SELECT province FROM license GROUP BY province;"
    );
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.getDataBrand = async (req, res) => {
  try {
    const [results, metadata] = await db.sequelize.query(
      "SELECT brand FROM license GROUP BY brand;"
    );
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.getDataLocation = async (req, res) => {
  try {
    const [results, metadata] = await db.sequelize.query(
      "SELECT location FROM license GROUP BY location;"
    );
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.getToday = async (req, res) => {
  try {
    const [results, metadata] = await db.sequelize.query(
      "SELECT * FROM license WHERE CAST(aDate AS DATE) = CAST(CURRENT_TIMESTAMP AS DATE) ORDER BY aDate DESC;"
    );
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.getLicenseWithParams = async (req, res) => {
  const q = req.query;
  try {
    const [results, metadata] = await db.sequelize.query(
      `
      SELECT * FROM license WHERE color like '${
        q.color == "All" ? "%" : q.color
      }'
        AND province like '${q.province == "All" ? "%" : q.province}'
        AND location like '${q.location == "All" ? "%" : q.location}'
        AND licno like '${q.licno == "All" ? "%" : "%" + q.licno + "%"}'
        AND (adate BETWEEN '${
          q.startdate == "All" ? "2000-01-01" : q.startdate
        }' AND ${q.enddate == "All" ? "NOW()" : "'" + q.enddate + "'"})
        and TIME_TO_SEC(TIME(adate)) BETWEEN TIME_TO_SEC('${
          q.starthour == "All" ? "00:00" : q.starthour
        }:00') AND TIME_TO_SEC('${
        q.endhour == "All" ? "23:59:59" : q.endhour + ":00"
      }')
        AND CAST(speed AS UNSIGNED) >= ${q.minspeed == "All" ? "0" : q.minspeed}
        AND CAST(speed AS UNSIGNED) <= ${
          q.maxspeed == "All" ? "999" : q.maxspeed
        } 
        ORDER BY adate DESC
      `
    );
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
function search(element, index, array) {
  console.log(element, index, array);
}

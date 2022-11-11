const { queue } = require("async");
const db = require("../models");
let dbConfig = require("../utilities/mysqlConfig");

exports.getData = async (req, res) => {
  const q = req.query;
  try {
    const [results, metadata] = await db.sequelize.query(`
    SELECT * FROM peoplecount WHERE channel = ${
      q.channel
    } AND (starttime BETWEEN '${
      q.startdate == "All" ? "2000-01-01" : q.startdate
    }' AND ${q.enddate == "All" ? "NOW()" : "'" + q.enddate + "'"})`);

    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

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

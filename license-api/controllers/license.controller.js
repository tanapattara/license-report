const db = require("../models");
const License = db.license;
const lController = require("../license/license.controller");

exports.getAllLicense = async (req, res) => {
  try {
    const licenses_data = await License.findAll();
    res.status(200).send(licenses_data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

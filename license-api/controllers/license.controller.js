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

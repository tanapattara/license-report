const { authJwt } = require("../middleware");
const controller = require("../controllers/license.controller");
const licenseService = require("../license/license.service");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  app.get("/license", controller.getAllLicense);
  app.get("/today", (req, res) => {
    licenseService.getLicenseToday(req.query, (data) => {
      res.send(data);
    });
  });
};

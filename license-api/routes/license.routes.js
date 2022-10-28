const { authJwt } = require("../middleware");
const licenseController = require("../controllers/license.controller");
const filterController = require("../controllers/filterdata.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  app.get("/license", licenseController.getAllLicense);
  app.put("/license", licenseController.updateLicense);
  app.get("/dashboard", licenseController.getDashboard);
  app.get("/graphdashboard", licenseController.getGraphDashboard);
  app.get("/filter", filterController.getLicenseWithParams);
  app.get("/today", filterController.getToday);
};

const { authJwt } = require("../middleware");
const controller = require("../controllers/license.controller");
const filterController = require("../controllers/filterdata.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  app.get("/license", controller.getAllLicense);
  app.put("/license", controller.updateLicense);
  app.get("/filter", filterController.getLicenseWithParams);
  app.get("/today", filterController.getToday);
};

const { authJwt } = require("../middleware");
const controller = require("../controllers/filterdata.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  app.get("/color", controller.getDataColor);
  app.get("/province", controller.getDataProvice);
  app.get("/brand", controller.getDataBrand);
};

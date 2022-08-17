const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  app.get("/user", userController.getUsers);
  app.post("/user", [verifySignUp.checkDuplicateUsernameOrEmail], authController.signup);
  // -----------------------------------------------------------
  app.get("/api/test/all", userController.allAccess);
  app.get("/api/test/user", [authJwt.verifyToken], userController.userBoard);
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    userController.moderatorBoard
  );
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );
};

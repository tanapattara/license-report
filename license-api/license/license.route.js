let express = require("express"),
  router = express.Router(),
  licenseService = require("./license.service");

/**Api to get the list of license */
router.get("/", (req, res) => {
  licenseService.getLicense(req.query, (data) => {
    res.send(data);
  });
});

// /**API to get the license by id... */
router.get("/:id", (req, res) => {
  licenseService.getLicenseByID(req.query, (data) => {
    res.send(data);
  });
});

module.exports = router;

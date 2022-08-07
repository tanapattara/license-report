let express = require("express"),
  router = express.Router(),
  dataService = require("./data.service");

router.get("/province", (req, res) => {
  dataService.getProvince(req.query, (data) => {
    res.send(data);
  });
});

router.get("/color", (req, res) => {
  dataService.getColor(req.query, (data) => {
    res.send(data);
  });
});

router.get("/brand", (req, res) => {
  dataService.getBrand(req.query, (data) => {
    res.send(data);
  });
});

module.exports = router;

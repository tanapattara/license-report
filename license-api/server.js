let app = require("express")(),
  server = require("http").Server(app),
  bodyParser = require("body-parser");
(express = require("express")),
  (cors = require("cors")),
  (http = require("http")),
  (path = require("path"));

let licenseRoute = require("./license/license.route");
let dataRoute = require("./data/data.route");
let util = require("./utilities/util");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(function (err, req, res, next) {
  return res.send({
    statusCode: util.statusCode.ONE,
    statusMessage: util.statusMessage.SOMETHING_WENT_WRONG,
  });
});

app.use("/license", licenseRoute);
app.use("/data", dataRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next();
});

/*first API to check if server is running**/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/index.html"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

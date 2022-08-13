let app = require("express")().json(),
  server = require("http").Server(app),
  bodyParser = require("body-parser");
(express = require("express")),
  (cors = require("cors")),
  (http = require("http")),
  (path = require("path"));

const cookieSession = require("cookie-session");

let licenseRoute = require("./license/license.route");
let dataRoute = require("./data/data.route");
let util = require("./utilities/util");

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "license-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
  })
);

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

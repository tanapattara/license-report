const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require("path");
const app = express();

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "license-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: "strict",
  })
);

const db = require("./models");
// db.sequelize.sync();
const Role = db.role;
//initial();
// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Database with { force: true }");
//   initial();
// });

/*first API to check if server is running**/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/index.html"));
});

// routes
const userRouter = require("./routes/user.routes");
app.use("/user", userRouter);
require("./routes/auth.routes")(app);
require("./routes/license.routes")(app);
require("./routes/filterdata.routes")(app);

process.on("uncaughtException", (err, origin) => {
  console.log(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
exports.getUsers = (req, res) => {
  getAlluser(req.query, (data) => {
    res.send(data);
  });
};
let async = require("async");
let getAlluser = (data, callback) => {
  async.auto(
    {
      article: (cb) => {
        getUsersFromDB({}, (err, data) => {
          if (err) {
            cb(null, {
              errorCode: util.statusCode.INTERNAL_SERVER_ERROR,
              statusMessage: util.statusMessage.SERVER_BUSY,
            });
            return;
          }
          cb(null, data);
          return;
        });
      },
    },
    (err, response) => {
      callback(response.article);
    }
  );
};
let dbConfig = require("../utilities/mysqlConfig");
let getUsersFromDB = (criteria, callback) => {
  dbConfig
    .getDB()
    .query(`SELECT id, username, firstname, lastname, email, phone FROM users`, criteria, callback);
};

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
exports.getUser = (req, res) => {
  getUserById(req.query, (data) => {
    res.send(data);
  });
};
exports.delete = (req, res) => {
  deleteUser(req.query, (data) => {
    res.send(data);
  });
};
let async = require("async");
let userModel = require("../models/user.model");
// get all user
let getAlluser = (data, callback) => {
  async.auto(
    {
      article: (cb) => {
        userModel.getUsersFromDB({}, (err, data) => {
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
// get user by id
let getUserById = (data, callback) => {
  async.auto(
    {
      article: (cb) => {
        userModel.getUsersFromDB({}, (err, data) => {
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
// delete
let deleteUser = (data, callback) => {
  async.auto(
    {
      article: (cb) => {
        userModel.deleteUserFromDB({}, (err, data) => {
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

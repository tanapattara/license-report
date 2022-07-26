const db = require("../models");
const user = db.user;
const util = require("../utilities/util");

exports.getUsers = (req, res) => {
  getAlluser(req.query, (data) => {
    res.send(data);
  });
};
exports.updateUser = async (req, res) => {
  try {
    const updatedRows = await user.update(
      {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
      },
      { where: { id: req.body.id } }
    );
    var sql = "UPDATE user_roles SET roleId = ? WHERE userId = ?";
    dbConfig.getDB().query(sql, [req.body.role, req.body.id]);

    res.status(201).send({ message: `data update successful` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteUser = async (userid, res) => {
  try {
    console.log(userid);
    await user.destroy({ where: { id: userid } });
    res.status(200).send({ message: `data delete successful` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

let async = require("async");
let updateUser = (data, callback) => {
  async.auto(
    {
      article: (cb) => {},
    },
    (err, response) => {
      callback(response.article);
    }
  );
};
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
  //dbConfig.getDB().query(`SELECT * FROM users`, criteria, callback);
  dbConfig
    .getDB()
    .query(
      `SELECT users.*, user_roles.roleId as role FROM users LEFT JOIN user_roles ON users.id = user_roles.userId;`,
      criteria,
      callback
    );
};
let updateUserToDB = (criteria, callback) => {
  dbConfig.getDB().query(``, callback);
};

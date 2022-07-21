let async = require("async");

let util = require("../utilities/util"),
  licenstController = require("./license.controller");
//config = require("../Utilities/config").config;

/***API to get the license list */
let getLicense = (data, callback) => {
  async.auto(
    {
      article: (cb) => {
        licenstController.getLicense({}, (err, data) => {
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

/***API to get the license detail by id */
let getLicenseByID = (data, callback) => {
  async.auto(
    {
      article: (cb) => {
        let criteria = {
          id: data.id,
        };
        licenstController.getLicenseByID(criteria, (err, data) => {
          if (err) {
            console.log(err, "error----");
            cb(null, {
              errorCode: util.statusCode.INTERNAL_SERVER_ERROR,
              statusMessage: util.statusMessage.SERVER_BUSY,
            });
            return;
          }
          cb(null, data[0]);
          return;
        });
      },
    },
    (err, response) => {
      callback(response.article);
    }
  );
};

module.exports = {
  getLicense: getLicense,
  getLicenseByID: getLicenseByID,
};

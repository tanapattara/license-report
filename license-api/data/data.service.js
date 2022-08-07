let async = require("async");

let util = require("../utilities/util"),
  dataController = require("./data.controller");
/***API to get the color in db*/
let getColor = (data, callback) => {
  async.auto(
    {
      article: (cb) => {
        dataController.getColor({}, (err, data) => {
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

/***API to get the province in db*/
let getProvince = (data, callback) => {
  async.auto(
    {
      article: (cb) => {
        dataController.getProvince({}, (err, data) => {
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
/***API to get the brand in db*/
let getBrand = (data, callback) => {
  async.auto(
    {
      article: (cb) => {
        dataController.getBrand({}, (err, data) => {
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
module.exports = {
  getColor: getColor,
  getProvince: getProvince,
  getBrand: getBrand,
};

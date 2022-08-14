let environment = "dev";

let serverURLs = {
  dev: {
    NODE_SERVER: "http://localhost",
    NODE_SERVER_PORT: "3000",
    MYSQL_HOST: "localhost",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "",
    MYSQL_DATABASE: "licensedb",
  },
};

let config = {
  DB_URL_MYSQL: {
    host: `${serverURLs[environment].MYSQL_HOST}`,
    user: `${serverURLs[environment].MYSQL_USER}`,
    password: `${serverURLs[environment].MYSQL_PASSWORD}`,
    database: `${serverURLs[environment].MYSQL_DATABASE}`,
  },
  NODE_SERVER_PORT: {
    port: `${serverURLs[environment].NODE_SERVER_PORT}`,
  },
  NODE_SERVER_URL: {
    url: `${serverURLs[environment].NODE_SERVER}`,
  },
};

let secret = "bezkoder-secret-key";

module.exports = {
  config: config,
  secret: secret,
  HOST: serverURLs.dev.MYSQL_HOST,
  USER: serverURLs.dev.MYSQL_USER,
  PASSWORD: serverURLs.dev.MYSQL_PASSWORD,
  DB: serverURLs.dev.MYSQL_DATABASE,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

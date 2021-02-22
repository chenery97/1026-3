/*
  所有服务器和数据库的配置
 */
const isDev = process.env.NODE_ENV === "development";

// mongodb的配置
const MONGO_CONFIG = {
  port: 27017,
  host: "localhost",
  database: "react_dbs",
};
// 服务器配置
let SERVER_CONFIG = {
  port: 80,
  host: "0.0.0.0",
};

if (isDev) {
  SERVER_CONFIG = {
    port: 5000,
    host: "localhost",
  };
}

// github oauth
const CLIENT_ID = "cb862da50a4563f157db";
const CLIENT_SECRET = "4e4348b545b9eb7bbdf09c887f5080ceb8e588f8";

const SECRET = "A0D2af~.dsa";

module.exports = {
  MONGO_CONFIG,
  SERVER_CONFIG,
  SECRET,
  CLIENT_ID,
  CLIENT_SECRET,
};

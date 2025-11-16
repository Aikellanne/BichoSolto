const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "M0ng0U@323al",
  database: "bichosolto_db",
});

module.exports = db;

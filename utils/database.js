const db = require("mysql2");

const pool = db.createPool({
  host: "localhost",
  user: "root",
  password: "asdf",
  database: "blog_app",
});

module.exports = pool.promise();

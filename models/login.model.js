const sql = require("../database/db.js");

checkAttempt = (userEmail, result) => {
  sql.query(`SELECT * FROM users WHERE email="${userEmail}"`, (err, res) => {
    if (err) {
      console.log(`error: ${err}`);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log(`User found: ${res[0]}`);
      return result(null, res);
    }
    result({ kind: "not_found" }, null);
  });
};

module.exports = checkAttempt;

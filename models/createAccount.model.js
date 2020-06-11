const sql = require("../database/db.js");

const User = function (user) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.email = user.email;
  this.password = user.password;
  this.number = user.number;
  this.checked = user.checked;
};

User.create = (newUser, result) => {
  sql.query(`INSERT INTO users SET?`, newUser, (err, res) => {
    if (err) {
      console.log(`error: ${err}`);
      result(err, null);
      return;
    }
    console.log("User created ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.viewOne = (userEmail, result) => {
  sql.query(`SELECT * FROM users WHERE email="${userEmail}"`, (err, res) => {
    if (err) {
      console.log(`error: ${err}`);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log(`User found: ${JSON.stringify(res)}`);
      result(null, res);
    }
    result({ kind: "not_found" }, null);
  });

  User.remove = (email, result) => {
    sql.query(`DELETE FROM users WHERE email="${email}"`, (err, res) => {
      if (err) {
        console.log(`error: ${err}`);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Deleted User: ");
      result(null, res);
    });
  };
};

// User.viewAll = (result) => {
//   sql.query(`SELECT * FROM users`, (err, res) => {
//     if (err) {
//       console.log(`err: ${err}`);
//       result(err, null);
//       return;
//     }

//     console.log(`Available Users: ${result}`);
//     result(null, res);
//   });
// };

module.exports = User;

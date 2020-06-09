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
  console.log("for this place", newUser);
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
};

User.viewAll = (result) => {
  sql.query(`SELECT * FROM users`, (err, res) => {
    if (err) {
      console.log(`err: ${err}`);
      result(err, null);
      return;
    }

    console.log(`Available Users: ${result}`);
    result(null, res);
  });
};

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

// Car.viewAll = (result) => {
//     sql.query(
//         // `SELECT * FROM vehicles
//         // `,
//         `SELECT *
//         FROM vehicles
//         JOIN design_and_exterior ON vehicles.id = design_and_exterior.vehicles_id`,
//         (err, res) => {
//       if (err) {
//         console.log(`err: ${err}`);
//         result(err, null);
//         return;
//       }

//       console.log(`Available Cars: ${res}`);

//       result(null, res);
//     });
//   };

// Car.update = (carId, carUpdateInfo, result) => {
//   sql.query(
//     `UPDATE vehicles SET name=?, price=?, model=?, year=?, fuel=?, transmission=?, engine =?, homePageImageDisplay=?, productPageCarousel_1=?, productPageCarousel_2=?, productPageCarousel_3=?, productPageCarousel_4=?, productPageCarousel_5=?   WHERE id=${carId}`,
//     [
//       carUpdateInfo.name,
//       carUpdateInfo.price,
//       carUpdateInfo.model,
//       carUpdateInfo.year,
//       carUpdateInfo.fuel,
//       carUpdateInfo.transmission,
//       carUpdateInfo.engine,
//       carUpdateInfo.homePageImageDisplay,
//       carUpdateInfo.productPageCarousel_1,
//       carUpdateInfo.productPageCarousel_2,
//       carUpdateInfo.productPageCarousel_3,
//       carUpdateInfo.productPageCarousel_4,
//       carUpdateInfo.productPageCarousel_5,
//     ],
//     (err, res) => {
//       if (err) {
//         console.log(`err: ${err}`);
//         result(err, null);
//         return;
//       }
//       if (res.affectedRows == 0) {
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("Updated Product: ");
//       result(null, { id: carId, ...carUpdateInfo });
//     }
//   );
// };

module.exports = User;

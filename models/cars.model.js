const sql = require("../database/db.js");

const Car = function (car) {
  this.name = car.name;
  this.price = car.price;
  this.model = car.model;
  this.year = car.year;
  this.fuel = car.fuel;
  this.transmission = car.transmission;
  this.engine = car.engine;
  this.homePageImageDisplay = car.homePageImageDisplay;
  this.productPageCarousel_1 = car.productPageCarousel_1;
  this.productPageCarousel_2 = car.productPageCarousel_2;
  this.productPageCarousel_3 = car.productPageCarousel_3;
  this.productPageCarousel_4 = car.productPageCarousel_4;
  this.productPageCarousel_5 = car.productPageCarousel_5;
  this.category = car.category;
  this.categoryLink = car.categoryLink;
};

console.log("Hello");
console.log("Bello");

Car.create = (newCar, result) => {
  sql.query(`INSERT INTO vehicles SET?`, newCar, (err, res) => {
    if (err) {
      console.log(`error: ${err}`);
      result(err, null);
      return;
    }
    console.log("Car added: ", { id: res.insertId, ...newCar });
    result(null, { id: res.insertId, ...newCar });
  });
};

Car.viewOne = (carId, result) => {
  sql.query(`SELECT * FROM vehicles WHERE id=${carId}`, (err, res) => {
    if (err) {
      console.log(`error: ${err}`);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log(`Car found: ${res[0]}`);
      result(null, res);
    }
    result({ kind: "not_found" }, null);
  });
};

// Car.viewAll = (result) => {
//   sql.query(`SELECT * FROM vehicles`, (err, res) => {
//     if (err) {
//       console.log(`err: ${err}`);
//       result(err, null);
//       return;
//     }

//     console.log(`Available Cars: ${result}`);

//     result(null, res);
//   });
// };
// JOIN design_and_exterior ON vehicles.id = design_and_exterior.vehicles_id`,

Car.viewAll = (result) => {
  sql.query(
    // `SELECT * FROM vehicles
    // `,
    `SELECT *
        FROM vehicles`,
    (err, res) => {
      if (err) {
        console.log(`err: ${err}`);
        result(err, null);
        return;
      }

      console.log(`Available Cars: ${res}`);

      result(null, res);
    }
  );
};

Car.update = (carId, carUpdateInfo, result) => {
  sql.query(
    `UPDATE vehicles SET name=?, price=?, model=?, year=?, fuel=?, transmission=?, engine =?, homePageImageDisplay=?, productPageCarousel_1=?, productPageCarousel_2=?, productPageCarousel_3=?, productPageCarousel_4=?, productPageCarousel_5=?   WHERE id=${carId}`,
    [
      carUpdateInfo.name,
      carUpdateInfo.price,
      carUpdateInfo.model,
      carUpdateInfo.year,
      carUpdateInfo.fuel,
      carUpdateInfo.transmission,
      carUpdateInfo.engine,
      carUpdateInfo.homePageImageDisplay,
      carUpdateInfo.productPageCarousel_1,
      carUpdateInfo.productPageCarousel_2,
      carUpdateInfo.productPageCarousel_3,
      carUpdateInfo.productPageCarousel_4,
      carUpdateInfo.productPageCarousel_5,
    ],
    (err, res) => {
      if (err) {
        console.log(`err: ${err}`);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated Product: ");
      result(null, { id: carId, ...carUpdateInfo });
    }
  );
};

Car.remove = (carId, result) => {
  sql.query(`DELETE FROM vehicles WHERE id=${carId}`, (err, res) => {
    if (err) {
      console.log(`error: ${err}`);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Deleted Product: ");
    result(null, res);
  });
};

module.exports = Car;

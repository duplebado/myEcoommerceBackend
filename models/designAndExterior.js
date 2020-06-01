const sql = require("../database/db.js");

const DesignAndInterior = function (dAndT) {
  this.vehicles_id = car.name;
  this.id_1 = dAndT.id_1;
  this.id_2 = dAndT.id_2;
  this.id_3 = dAndT.id_3;
  this.id_4 = dAndT.id_4;
  this.id_5 = dAndT.id_5;
  this.id_6 = dAndT.id_6;
  this.id_7 = dAndT.id_7;
  this.info_1 = dAndT.info_1;
  this.info_2 = dAndT.info_2;
  this.info_3 = dAndT.info_3;
  this.info_4 = dAndT.info_4;
  this.info_5 = dAndT.info_5;
  this.info_6 = dAndT.info_6;
  this.info_7 = dAndT.info_7;
};

DesignAndInterior.create = (newDAndT, result) => {
  sql.query(`INSERT INTO design_and_exterior SET?`, newDAndT, (err, res) => {
    if (err) {
      console.log(`error: ${err}`);
      result(err, null);
      return;
    }
    console.log("Design and Interior added: ", { id: res.insertId, ...newDAndT });
    result(null, { id: res.insertId, ...newDAndT });
  });
};

DesignAndInterior.viewOne = (carId, result) => {
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

Car.viewAll = (result) => {
  sql.query(`SELECT * FROM vehicles`, (err, res) => {
    if (err) {
      console.log(`err: ${err}`);
      result(err, null);
      return;
    }

    console.log(`Available Cars: ${result}`);

    result(null, res);
  });
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

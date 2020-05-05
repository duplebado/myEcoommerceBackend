const sql = require('../database/db.js');

const Car = function(car){
    this.name = car.name;
    this.model = car.model;
    this.year = car.year;
    this.price = car.price;
    this.home_image_display_link = car.home_image_display_link;
}

Car.create = (newCar, result) => {
    sql.query(`INSERT INTO cars SET?`, newCar, (err,res) => {
        if(err){
            console.log(`error: ${err}`)
            result(err,null)
            return
        }
        console.log("Car added: ", { id: res.name, ...newCar });
        result(null, { id: res.name, ...newCar });
    })
}

Car.viewOne = (carId, result) => {
    sql.query(`SELECT * FROM cars WHERE id=${carId}`, (err, res) => {
        if(err){
            console.log(`error: ${err}`)
            result(err, null)
            return
        }
        if(res.length){
            console.log(`Car found: ${res[0]}`)
            result(null, res)
        }
        result({kind: "not_found"}, null)


    })
}

Car.viewAll = (result) => {
    sql.query(`SELECT * FROM cars`, (err, res) => {
        if(err){
            console.log(`err: ${err}`)
            result(err, null)
            return
        }

        console.log(`Available Cars: ${result}`)

        result(null, res)
    })
}

Car.update = (carId, carUpdateInfo, result) => {
    sql.query(
    `UPDATE cars SET name=?, model=?, year=?, price=?, home_image_display_link=? WHERE id=${carId}`,
    [carUpdateInfo.name, carUpdateInfo.model, carUpdateInfo.year, carUpdateInfo.price, carUpdateInfo.home_image_display_link],
    (err,res) => {
        if(err){
            console.log(`err: ${err}`)
            result(err, null)
            return
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Updated Product: ");
        result(null, { id: carId, ...carUpdateInfo });
    })
};

Car.remove = (carId, result) => {
    sql.query(`DELETE FROM cars WHERE id=${carId}`, (err,res) => {
        if(err){
            console.log(`error: ${err}`)
            result(err, null)
            return
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted Product: ");
        result(null, res);
    })
};

module.exports = Car;
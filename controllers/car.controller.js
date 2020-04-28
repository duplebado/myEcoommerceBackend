const Car = require('../models/cars.model.js');

const create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "form cannot be empty. Enter a value please"
        })
    }

    const car = new Car({
      name: req.body.name, 
      model: req.body.model, 
      year: req.body.year, 
      price: req.body.price, 
      home_image_display_link: req.body.home_image_display_link
    });

    Car.create(car, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Some error occured while adding your products",
          });
        else res.send(data);
      });
};

const viewOne = (req,res) => {
    Car.viewOne(req.params.carId, (err,data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({message: `Not found car with id ${req.params.carId}.`,});
          } else {
            res.status(500).send({message: `Error retrieving car with id ${req.params.carId}`});      
          }
        }else {
          res.send(data);
        }
    })
}

const viewAll = (req, res) => {
    Car.viewAll((err, data) => {
        if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cars.",
        });
      else res.send(data);
    })
};

const update = (req,res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    Car.update(req.params.carId, new Car(req.body),(err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res
                .status(404)
                .send({
                  message: `Not found Product with id ${req.params.carId}.`,
                });
              return;
            } else {
              res
                .status(500)
                .send({
                  message: "Error updating product with id " + req.params.carId,
                });
              return;
            }
        } else {
            res.send(data);
        }
    });
};

const remove = (req,res) => {
    Car.remove(req.params.carId, (err,data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({message: `Not found Product with id ${req.params.carId}.`});
            } else {
                res.status(500).send({message: `Could not delete product with id ${req.params.carId}.`});
            }
        } else {
            res.send({ message: `product was deleted successfully!` })
        };
    });
}

module.exports = {
    create,
    viewOne,
    viewAll,
    update,
    remove
}
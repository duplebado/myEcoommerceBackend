const Car = require("../models/cars.model.js");

const create = (req, res) => {
  console.log(req.file);
  if (!req.body) {
    res.status(400).send({
      message: "form cannot be empty. Enter a value please",
    });
  }
  const car = new Car({
    name: req.body.name,
    price: req.body.price,
    model: req.body.model,
    year: req.body.year,
    fuel: req.body.fuel,
    transmission: req.body.transmission,
    engine: req.body.engine,
    homePageImageDisplay: req.files[0].path,
    productPageCarousel_1: req.files[1].path,
    productPageCarousel_2: req.files[2].path,
    productPageCarousel_3: req.files[3].path,
    productPageCarousel_4: req.files[4].path,
    productPageCarousel_5: req.files[5].path,
    // category: req.body.category,
    // productPageCarousel_1: req.body.productPageCarousel_1,
    // productPageCarousel_2: req.body.productPageCarousel_2,
    // productPageCarousel_3: req.body.productPageCarousel_3,
    // productPageCarousel_4: req.body.productPageCarousel_4,
    // productPageCarousel_5: req.body.productPageCarousel_5
  });
  console.log("my car", car);
  Car.create(car, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while adding your car",
      });
    else res.send(data);
  });
};

const viewOne = (req, res) => {
  Car.viewOne(req.params.carId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({ message: `Not found car with id ${req.params.carId}.` });
      } else {
        res.status(500).send({
          message: `Error retrieving car with id ${req.params.carId}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

const viewAll = (req, res) => {
  Car.viewAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cars.",
      });
    else res.send(data);
  });
};

const update = (req, res) => {
  console.log(req);
  // console.log("(((THIS IS REQUEST.BODY " + req.body + " REQUEST.BODY)))")
  // console.log("(((THIS IS REQUEST.FILES " + req.files + " REQUEST.FILES)))")

  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  Car.update(req.params.carId, new Car(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.carId}.`,
        });
        return;
      } else {
        res.status(500).send({
          message: "Error updating product with id " + req.params.carId,
        });
        return;
      }
    } else {
      res.send(data);
    }
  });
};

const remove = (req, res) => {
  Car.remove(req.params.carId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({ message: `Not found Product with id ${req.params.carId}.` });
      } else {
        res.status(500).send({
          message: `Could not delete product with id ${req.params.carId}.`,
        });
      }
    } else {
      res.send({ message: `product was deleted successfully!` });
    }
  });
};

module.exports = {
  create,
  viewOne,
  viewAll,
  update,
  remove,
};

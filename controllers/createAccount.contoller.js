const User = require("../models/createAccount.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "form cannot be empty. Enter a value please",
    });
  }
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    number: req.body.number,
    checked: req.body.checked,
  });
  let salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
  console.log("password", user.password);

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while adding new user",
      });
    else {
      const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
        expiresIn: 3600, // 1min
      });
      console.log("token", token);
      res.status(200).json({
        data,
        token,
      });
    }
  });
};

const viewOne = (req, res) => {
  User.viewOne(req.params.userEmail, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({ message: `User with email ${req.params.userEmail} not found.`});
      } else {
        res.status(500).send({
          message: `Error retrieving user with id ${req.params.userEmail}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

const viewAll = (req, res) => {
  User.viewAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

// const update = (req, res) => {
//   console.log(req);
//   // console.log("(((THIS IS REQUEST.BODY " + req.body + " REQUEST.BODY)))")
//   // console.log("(((THIS IS REQUEST.FILES " + req.files + " REQUEST.FILES)))")

//   if (!req.body) {
//     res.status(400).send({ message: "Content can not be empty!" });
//   }

//   Car.update(req.params.carId, new Car(req.body), (err, data) => {

//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Product with id ${req.params.carId}.`,
//         });
//         return;
//       } else {
//         res.status(500).send({
//           message: "Error updating product with id " + req.params.carId,
//         });
//         return;
//       }
//     } else {
//       res.send(data);
//     }
//   });
// };

// const remove = (req, res) => {
//   Car.remove(req.params.carId, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res
//           .status(404)
//           .send({ message: `Not found Product with id ${req.params.carId}.` });
//       } else {
//         res.status(500).send({
//           message: `Could not delete product with id ${req.params.carId}.`,
//         });
//       }
//     } else {
//       res.send({ message: `product was deleted successfully!` });
//     }
//   });
// };

module.exports = {
  create,
  viewOne,
    viewAll,
  //   update,
  //   remove,
};

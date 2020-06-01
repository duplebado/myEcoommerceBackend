const checkAttempt = require("../models/dashboard.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const check = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "form cannot be empty. Enter a value please",
    });
  }
  const attempt = {
    email: req.body.email,
    password: req.body.password,
  };

  checkAttempt(attempt["email"], (err, data) => {
    console.log(attempt["email"]);
    if (err)
      res.status(401).send({
        message: "invalid login details",
      });
    else {
      // res.status(200).json(data);
      const pass = data[0].password;
      const userData = {
        id: data[0].id,
        firstname: data[0].firstname,
        lastname: data[0].lastname,
        email: data[0].email,
        number: data[0].number,
      };
      // bcrypt.compareSync()
      bcrypt.compare(attempt["password"], pass).then(function (result) {
        if (result) {
          delete pass;
          // console.log("this point HERE "+ data)
          // console.log(pass)
          console.log("FOR THIS PLACE " + JSON.stringify(data[0]));

          const token = jwt.sign(userData, process.env.TOKEN_SECRET, {
            expiresIn: 3600, // 1min
          });
          res.status(200).send({
            message: "Successful authentication",
            token,
            userData,
          });
        } else {
          res.status(401).send({
            message: "invalid login details",
          });
        }
      });
    }
  });
};

module.exports = {
  check,
};

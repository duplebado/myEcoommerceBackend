const User = require("../models/createAccount.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const transporter = require("../transporter.js");

const create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "form cannot be empty. Enter a value please",
    });
  }

  User.viewOne(req.body.email, (err, data) => {
    if (data) {
      return res.status(400).send({
        message: "Email already exists",
      });
    } else {
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
        if (err) {
          return res.status(500).send({
            message: err.message || "Some error occured while adding new user",
          });
        } else {
          const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
            expiresIn: 3600, // 1min
          });
          const url = `http://localhost:8080/email-confirmation/${token}`;

          const HelperOptions = {
            from: "Gbogbonise Online Carshop <adebadousky@gmail.com>",
            to: user.email,
            subject: "Gbogbonise Account confirmation",
            html: `please click this to confirm your account with us: <a href="${url}">${url}</a>`,
          };

          transporter
            .sendMail(HelperOptions)
            .then((info) => {
              return res.status(200).json({
                user,
                token,
                message: `Welcome ${user.firstname}! Please check your email and click the confirmation link before proceeding`,
              });
            })
            .catch((err) => {
              console.log(err);
              User.remove(user.email, (err, data) => {
                if (err) {
                  return res.status(500).send({
                    message:
                      err.message || "Some error occured while deleting user",
                  });
                } else {
                  res.status(200).send({
                    message: "User deleted successfully",
                  });
                }
              });
            });
        }
      });
    }
  });
};

module.exports = {
  create,
};

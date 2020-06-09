const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 25,
  auth: {
    user: "adebadousky@gmail.com",
    pass: "jidiamond",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;

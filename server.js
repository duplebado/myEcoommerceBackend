const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const nodemailer = require("nodemailer");
// var cloudinary = require("cloudinary").v2;
// const fileUpload = require("express-fileupload")

require("dotenv").config();
const app = express();
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const corsOptions = {
  origin: [
    "https://gbogboniseonlinecarshop.netlify.com/",
    "http://localhost:8080",
  ],
  methods: ["POST", "PATCH", "PUT"],
  // credentials: true,
  maxAge: 3600,
};
app.use(function (req, response, next) {
  // response.setHeader("Access-Control-Allow-Origin", "https://shopman.netlify.app");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hi there, app is running!");
});
console.log("Hi");
require("./routes/car.routes.js")(app);
require("./routes/createAccount.routes.js")(app);
require("./routes/login.routes.js")(app);

const PORT = process.env.PORT || 2500;

app.listen(PORT, () => {
  console.log(`....running on port ${PORT}`);
});

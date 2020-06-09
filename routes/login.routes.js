module.exports = (app) => {
  const { check } = require("../controllers/login.controller.js");

  app.post("/login", check);
};

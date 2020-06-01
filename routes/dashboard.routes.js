module.exports = (app) => {
  const {check} = require("../controllers/dashboard.controller.js");

  app.post("/login", check);
};

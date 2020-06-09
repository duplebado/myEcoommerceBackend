module.exports = (app) => {
  const User = require("../controllers/createAccount.controller");
  // const verifyToken = require("../middlewares/verifyToken");

  app.post("/create-account", User.create);

  // app.get('/dashboard', verifyToken, User.viewAll);

  // app.get('/dashboard/:userEmail', verifyToken, User.viewOne);

  // app.put('/order/:orderId', Order.update);

  // app.delete('/order/:orderId', Order.remove);
};

module.exports = (app) => {
  const Car = require("../controllers/car.controller.js");
  const upload = require("../configuration/uploads.js");

  app.post("/car", upload.array("homePageImageDisplay", 12), Car.create);

  app.get("/car", Car.viewAll);

  // app.get("/car/:carId", Car.viewOne);

  // app.put("/car/:carId", Car.update);

  // app.delete("/car/:carId", Car.remove);
};

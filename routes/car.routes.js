const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("file type not accepted"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
// console.log("my upload", upload);
module.exports = (app) => {
  const Car = require("../controllers/car.controller.js");

  app.post("/car", upload.array("homePageImageDisplay", 12), Car.create);

  app.get("/car", Car.viewAll);

  app.get("/car/:carId", Car.viewOne);

  app.put("/car/:carId", Car.update);

  app.delete("/car/:carId", Car.remove);
};

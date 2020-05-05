module.exports = (app) => {
    const Car = require('../controllers/car.controller.js')

    app.post('/car', Car.create);

    app.get('/car', Car.viewAll);

    app.get('/car/:carId', Car.viewOne);

    app.put('/car/:carId', Car.update);

    app.delete('/car/:carId', Car.remove);
}
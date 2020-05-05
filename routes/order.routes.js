module.exports = (app) => {
    const Order = require('../controllers/orders.controller.js')

    app.post('/order', Order.create);

    app.get('/order', Order.viewAll);

    app.get('/order/:orderId', Order.viewOne);

    app.put('/order/:orderId', Order.update);

    app.delete('/order/:orderId', Order.remove);
}
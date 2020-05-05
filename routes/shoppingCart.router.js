module.exports = (app) => {
    const Cart = require('../controllers/shoppingCart.controller.js')

    app.post('/cart', Cart.create);

    app.get('/cart', Cart.viewAll);

    app.get('/cart/:cartId', Cart.viewOne);

    app.put('/cart/:cartId', Cart.update);

    app.delete('/cart/:cartId', Cart.remove);
}
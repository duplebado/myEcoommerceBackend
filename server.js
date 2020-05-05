const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send("Hi there, app is running!")
})

require('./routes/car.routes.js')(app);
require('./routes/order.routes.js')(app);
require('./routes/shoppingCart.router.js')(app);

app.listen(2500, () => {
    console.log("....running on port 2500")
});

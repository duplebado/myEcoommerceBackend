const sql = require('../database/db.js');

const Order = function(order){
    this.products_purchased  = order.products_purchased;
    this.user_information    = order.user_information;
    this.delivery_address    = order.delivery_address;
    this.delivery_time       = order.delivery_time;
    this.payment_information = order.payment_information;
}

Order.create = (newOrder, result) => {
    sql.query(`INSERT INTO orders SET?`, newOrder, (err,res) => {
        if(err){
            console.log(`error: ${err}`)
            result(err,null)
            return
        }
        console.log("Order created: ", { id: res.products_purchased, ...newOrder });
        result(null, { id: res.products_purchased, ...newOrder });
    })
}

Order.viewOne = (orderId, result) => {
    sql.query(`SELECT * FROM orders WHERE id=${orderId}`, (err, res) => {
        if(err){
            console.log(`error: ${err}`)
            result(err, null)
            return
        }
        if(res.length){
            console.log(`Order found: ${res[0]}`)
            result(null, res)
        }
        result({kind: "not_found"}, null)
    });
};

Order.viewAll = (result) => {
    sql.query(`SELECT * FROM orders`, (err, res) => {
        if(err){
            console.log(`err: ${err}`)
            result(err, null)
            return
        }

        console.log(`Available Orders: ${result}`)

        result(null, res)
    })
}

Order.update = (orderId, orderUpdateInfo, result) => {
    sql.query(
    `UPDATE orders SET products_purchased=?,  user_information=?, delivery_address=?,   delivery_time=?, payment_information=? WHERE id=${orderId}`,
    [orderUpdateInfo.products_purchased, orderUpdateInfo.user_information, orderUpdateInfo.delivery_address, orderUpdateInfo.delivery_time, orderUpdateInfo.payment_information],
    (err,res) => {
        if(err){
            console.log(`err: ${err}`)
            result(err, null)
            return
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Updated Product: ");
        result(null, { id: orderId, ...orderUpdateInfo });
    })
};

Order.remove = (orderId, result) => {
    sql.query(`DELETE FROM orders WHERE id=${orderId}`, (err,res) => {
        if(err){
            console.log(`error: ${err}`)
            result(err, null)
            return
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted Products: ");
        result(null, res);
    })
};

module.exports = Order;
const sql = require('../database/db.js');

const Cart = function(cart){
    this.item = cart.item;
}

Cart.create = (newCart, result) => {
    sql.query(`INSERT INTO cart SET?`, newCart, (err,res) => {
        if(err){
            console.log(`error: ${err}`)
            result(err,null)
            return
        }
        console.log("item added to Cart: ", { id: res.item, ...newCart });
        result(null, { id: res.item, ...newCart });
    })
}

Cart.viewOne = (cartId, result) => {
    sql.query(`SELECT * FROM cart WHERE id=${cartId}`, (err, res) => {
        if(err){
            console.log(`error: ${err}`)
            result(err, null)
            return
        }
        if(res.length){
            console.log(`item found in Cart: ${res[0]}`)
            result(null, res)
        }
        result({kind: "not_found"}, null)


    })
}

Cart.viewAll = (result) => {
    sql.query(`SELECT * FROM cart`, (err, res) => {
        if(err){
            console.log(`err: ${err}`)
            result(err, null)
            return
        }

        console.log(`Available Cars in cart: ${result}`)

        result(null, res)
    })
}

Cart.update = (cartId, cartUpdateInfo, result) => {
    sql.query( `UPDATE cart SET item=? WHERE id=${cartId}`,[cartUpdateInfo.item],(err,res) => {
        if(err){
            console.log(`err: ${err}`)
            result(err, null)
            return
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Updated Cart: ");
        result(null, { id: cartId, ...cartUpdateInfo });
    })
};

Cart.remove = (cartId, result) => {
    sql.query(`DELETE FROM cart WHERE id=${cartId}`, (err,res) => {
        if(err){
            console.log(`error: ${err}`)
            result(err, null)
            return
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("item deleted from Cart");
        result(null, res);
    })
};

module.exports = Cart;
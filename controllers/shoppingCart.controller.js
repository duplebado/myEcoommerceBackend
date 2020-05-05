const Cart = require('../models/shoppingCart.model.js');

const create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "form cannot be empty. Enter a value please"
        })
    }

    const cart = new Cart({
      item: req.body.item
    });

    Cart.create(cart, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Some error occured while adding the item to your Cart",
          });
        else res.send(data);
      });
};

const viewOne = (req,res) => {
    Cart.viewOne(req.params.cartId, (err,data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({message: `Not found item with id ${req.params.cartId} in cart.`,});
          } else {
            res.status(500).send({message: `Error retrieving item with id ${req.params.cartId} in cart`});      
          }
        }else {
          res.send(data);
        }
    })
}

const viewAll = (req, res) => {
    Cart.viewAll((err, data) => {
        if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving items in cart."
        });
      else res.send(data);
    })
};

const update = (req,res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    Cart.update(req.params.cartId, new Cart(req.body),(err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res
                .status(404)
                .send({
                  message: `Not found item with id ${req.params.cartId} in cart.`,
                });
              return;
            } else {
              res
                .status(500)
                .send({
                  message: "Error updating item with id " + req.params.carId + " in cart."
                });
              return;
            }
        } else {
            res.send(data);
        }
    });
};

const remove = (req,res) => {
    Cart.remove(req.params.cartId, (err,data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({message: `Not found item with id ${req.params.carId} in cart.`});
            } else {
                res.status(500).send({message: `Could not delete item with id ${req.params.carId} in cart.`});
            }
        } else {
            res.send({ message: `item was deleted successfully from cart!` })
        };
    });
}

module.exports = {
    create,
    viewOne,
    viewAll,
    update,
    remove
}
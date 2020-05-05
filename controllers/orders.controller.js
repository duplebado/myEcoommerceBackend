const Order = require('../models/orders.model.js');

const create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "form cannot be empty. Enter a value please"
        })
    }

    const order = new Order({
      products_purchased : req.body.products_purchased,  
      user_information   : req.body.user_information,    
      delivery_address   : req.body.delivery_address,    
      delivery_time      : req.body.delivery_time,      
      payment_information: req.body.payment_information
    });

    Order.create(order, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Some error occured while adding your order",
          });
        else res.send(data);
      });
};

const viewOne = (req,res) => {
    Order.viewOne(req.params.orderId, (err,data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({message: `Not found order with id ${req.params.orderId}.`,});
          } else {
            res.status(500).send({message: `Error retrieving order with id ${req.params.orderId}`});      
          }
        }else {
          res.send(data);
        }
    })
}

const viewAll = (req, res) => {
    Order.viewAll((err, data) => {
        if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving orders.",
        });
      else res.send(data);
    })
};

const update = (req,res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    Order.update(req.params.orderId, new Order(req.body),(err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res
                .status(404)
                .send({
                  message: `Not found order with id ${req.params.orderId}.`,
                });
              return;
            } else {
              res
                .status(500)
                .send({
                  message: "Error updating order with id " + req.params.orderId,
                });
              return;
            }
        } else {
            res.send(data);
        }
    });
};

const remove = (req,res) => {
    Order.remove(req.params.orderId, (err,data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({message: `Not found order with id ${req.params.orderId}.`});
            } else {
                res.status(500).send({message: `Could not delete order with id ${req.params.orderId}.`});
            }
        } else {
            res.send({ message: `Order was deleted successfully!` })
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
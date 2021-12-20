const Cart = require("../models/cart");
const slugify = require("slugify");

exports.addItemCart = async (req, res) => {
  await Cart.findOne({ user: req.user.id }).exec(async (error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      const product = req.body.cartItems.product;
      const item = cart.cartItems.find((c) => c.product == product);
      let condition, update;

      if (item) {
        condition = { user: req.user.id, "cartItems.product": product };
        update = {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: item.quantity + req.body.cartItems.quantity,
            },
          },
        };
      } else {
        condition = { user: req.user.id };
        update = {
          $push: {
            cartItems: req.body.cartItems,
          },
        };
      }

      await Cart.findOneAndUpdate(condition, update).exec((error, _cart) => {
        if (error) return res.status(400).json({ error });
        if (_cart) {
          res.status(200).json({ _cart });
        }
      });
    } else {
      const cart = new Cart({
        user: req.user.id,
        cartItems: [req.body.cartItems],
      });
      await cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          res.status(200).json({ cart });
        }
      });
    }
  });
};

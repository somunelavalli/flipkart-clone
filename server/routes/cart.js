const router = require("express").Router();
const { requireSignin, userMiddleware } = require("../common-middleware");
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
} = require("../controller/cart");

router.post("/addtocart", requireSignin, userMiddleware, addItemToCart);
router.post("/getcartitems", requireSignin, userMiddleware, getCartItems);
router.post("/removeitem", requireSignin, userMiddleware, removeCartItems);
module.exports = router;

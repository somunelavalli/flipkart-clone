const router = require("express").Router();
const { requireSignin, userMiddleware } = require("../common-middleware");
const { addItemToCart, getCartItems } = require("../controller/cart");

router.post("/addtocart", requireSignin, userMiddleware, addItemToCart);
router.post("/getcartitems", requireSignin, userMiddleware, getCartItems);
module.exports = router;

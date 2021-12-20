const router = require("express").Router();
const { requireSignin, userMiddleware } = require("../common-middleware");
const { addItemCart } = require("../controller/cart");

router.post("/addtocart", requireSignin, userMiddleware, addItemCart);

module.exports = router;

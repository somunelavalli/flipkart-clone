const { requireSignin, userMiddleware } = require("../common-middleware");
const { addOrder, getOrders, getOrder } = require("../controller/order");
const router = require("express").Router();

router.post("/addorder", requireSignin, userMiddleware, addOrder);
router.get("/getorders", requireSignin, userMiddleware, getOrders);
router.post("/getorder", requireSignin, userMiddleware, getOrder);

module.exports = router;

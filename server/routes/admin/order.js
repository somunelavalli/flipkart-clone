const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const {
  updateOrder,
  getCustomerOrders,
} = require("../../controller/admin/order");
const router = express.Router();

router.post(`/update`, requireSignin, adminMiddleware, updateOrder);
router.post(
  `/getcustomerorders`,
  requireSignin,
  adminMiddleware,
  getCustomerOrders
);

module.exports = router;

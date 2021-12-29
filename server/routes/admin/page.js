const router = require("express").Router();
const {
  upload,
  requireSignin,
  adminMiddleware,
} = require("../../common-middleware");
const { createPage, getPage } = require("../../controller/page");

router.post(
  "/create",
  requireSignin,
  adminMiddleware,
  upload.fields([{ name: "banners" }, { name: "products" }]),
  createPage
);

router.get("/:category/:type", getPage);
module.exports = router;

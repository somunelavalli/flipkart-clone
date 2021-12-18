const router = require("express").Router();
const { requireSignin, adminMiddleware } = require("../common-middleware");
const { addProduct } = require("../controller/product");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  addProduct
);
router.get("/getallproducts");

module.exports = router;

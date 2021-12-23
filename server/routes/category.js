const router = require("express").Router();
const { requireSignin, adminMiddleware } = require("../common-middleware");
const {
  addCategory,
  getAllCategories,
  updateCategories,
} = require("../controller/category");
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
  upload.single("categoryImage"),
  addCategory
);
router.get("/getallcategories", getAllCategories);
router.post("/update", upload.array("categoryImage"), updateCategories);

module.exports = router;

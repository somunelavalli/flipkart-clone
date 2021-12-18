const router = require("express").Router();
const { requireSignin, adminMiddleware } = require("../common-middleware");
const { addCategory, getAllCategories } = require("../controller/category");

router.post("/create", requireSignin, adminMiddleware, addCategory);
router.get("/getallcategories", getAllCategories);

module.exports = router;

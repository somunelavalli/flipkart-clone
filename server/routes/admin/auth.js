const router = require("express").Router();
const { register, login } = require("../../controller/admin/auth");
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../../validator/auth");

//Register
router.post(
  "/admin/register",
  validateSignupRequest,
  isRequestValidated,
  register
);

//Login
router.post("/admin/login", validateSigninRequest, isRequestValidated, login);

module.exports = router;

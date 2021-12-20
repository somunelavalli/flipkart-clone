const router = require("express").Router();
const { requireSignin } = require("../../common-middleware");
const { register, login, logout } = require("../../controller/admin/auth");
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../../validator/auth");

//Register
router.post("/register", validateSignupRequest, isRequestValidated, register);

//Login
router.post("/login", validateSigninRequest, isRequestValidated, login);

//Logout
router.post("/logout", logout);

module.exports = router;

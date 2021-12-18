const router = require("express").Router();
const { register, login } = require("../controller/auth");
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../validator/auth");

//Register
router.post("/register", validateSignupRequest, isRequestValidated, register);

//Login
router.post("/login", validateSigninRequest, isRequestValidated, login);

module.exports = router;

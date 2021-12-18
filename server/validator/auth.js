const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("First Name is Required"),
  check("lastName").notEmpty().withMessage("Last Name is Required"),
  check("email").isEmail().withMessage("Valid Email is Required"),
  check("userName").notEmpty().withMessage("User Name is Required"),
  check("userPassword")
    .isLength({ min: 6 })
    .withMessage("Password must atleast 6 characters long"),
];

exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Valid Email is Required"),
  check("userPassword")
    .isLength({ min: 6 })
    .withMessage("Password must atleast 6 characters long"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

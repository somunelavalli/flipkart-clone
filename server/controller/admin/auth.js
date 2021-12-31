const User = require("../../models/user");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    role: "admin",
    userPassword: cryptoJs.AES.encrypt(
      req.body.userPassword,
      process.env.PASS_SECRET
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json({ savedUser, message: "Admin Created Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("wrong credentials");

    const hashedpassword = cryptoJs.AES.decrypt(
      user.userPassword,
      process.env.PASS_SECRET
    );

    const dbpassword = hashedpassword.toString(cryptoJs.enc.Utf8);
    dbpassword !== req.body.userPassword &&
      res.status(401).json("wrong credentials");
    if (user.role === "admin") {
      const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
      res.cookie("token", accessToken, { expiresIn: "3d" });
      const fullName = user.firstName + " " + user.lastName;
      const { userPassword, ...others } = user._doc;
      res.status(200).json({
        fullName,
        ...others,
        accessToken,
        message: "Admin Login Successful",
      });
    } else {
      res.status(400).json({ message: "Something Went Wrong" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Logout Successfully",
  });
};

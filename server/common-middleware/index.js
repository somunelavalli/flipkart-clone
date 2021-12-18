const jwt = require("jsonwebtoken");
exports.requireSignin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  if (authHeader) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!!!");
  }
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.send(400).json({ message: "User Access Denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.send(400).json({ message: "Admin Access Denied" });
  }
  next();
};

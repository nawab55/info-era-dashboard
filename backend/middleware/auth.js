// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/user_model/User");

exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decoded);

    const user = await User.findById(decoded.user.userId);
    // console.log(user);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

exports.isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin" && role !== "hr") {
    return res.status(403).send("Access denied. Admins and HR only.");
  }
  next();
};

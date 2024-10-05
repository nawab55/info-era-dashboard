// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/user_model/User");
const Customer = require("../models/customer_model/customer.model");

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
    // Determine if the token belongs to a User or a Customer
    if(decoded.user && decoded.user.userId){
       // The token belongs to a User
      const user = await User.findById(decoded.user.userId);
      if(user) {
        req.user = user;
        return next();
      }
    } else if (decoded.id) {
       // The token belongs to a Customer
      const customer = await Customer.findById(decoded.id); 
      // console.log("customer details -> ",customer);
      
      if (customer) {
        req.customer = customer;
        return next();
      }
    }
    return res.status(404).json({ message: "User or Customer not found." });
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

exports.isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin" && role !== "hr") {
    return res.status(403).send("Access denied. Admins and HR only.");
  }
  next();
};

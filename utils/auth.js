const jwt = require("jsonwebtoken");
const User = require("../models/users");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = async (id) => {
  const user = await User.findById(id);

  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  };

  const token = await jwt.sign(payload, process.env.SECRET_KEY);

  return token;
};

const validateToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

const createTimeStamp = (timestamp = 1712396436677) => {
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
//   const seconds = 92800*30*12;
  if (seconds < 60) {
    return "just now";
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    let days = Math.floor(seconds / 86400);
    if (days < 32) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if(days < 365) {
      days = Math.floor(days/31)
      return `${days} month${days > 1 ? "s" : ""} ago`;
    }else{
        days = Math.floor(days/365)
      return `${days} year${days > 1 ? "s" : ""} ago`;
    }
  }
};

module.exports = { generateToken, validateToken, createTimeStamp };

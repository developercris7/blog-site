const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "User",
  },
  profilePicture: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
},{timestamps : true});

const User = mongoose.model("User", userSchema);

module.exports = User;

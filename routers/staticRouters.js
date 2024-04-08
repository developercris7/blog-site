const express = require("express");
const router = express.Router();
const Blog = require('../models/blogs')
const {createTimeStamp} = require('../utils/auth')

router.get("/", async(req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home",{
  user: req.user,
  blogs : allBlogs,
  createTimeStamp
  });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;

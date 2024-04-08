const User = require("../models/users");
const Blog = require("../models/blogs");
const { ObjectId } = require('mongodb');

const { generateToken,createTimeStamp} = require("../utils/auth");

const handleUserSignup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName) throw new Error("Fullname is required !");
    if (!email) throw new Error("Email is required !");
    if (!password) throw new Error("Password is required !");
    const user = await User.findOne({ email: email });
    if (user) throw new Error("User Already Exists !");
    await User.create(req.body);
    return res.render("login", {
      message: "Your account created Successfully !",
    });
  } catch (error) {
    return res.render("signup", { error });
  }
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) throw new Error("Email is required !");
    if (!password) throw new Error("Password is required !");
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("User Not Found ! Please create account !");
    if (user.password !== password) throw new Error("Invalid Password !");
    const token = await generateToken(user._id);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("login", { error });
  }
};
const handleRenderUserOwnBlog = async (req, res) => {
  const blog = await Blog.find({ createdBy: req.user._id });
  return res.render("userBlogs", { user: req.user, blogs: blog ,createTimeStamp});
};

const handleUserOwnBlogDeletion = async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id }).populate("createdBy");
  const loggedUserId = new ObjectId(req.user._id) 
  const createdUserId = blog.createdBy._id;
  if (!loggedUserId.equals(createdUserId)) {
    res.json({ error: "deletion of the blog is failed !!!" });
  }
  await Blog.deleteOne({ _id: req.params.id });
  res.redirect("/");
};

module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleRenderUserOwnBlog,
  handleUserOwnBlogDeletion,
};

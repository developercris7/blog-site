const Blog = require('../models/blogs')
const Comment = require('../models/comments')
const {createTimeStamp} = require("../utils/auth");

const handleRenderCreateBlog = (req, res) => {
  if (!req.user) res.redirect("/");
  res.render("createBlog",{
    user : req.user,
  });
};

const handleCreateBlog = async (req, res) => {
  const { title, body } = req.body;
  try {
    if (!title || !body) throw new Error("All the fields are mandatory !");
   await Blog.create({title,body,coverImage:req.file.filename,createdBy:req.user._id})

   res.render("createBlog",{user : req.user , message : "Blog is created Successfully !"})} 
   catch (error) {
    res.render("createBlog", { error });
  }
};

const handleRenderViewBlog = async(req,res) => {
     const blog_id = req.params.id;
     const blog = await Blog.findByIdAndUpdate(blog_id,{$inc : {views : 1}},{new:true}).populate("createdBy");
     const comments = await Comment.find({blogId : blog_id}).sort({createdAt : -1}).populate("createdBy")
     res.render("blog",{
        user :req.user,
        blog,
        comments,
        createTimeStamp
    })
}

const handleBlogDeletion = async(req,res) => {
      await Blog.deleteOne({_id: req.params.id})
      return res.redirect("/")
}


module.exports = { handleCreateBlog, handleRenderCreateBlog ,handleRenderViewBlog,handleBlogDeletion};

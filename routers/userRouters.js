const express = require("express");
const router = express.Router();
const {handleUserSignup,handleUserLogin,handleRenderUserOwnBlog,handleUserOwnBlogDeletion} = require('../controllers/userControllers')

router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/")
})
router.get("/blogs",handleRenderUserOwnBlog)
router.get("/deleteBlog/:id",handleUserOwnBlogDeletion)

router.post("/signup",handleUserSignup);
router.post("/login",handleUserLogin);

module.exports = router ;  

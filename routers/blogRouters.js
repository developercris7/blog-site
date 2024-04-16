const express = require('express')
const router = express.Router()
const upload = require('../services/fileupload')

const {checkForAdmin} = require('../middlewares/auth')

const {handleCreateBlog,handleRenderCreateBlog,handleRenderViewBlog,handleBlogDeletion} = require('../controllers/blogControllers')

router.get("/create",handleRenderCreateBlog)

router.post("/create",upload.single("coverImage"),handleCreateBlog)

router.get("/view/:id",handleRenderViewBlog)

router.get("/delete/:id",checkForAdmin("Admin"),handleBlogDeletion)

module.exports = router ;
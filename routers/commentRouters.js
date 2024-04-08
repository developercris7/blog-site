const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");

router.post("/create", async (req, res) => {
    const { content, blogId } = req.body;
    await Comment.create({ blogId, content, createdBy: req.user._id });
    res.json({ message: "success" });
});

module.exports = router;

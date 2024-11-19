const { Router } = require("express");
const router = Router();
const path = require("path");
const multer = require("multer");
const Blog = require("../models/blogModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/add-blog", (req, res) => {
  return res.render("addBlogs", {
    user: req.user
  });
});

router.post("/add-blog", upload.single("coverImage"), async (req, res) => {
  const { coverImage, title, body } = req.body;
  const blog = await Blog.create({
    title, 
    body,
    coverImageUrl: `/uploads/${req.file.filename}`,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${blog._id}`);

});

module.exports = router;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();


const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const { checkAuthentication } = require("./middlewares/auth");
const Blog = require("./models/blogModel");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkAuthentication("token"));
app.use(express.static(path.resolve("./public")))

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
  return res.render("home", {
    user: req.user,
    blogs: allBlogs
  });
});

// mongoose.connect("mongodb://127.0.0.1:27017/blog-app");
mongoose.connect(process.env.MONGO_URL)
app.listen(process.env.PORT, () =>
  console.log(`Server started at PORT: ${process.env.PORT}`)
);

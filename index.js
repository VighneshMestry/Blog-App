const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const userRouter = require("./routes/userRoutes");
const { checkAuthentication } = require('./middlewares/auth');

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(checkAuthentication('token'));


app.use("/user", userRouter);

app.get("/", (req, res) => {
    return res.render("home", {
        user: req.user
    });
});

mongoose.connect("mongodb://127.0.0.1:27017/blog-app");
app.listen(process.env.PORT, () => console.log(`Server started at PORT: ${process.env.PORT}`));
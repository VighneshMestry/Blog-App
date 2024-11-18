const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
    return res.render("home");
});

mongoose.connect("mongodb://127.0.0.1:27017/blog-app");
app.listen(process.env.PORT, () => console.log(`Server started at PORT: ${process.env.PORT}`));
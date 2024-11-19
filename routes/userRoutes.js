const { Router } = require("express");
const User = require("../models/userModel");
const router = Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  const user = await User.create({
    fullName,
    email,
    password,
  });

  console.log(user);
  return res.redirect("/");
});

module.exports = router;

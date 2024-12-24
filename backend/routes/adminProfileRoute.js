  const express = require("express");
const router = express.Router();

router.get("/admin/dashboard", (req, res) => {
  const user = req.session.user;
  console.log("this is user", user);

  if (user.role === "admin") {
    res.status(200).json({
      message: "Welcome to your profile",
      user: "admin login",
    });
  }
});

module.exports = router;

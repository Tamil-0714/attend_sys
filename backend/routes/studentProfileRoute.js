const express = require("express");
const router = express.Router();

router.get("/student/dashboard", (req, res) => {
  const user = req.session.user;
  console.log(user);
  
  if (user.role === "student") {
    res.status(200).json({
      message: "Welcome to your profile",
      user: "student login",
    });
  }
});

module.exports = router;

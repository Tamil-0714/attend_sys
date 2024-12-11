const express = require("express");
const bcrypt = require("bcrypt");
const { fetchCred } = require("../DB/db");
const router = express.Router();

const handleLogin = async (uid, pass, flag, req, res) => {
  try {
    const rows = await fetchCred(uid, flag);

    if (rows && rows[0]) {
      bcrypt.compare(pass, rows[0].pass, function (err, result) {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        if (result) {
          req.session.user = { uid, role: flag };
          return res.status(200).json({ message: "Login successful" });
        } else {
          return res
            .status(403)
            .json({ message: "Unauthorized: Incorrect Password" });
        }
      });
    } else {
      return res.status(403).json({ message: "Unauthorized: User Not Found" });
    }
  } catch (error) {
    console.error(`Error processing login request for ${flag}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

router.post("/login", async (req, res) => {
  const { uid, pass, flag } = req.body;


  if (!["admin", "faculty", "student"].includes(flag)) {
    return res.status(400).json({ message: "Invalid role flag" });
  }

  await handleLogin(uid, pass, flag, req, res);
});

module.exports = router;

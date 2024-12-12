const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");
const {
  ensureAuthenticated,
  ensureAdminAuthenticated,
} = require("./middleware/middleware");
const loginRoute = require("./routes/loginRoute");
const logoutRoute = require("./routes/logoutRoute");
const adminProfile = require("./routes/adminProfileRoute");
const { addNewStd, addNewFac, insertAttendance } = require("./DB/db");

const app = express();
const port = 8050;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "tenoclock",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.post("/login", loginRoute);

app.get("/profile", ensureAdminAuthenticated, adminProfile);

app.post("/newStd", ensureAdminAuthenticated, async (req, res) => {
  const { stdName, stdId, stdPass } = req.body;
  if (stdName && stdId && stdPass) {
    bcrypt.hash(stdPass, 10, async (err, hash) => {
      if (err) {
        console.error("error in hashing");
        return res.status(500).send("internal server error ");
      }
      const rows = await addNewStd(stdName, stdId, hash);
      if (rows?.affectedRows === 1) {
        res.status(200).json({ message: "success" });
      } else {
        res.status(200).json({ message: "id is already exist" });
      }
    });
  } else {
    res.status(300).json({ message: "invalid data" });
  }
});
app.post("/newFac", ensureAdminAuthenticated, async (req, res) => {
  const { fName, fId, fPass } = req.body;
  if (fName && fId && fPass) {
    bcrypt.hash(fPass, 10, async (err, hash) => {
      if (err) {
        console.error("error in hashing");
        return res.status(500).send("internal server error ");
      }
      const rows = await addNewFac(fName, fId, hash);
      if (rows?.affectedRows === 1) {
        res.status(200).json({ message: "success" });
      } else {
        res.status(200).json({ message: "id is already exist" });
      }
    });
  } else {
    res.status(300).json({ message: "invalid data" });
  }
});

const dummy = {
  "22ucs626": true,
  "22ucs627": true,
  "22ucs628": true,
  "22ucs629": false,
  "22ucs630": true,
  "22ucs631": false,
};

app.post("/updateAttendacne", async (req, res) => {
  const { date, hour, stdIdattenStsSTR } = req.body;
  const stdIdattenSts = JSON.parse(stdIdattenStsSTR);
  if (date && hour  && stdIdattenSts) {
    for (const key in stdIdattenSts) {
      const attenSts = stdIdattenSts[key] ? "Present" : "Absent";
      const rows = await insertAttendance(date, hour, key, attenSts);
      if (rows?.affectedRows !== 1) {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
    res.status(200).json({ message: "success" });
  }
});

app.post("/logout", logoutRoute);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
  
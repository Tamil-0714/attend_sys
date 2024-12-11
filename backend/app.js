const express = require("express");
const cors = require("cors");
const bcrypt = require('bcrypt');
const session = require("express-session");
const { ensureAuthenticated, ensureAdminAuthenticated } = require("./middleware/middleware");
const loginRoute = require("./routes/loginRoute");
const logoutRoute = require("./routes/logoutRoute");
const profileRoute = require("./routes/profileRoute");

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
    cookie: { secure: false, httpOnly: true, maxAge: 60000 * 60 * 24 },
  })
);

app.post("/login", loginRoute);

app.get("/profile", ensureAuthenticated, profileRoute);

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
        res.status(300).json({ message: "id is already exist" });
      }
    });
  } else {
    res.status(300).json({ message: "invalid data" });
  }
});

app.post("/logout", logoutRoute);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

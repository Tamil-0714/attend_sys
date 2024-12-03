const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { ensureAuthenticated } = require("./middleware/middleware");
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
    cookie: { secure: false, httpOnly: true, maxAge: 60000 },
  })
);

app.post("/login", loginRoute);

app.get("/profile", ensureAuthenticated, profileRoute);

app.post("/logout", logoutRoute);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
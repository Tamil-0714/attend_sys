const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");
const {
  ensureFacultyAuthenticated,
  ensureAdminAuthenticated,
  ensureStudentAuthenticated,
} = require("./middleware/middleware");
const loginRoute = require("./routes/loginRoute");
const logoutRoute = require("./routes/logoutRoute");
const adminProfile = require("./routes/adminProfileRoute");
const studentProfile = require("./routes/studentProfileRoute");
const {
  addNewStd,
  addNewFac,
  insertAttendance,
  fetchClasses,
  fetchDepartment,
  fetchFaculty,
  fetchCourse,
  insertFacToCourse,
} = require("./DB/db");

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

app.get("/admin/dashboard", ensureAdminAuthenticated, adminProfile);
app.get("/student/dashboard", ensureStudentAuthenticated, studentProfile);

const fetchDataAndRespond = async (res, fetchFunction, notFoundMessage) => {
  try {
    const rows = await fetchFunction();
    if (rows && rows.length > 0) {
      return res.status(200).json(rows);
    }
    return res.status(300).json({ message: notFoundMessage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

app.get("/admin/classes", ensureAdminAuthenticated, async (req, res) => {
  await fetchDataAndRespond(res, fetchClasses, "classes not found");
});

app.get("/admin/department", ensureAdminAuthenticated, async (req, res) => {
  await fetchDataAndRespond(res, fetchDepartment, "department not found");
});

app.get("/admin/faculty", ensureAdminAuthenticated, async (req, res) => {
  await fetchDataAndRespond(res, fetchFaculty, "faculty not found");
});

app.get("/admin/course", ensureAdminAuthenticated, async (req, res) => {
  await fetchDataAndRespond(res, fetchCourse, "course not found");
});

app.post("/admin/factocourse", ensureAdminAuthenticated, async (req, res) => {
  const { faculty, course, Sclass } = req.body;
  if (faculty && course && Sclass) {
    const rows = await insertFacToCourse(faculty, course, Sclass);
    if (rows?.affectedRows === 1) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(200).json({ message: "Duplication" });
    }
  } else {
    res.status(300).json({ message: "invalid data" });
  }
});

app.post("/admin/newStd", ensureAdminAuthenticated, async (req, res) => {
  const { stdName, stdId, stdPass, classId } = req.body;
  if (stdName && stdId && stdPass && classId) {
    bcrypt.hash(stdPass, 10, async (err, hash) => {
      if (err) {
        console.error("error in hashing");
        return res.status(500).send("internal server error ");
      }
      const rows = await addNewStd(stdName, stdId, hash, classId);
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
app.post("/admin/newFac", ensureAdminAuthenticated, async (req, res) => {
  const { fName, fId, fPass, dprt } = req.body;
  if (fName && fId && fPass) {
    bcrypt.hash(fPass, 10, async (err, hash) => {
      if (err) {
        console.error("error in hashing");
        return res.status(500).send("internal server error ");
      }
      const rows = await addNewFac(fName, fId, hash, dprt);
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


app.post("/updateAttendacne", async (req, res) => {
  const { date, hour, stdIdattenStsSTR } = req.body;
  const stdIdattenSts = JSON.parse(stdIdattenStsSTR);
  if (date && hour && stdIdattenSts) {
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

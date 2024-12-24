const mysql = require("mysql2");

function connectDB() {
  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "TooJoo_1967",
    database: "atten_sys",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  return pool.promise();
}

async function queryDB(sql, params) {
  try {
    const connection = await connectDB();
    const [rows] = await connection.query(sql, params);
    connection.releaseConnection();
    return rows;
  } catch (error) {
    throw error;
  }
}

async function fetchCred(id, flag) {
  try {
    let query;
    // console.log("this is flag db", flag);

    switch (flag) {
      case "admin":
        query = "SELECT * FROM adminCred WHERE id = ?";
        break;
      case "faculty":
        query = "SELECT * FROM faculty WHERE faculty_id = ?";
        break;
      case "student":
        query = "SELECT * FROM student WHERE student_id = ?";
        break;
    }
    const params = [id];
    const rows = await queryDB(query, params);
    console.log("this is rows : ", rows);

    return rows;
  } catch (error) {
    console.error(error);
    // throw error;
  }
}

async function addNewStd(stdName, stdId, stdPass, classId) {
  try {
    const query = `insert into student values(?,?,?,?)`;
    const params = [stdId, stdName, stdPass, classId];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function addNewFac(fName, fId, fPass, dprt) {
  try {
    const query = `insert into faculty values(?,?,?,?)`;
    const params = [fId, fPass, fName, dprt];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function fetchClasses() {
  try {
    const query = `SELECT class_id,class_name FROM class`;
    const params = [];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function fetchDepartment() {
  try {
    const query = `SELECT department_id,department_name FROM department`;
    const params = [];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function fetchFaculty() {
  try {
    const query = `SELECT faculty_id,name FROM faculty`;
    const params = [];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function fetchCourse() {
  try {
    const query = `SELECT * FROM course`;
    const params = [];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function insertFacToCourse(faculty_id, course_id, class_id) {
  try {
    const query = `INSERT INTO Faculty_course_Assigned(faculty_id, course_id, class_id) VALUES(?,?,?)`;
    const params = [faculty_id, course_id, class_id];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function fetchCourse() {
  try {
    const query = `SELECT * FROM course`;
    const params = [];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function insertAttendance(date, hour, stdId, attenSts) {
  try {
    const query = `INSERT INTO attendance (noteDate, hour, student_id, attenSts) VALUES (?, ?, ?, ?);`;
    const params = [date, hour, stdId, attenSts];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  fetchCred,
  addNewStd,
  addNewFac,
  insertAttendance,
  fetchClasses,
  fetchDepartment,
  fetchFaculty,
  fetchCourse,
  insertFacToCourse
};

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
        query = "SELECT * FROM facultyCred WHERE id = ?";
        break;
      case "student":
        query = "SELECT * FROM studentCred WHERE id = ?";
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

async function addNewStd(stdName, stdId, stdPass) {
  try {
    const query = `insert into sectionAStudentCred values(?,?,?)`;
    const params = [stdId, stdPass, stdName];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function addNewFac(fName, fId, fPass) {
  try {
    const query = `insert into facultyCred values(?,?,?)`;
    const params = [fId, fPass, fName];
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
};

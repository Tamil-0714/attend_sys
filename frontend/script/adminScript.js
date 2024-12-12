function validateValue(value) {
  const regex = /^\d{2}[a-zA-Z]{3}\d{3}$/;
  return regex.test(value);
}
const addNewFaculty = async (fName, fId, fPass) => {
  console.log("nice this palce");
  try {
    const res = await fetch("http://localhost:8050/newFac ", {
      method: "POST",
      body: JSON.stringify({ fName, fId, fPass }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);

      if (data.message === "success") {
        alert("New faclut inserted");
      } else if (data.message === "id is already exist") {
        alert("id is already exist");
      }
    } else {
      console.log("not ok");
    }
  } catch (error) {
    console.error(error);
  }
};
const addNewStudent = async (stdName, stdId, stdPass) => {
  console.log("nice this palce");
  try {
    const res = await fetch("http://localhost:8050/newStd", {
      method: "POST",
      body: JSON.stringify({ stdName, stdId, stdPass }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);

      if (data.message === "success") {
        alert("New student inserted");
      } else if (data.message === "id is already exist") {
        alert("id is already exist");
      }
    } else {
      console.log("not ok");
      alert("unauthorished")
    }
  } catch (error) {
    console.error(error);
  }
};
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".add-new-faculty")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const facultyName = document.querySelector(".fname").value.trim();
      const facultyId = document.querySelector(".fid").value.trim();
      if (!validateValue(facultyId)) {
        alert("invalid id");
        return;
      }
      const facultyPass = document.querySelector(".fpass").value.trim();
      if (facultyName && facultyId && facultyPass) {
        await addNewFaculty(facultyName, facultyId, facultyPass);
      } else {
        alert("invalid data");
      }
    });
});
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".add-new-stduent")
    .addEventListener("submit", async (e) => {
      console.log("ok called");

      e.preventDefault();
      const sName = document.querySelector(".sname").value.trim();
      const sId = document.querySelector(".sid").value.trim();
      if (!validateValue(sId)) {
        alert("invalid id");
        return;
      }
      const sPass = document.querySelector(".spass").value.trim();
      if (sId && sName && sPass) {
        await addNewStudent(sName, sId, sPass);
      } else {
        alert("invalid data");
      }
    });
});

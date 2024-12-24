function validateValue(value) {
  const regex = /^\d{2}[a-zA-Z]{3}\d{3}$/;
  return regex.test(value);
}
const addNewFaculty = async (fName, fId, fPass, dprt) => {
  console.log("nice this palce");
  try {
    const res = await fetch("http://localhost:8050/admin/newFac ", {
      method: "POST",
      body: JSON.stringify({ fName, fId, fPass, dprt }),
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
const assignFacultyToCoures = async (faculty, course, Sclass) => {
  console.log("nice this palce");
  try {
    const res = await fetch("http://localhost:8050/admin/factocourse", {
      method: "POST",
      body: JSON.stringify({ faculty, course, Sclass }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      if (data.message === "success") {
        alert("Faculty Assigned succes");
      } else if (data.message === "Duplication") {
        alert("This faculty  is already assigned to this coutse ");
      } else {
        alert("500 internal server error ...!");
      }
    } else {
      console.log("not ok");
      alert("unauthorished");
    }
  } catch (error) {
    console.error(error);
  }
};
const addNewStudent = async (stdName, stdId, stdPass, classId) => {
  console.log("nice this palce");
  try {
    const res = await fetch("http://localhost:8050/admin/newStd", {
      method: "POST",
      body: JSON.stringify({ stdName, stdId, stdPass, classId }),
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
      alert("unauthorished");
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
      const dprt = document.querySelector(".dprt-input-wrapper").value;
      const facultyPass = document.querySelector(".fpass").value.trim();
      if (facultyName && facultyId && facultyPass) {
        await addNewFaculty(facultyName, facultyId, facultyPass, dprt);
      } else {
        alert("invalid data");
      }
    });
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
      const classId = document.querySelectorAll(".class-input-wrapper").value;
      console.log("this is class id : ", classId);

      if (sId && sName && sPass) {
        await addNewStudent(sName, sId, sPass, classId);
      } else {
        alert("invalid data");
      }
    });
  document
    .querySelector(".add-new-fac-to-course")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const faculty = document.querySelector(".faculty-input-wrapper").value;
      const course = document.querySelector(".course-input-wrapper").value;
      const Sclass = document.querySelectorAll(".class-input-wrapper")[1].value;
      console.log(faculty, course, Sclass);

      if (faculty && course && Sclass) {
        await assignFacultyToCoures(faculty, course, Sclass);
      } else {
        alert("invalid data front end");
      }
    });
  //render selections
  (async () => {
    const fetchAndPopulate = async (url, wrapperSelector, optionCallback) => {
      try {
        let result = "";
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const rows = await response.json();
          rows.forEach((e) => {
            result += optionCallback(e);
          });
          document.querySelectorAll(wrapperSelector).forEach((e) => {
            e.innerHTML = result;
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    await Promise.all([
      fetchAndPopulate(
        "http://localhost:8050/admin/classes",
        ".class-input-wrapper",
        (e) => `<sl-option value="${e.class_id}">${e.class_name}</sl-option>`
      ),
      fetchAndPopulate(
        "http://localhost:8050/admin/department",
        ".dprt-input-wrapper",
        (e) =>
          `<sl-option value="${e.department_id}">${e.department_name}</sl-option>`
      ),
      fetchAndPopulate(
        "http://localhost:8050/admin/faculty",
        ".faculty-input-wrapper",
        (e) =>
          `<sl-option value="${e.faculty_id}">${e.faculty_id} - ${e.name}</sl-option>`
      ),
      fetchAndPopulate(
        "http://localhost:8050/admin/course",
        ".course-input-wrapper",
        (e) =>
          `<sl-option value="${e.course_id}">${e.department_id} - ${e.course_name}</sl-option>`
      ),
    ]);
  })();
});

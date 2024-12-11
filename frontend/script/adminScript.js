const addNewFaculty = async () => {};
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".add-new-faculty").addEventListener("submit", (e) => {
    e.preventDefault();
    const facultyName = document.querySelector(".fname").value.trim();
    const facultyId = document.querySelector(".fid").value.trim();
    const facultyPass = document.querySelector(".fpass").value.trim();
    console.log(facultyName);
    console.log(facultyId);
    console.log(facultyPass);
  });
});

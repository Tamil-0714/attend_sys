// Protect Routes
function ensureAdminAuthenticated(req, res, next) {
  if (req?.session?.user?.role === "admin") {
    return next();
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized: Please login first" });
  }
}
function ensureFacultyAuthenticated(req, res, next) {
  if (req?.session?.user?.role === "faculty") {
    return next();
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized: Please login first" });
  }
}
function ensureStudentAuthenticated(req, res, next) {
  if (req?.session?.user?.role === "student") {
    return next();
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized: Please login first" });
  }
}
module.exports = {
  ensureFacultyAuthenticated,
  ensureAdminAuthenticated,
  ensureStudentAuthenticated,
};

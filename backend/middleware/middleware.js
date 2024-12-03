// Protect Routes
function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized: Please login first" });
  }
}

module.exports = {
  ensureAuthenticated,
};

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  else res.status(401).json({ error: "Unauthorized" });
};

module.exports = checkAuthenticated;

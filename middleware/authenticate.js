const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({
    success: false,
    message: "Unauthorized access. Please log in through Account to perform this action."
  });
};

export { isAuthenticated }; 
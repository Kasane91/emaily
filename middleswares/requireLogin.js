module.exports = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .send({ errror: "You must log in to access this feature" });
  }
  next();
};

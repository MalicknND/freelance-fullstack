function verifyIsFreelance(req, res, next) {
  if (req.userToken.body.userType !== "FREELANCE") {
    return res.status('401').send({
      auth: false,
      message: "you must be a freelance"
    })
  }
  next();
}

module.exports = verifyIsFreelance;
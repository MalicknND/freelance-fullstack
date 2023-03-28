function verifyIsCompany(req, res, next) {
  if (req.userToken.body.userType !== "COMPANY") {
    return res.status('401').send({
      auth: false,
      message: "you must be a Company"
    })
  }
  next();
}

module.exports = verifyIsCompany;
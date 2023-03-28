function verifyIsAdmin(req, res, next) {
  if (!req.userToken.body.isAdmin) {
    return res.status('401').send({
      auth: false,
      message: "you must be Admin"
    })
  }
  next();
}

module.exports = verifyIsAdmin;
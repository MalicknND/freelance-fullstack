const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send({
    success: false,
    status: status,
    stack: process.env.NODE_ENV,
    message: err.message || "Something went wrong"
  })
}

module.exports = errorHandler;
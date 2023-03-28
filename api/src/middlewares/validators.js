const { body, validationResult } = require('express-validator');

exports.checkEmail = [
  body('email').isEmail().withMessage("Email format not valid")
]

exports.checkIdentity = [
  body('firstName').isAlphanumeric().withMessage('FirstName format is not valide'),
  body('lastName').isAlphanumeric().withMessage('lastName format is not valide')
]

exports.checkPassword = [
  body('password')
    .notEmpty()
    .isLength({ min: 5, max: 30 })
    .matches(/^[A-Za-z0-9 .,'!&(§è!çà)]+$/)
    .withMessage('Password not valid')
]

exports.validation = (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({
      success: false,
      status: 400,
      stack: process.env.NODE_ENV,
      errors:errors.array()
    })
  }

  next();

}
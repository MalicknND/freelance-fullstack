const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { checkEmail, checkIdentity, checkPassword, validation } = require('../middlewares/validators');
const verifyIsCompany = require('../middlewares/verifyIsCompany');
const verifyIsFreelance = require('../middlewares/verifyIsFreelance');
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', checkEmail, checkPassword, checkIdentity, validation, authController.register);
router.post('/login', checkEmail, validation, authController.login);
router.post('/company', verifyToken, verifyIsCompany, authController.registerCompany);
router.post('/freelance', verifyToken, verifyIsFreelance, authController.registerFreelance);

module.exports = router;
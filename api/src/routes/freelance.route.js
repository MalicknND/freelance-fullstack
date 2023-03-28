const express = require('express');
const router = express.Router();
const freelanceController = require('../controllers/freelance.controller');

router.get("/:id", freelanceController.findFreelance);
router.post("/", freelanceController.findFreelances);
router.post("/search", freelanceController.findSearchString);

module.exports = router;
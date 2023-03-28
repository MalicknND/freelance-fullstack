const express = require('express');
const router = express.Router();
const propositionController = require('../controllers/proposition.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsFreelance = require('../middlewares/verifyIsFreelance');
const verifyIsCompany = require('../middlewares/verifyIsCompany');
const verifyMissionBelongsToCompany = require('../middlewares/verifyMissionBelongsToCompany');
const verifyNbOfPropositions = require('../middlewares/verifyNbOfPropositions');

router.get("/my-propositions/", verifyToken, verifyIsFreelance, propositionController.getMyPropositions )
router.post("/create/:id", verifyToken, verifyIsCompany, verifyMissionBelongsToCompany, verifyNbOfPropositions, propositionController.createProposition);
router.post("/update-freelance/:id", verifyToken, verifyIsFreelance, propositionController.updatePropositionFromFreelance)
module.exports = router;
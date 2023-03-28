const express = require('express');
const router = express.Router();
const missionController = require('../controllers/mission.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');
const verifyIsCompany = require('../middlewares/verifyIsCompany');
const verifyMissionBelongsToCompany = require('../middlewares/verifyMissionBelongsToCompany');

router.get("/missions", verifyToken, verifyIsCompany, missionController.getMyMissions);
router.get("/:id", verifyToken, verifyIsCompany, verifyMissionBelongsToCompany, missionController.getMyMission);
router.get("/admin/mission", verifyToken, verifyIsAdmin, missionController.getMissions);
router.get("/admin/mission/:id", verifyToken, verifyIsAdmin, missionController.getMission);
router.post("/", verifyToken, verifyIsCompany, missionController.createMission);
router.put('/:id', verifyToken, verifyIsCompany, verifyMissionBelongsToCompany, missionController.updateMyMission);
router.delete('/:id', verifyToken, verifyIsCompany, verifyMissionBelongsToCompany, missionController.deleteMyMission);

module.exports = router;
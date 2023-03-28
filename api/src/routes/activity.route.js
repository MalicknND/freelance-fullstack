const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

router.get("/", activityController.getActivities);
router.post("/", verifyToken, verifyIsAdmin, activityController.createActivity);
router.put("/:id", verifyToken, verifyIsAdmin, activityController.updateActivity);
router.delete("/:id", verifyToken, verifyIsAdmin, activityController.removeActivity);

module.exports = router;
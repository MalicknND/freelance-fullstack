const express = require('express');
const router = express.Router();
const authRouter = require("./auth.route");
const userRouter = require('./user.route');
const missionRouter = require('./mission.route');
const activityRouter = require('./activity.route');
const skillRouter = require('./skill.route');
const propositionRouter = require('./proposition.route');
const freelanceRouter = require('./freelance.route');

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/mission", missionRouter);
router.use("/skill", skillRouter);
router.use("/activity", activityRouter);
router.use("/proposition", propositionRouter);
router.use("/freelance", freelanceRouter);

module.exports = router;
const Mission = require("../models/mission.model");

async function verifyNbOfPropositions(req, res, next) {
  try {
    const mission = await Mission.findById(req.params.id);
    if (mission.propositions.length >= 3) {
      return res.status(404).send({
        success: false,
        message: "mission cannot have more than 3 propositions"
      })
    }
    next();
  }
  catch (err) {
    return res.status(400).send({
      success: false,
      message: err
    })
  }
}

module.exports = verifyNbOfPropositions;
const Proposition = require("../models/proposition.model");
const Freelance = require("../models/freelance.model");
const Mission = require("../models/mission.model");
const User = require("../models/user.model");
const sendEmail = require("../utils/sendMail");

//propose a mission to a freelance
exports.createProposition = async (req, res, next) => {

  //new proposition
  const newProposition = new Proposition({
    status: "PENDING",
    freelance: req.body.freelanceId,
    mission: req.params.id
  });

  try {
    //save proposition in DB
    const newPropositionToSave = await newProposition.save();
    //find user freelance email and send email to freelance
    const selectedFreelance = await Freelance.findById(req.body.freelance).populate('user');
    //attached id of propositon to mission
    const missionToSave = await Mission.findById(req.params.id);
    missionToSave.propositions.push(newPropositionToSave._id);
    await missionToSave.save();
    //attached a proposition to a freelance
    selectedFreelance.propositions.push(newPropositionToSave.id);
    //save it
    await selectedFreelance.save();
    //send email to freelance
    sendEmail(selectedFreelance.user.email, 'Proposition de mission', "Une entreprise vous a proposé une mission", "Vous pouvez accepter ou refuser la mission en cliquant sur ce lien")
    //return new proposition
    res.send({
      success: true,
      proposition: newPropositionToSave
    })
  }
  catch (err) {
    next(err)
  }

}

//get all propositions from a freelance 
exports.getMyPropositions = async (req, res, next) => {
  try {
    //find logged user and populate deeply inside freelance and proposition
    const me = await User.findById(req.userToken.body.id).populate(
      {
        path: "freelance",
        model: "Freelance",
        populate: {
          path: "propositions",
          model: "Proposition"
        }
      }
    );
    // return freelance's propositions
    res.send({
      success: true,
      propositions: me.freelance.propositions
    })
  }
  catch (err) {
    next(err)
  }
}

//Accept or decline proposition
exports.updatePropositionFromFreelance = async (req, res, next) => {

  try {
    //find the status in req.body
    const status = req.body.status;
    // find connected user
    const me = await User.findById(req.userToken.body.id);
    //Accet or decline process 
    switch (status) {
      //Freelance refused the proposition
      case "REFUSED":
        // update  proposition status
        await Proposition.findByIdAndUpdate(req.params.id, { status: 'REFUSED' }, { new: true });
        //send email to admin
        sendEmail(me.email, "Refus de proposition de mission", "Un freelance a refusé la mission", `le freelance ${me.id} a refusé la mission`);
        // return success message
        return res.send({
          success: true,
          message: "proposition successfully refused"
        })
      //freelance accept the proposition
      case "ACCEPTED":
        //update proposition status
        await Proposition.findByIdAndUpdate(req.params.id, { status: 'ACCEPTED' }, { new: true });
        //send email to admin
        sendEmail(me.email, "Validation de mission", "Un freelance a validé la mission", `le freelance ${me.id} a validé la mission`);
        //return success message
        return res.send({
          success: true,
          message: "proposition successfully validated"
        })
      // if req.body.status is not  ACCEPTED OR REFUSED
      default:
        const error = new Error("Status not allowed")
        error.status = 401
        throw error;

    }
  }
  catch (err) {
    next(err);
  }

}
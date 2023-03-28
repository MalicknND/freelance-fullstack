const Mission = require("../models/mission.model");
const User = require("../models/user.model");
const Company = require("../models/company.model");

//create mission from User company
exports.createMission = async (req, res, next) => {
  try {
    //find user
    const me = await User.findById(req.userToken.body.id);
    //find company
    const myCompany = await Company.findById(me.company);
    //new mission
    const newMission = new Mission({
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      amount: req.body.amount,
      title: req.body.title,
      description: req.body.description,
      status: "IN_PROGRESS",
      company: myCompany._id,
      skills: req.body.skills
    });
    // save mission in DB
    const missionToCreate = await newMission.save();
    
    if (missionToCreate) {
      // add ref mission to model company
      myCompany.missions.push(missionToCreate._id);
      //save to DB
      await myCompany.save();
      //return Mission
      return res.send({
        success: true,
        message: "mission successfully created",
        mission: missionToCreate
      })
    }
  }
  catch (err) {
    next(err);
  }

}

//get Missions from User company
exports.getMyMissions = async (req, res, next) => {
  try {
    //find user
    const me = await User.findById(req.userToken.body.id).populate('company');
    //find user company and populate missions
    const myCompany = await Company.findById(me.company).populate({
      path: "missions",
      model: "Mission",
      populate: {
        path: "propositions",
        model:"Proposition"
      }
    });
    console.log(myCompany);
    //return missions
    res.send({
      success: true,
      missions: myCompany.missions
    })
  }
  catch(err) {
    next(err);
  }
}

//get Mission from User company
exports.getMyMission = async (req, res, next) => {
  try {
    //find missions
    const myMission = await Mission.findById(req.params.id);
    // return mission
    res.send({
      success: true,
      missions: myMission
    })
  }
  catch(err) {
    next(err);
  }
}

// update mission from User company
exports.updateMyMission = async (req, res, next) => {
  try {
    //update mission
    const missionToUpdate = await Mission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    //return mission updated
    res.send ({
      success: true,
      message:"Mission successfully updated",
      mission: missionToUpdate
    });
  }
  catch (err) {
    next(err);
  }

}

//delete mission from User company
exports.deleteMyMission = async (req, res, next) => {
  try {
    //find and delete mission
    const missionToRemove = await Mission.findByIdAndRemove(req.params.id, req.body);
    // return mission removed
    res.send ({
      success: true,
      message: "Mission successfully removed",
      mission: missionToRemove
    });
  }
  catch (err) {
    next(err);
  }
}

//get missions (admin)
exports.getMissions = async (req, res, next) => {
  try {
    //find all mission and populate propositions
    const missions = Mission.find().populate('propositions');
    // return missions
    res.send({
      missions: missions,
      success:true
    })
  }
  catch(err) {
    next(err);
  }
}

//get mission (admin)
exports.getMission = async (req, res, next) => {
   //find one mission and populate propositions
  try {
    const missions = Mission.findbyId(req.params.id).populate('propositions');
    //return mission
    res.send({
      missions: missions,
      success:true
    })
  }
  catch(err) {
    next(err);
  }
}
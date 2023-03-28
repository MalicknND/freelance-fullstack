const Skill = require("../models/skill.model");

// get all skills
exports.getSkills = async (req, res, next) => {
  try {
    //find skills and populate
    const skills = await Skill.find().populate('activity');
    //return skills
    res.send({
      success: true, 
      skills:skills
    })
  }
  catch (err) {
    next(err);
  }
}

// create one skill (for admin)
exports.createSkill = async (req, res, next) => {

  const newSkill = new Skill({
    name: req.body.name,
    activity:req.body.activity
  })

  try {
    //save skill in DB
    const skillToSave = await newSkill.save();
    // return new skill
    res.send({
      success: true,
      message: "skill successfully create",
      skill: skillToSave
    })
  }
  catch(err) {
    next(err)
  }

}

//update one skill (for admin)
exports.updateSkill = async (req, res, next) => {
  //
  try {
    // find and update in DB
    const skillToUpdate = Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skillToUpdate) {
      const error = new Error("skill not found")
      error.status = 404
      throw error;
    }
    //return updated skill
    res.send({
      success: true,
      message: "skill successfully updated",
      skill: skillToUpdate
    })
  }
  catch(err) {
    next(err)
  }
}

// remove one skill (admin)
exports.removeSkill = async (req, res, next) => {
  try {
    //find and remove in DB
    const skillToDelete = await Skill.findByIdAndRemove(req.params.id);
    if (!skillToDelete) {
      const error = new Error("skill not found")
      error.status = 404
      throw error;
    }
    // return deleted skill
    res.send({
      success: true,
      message: "skill successfully delete",
      skill: skillToDelete
    })
  }
  catch(err) {
    next(err)
  }
}
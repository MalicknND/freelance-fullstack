const Freelance = require("../models/freelance.model");

//find one freelance based in ID
exports.findFreelance = async (req, res, next) => {
  try {
    const freelance = await Freelance.findById(req.params.id);
    if (!freelance) {
      const error = new Error("freelance not found")
      error.status = 404
      throw error;
    }
    res.send({
      success: true,
      freelance: freelance
    })
  }
  catch (err) {
    next(err);
  }
}

//find freelances based one multiple filters
exports.findFreelances = async (req, res, next) => {
  try {
    //find freelances on DB
    const freelances = await Freelance.find().populate('skills');
    //if filters inside body of request
    if (req.body.filters) {
      //apply filters
      const filteredFreelance = freelances.filter((freelance) => {
        return req.body.filters.rate
          ? freelance.rate >= req.body.filters.rate.range[0]
          && freelance.rate <= req.body.filters.rate.range[1] : false
          || req.body.filters.exp
          ? freelance.yearOfExperience >= req.body.filters.exp.range[0]
          && freelance.yearOfExperience <= req.body.filters.exp.range[1] : false
          || req.body.filters.skills
          ? freelance.skills.some((el) => req.body.filters.skills.includes(String(el))) : false
      });
      //return filtered freelances
      return res.send({
        success: true,
        freelances: filteredFreelance
      })
    }
    //return non filtered freelances
    return res.send({
      success: true,
      freelances: freelances
    })
  }
  catch (err) {
    next(err);
  }

}


//find freelances based one search string
exports.findSearchString = async (req, res, next) => {
  try {
    //find freelances
    const freelances = await Freelance.find().populate([
      {
        path: "user",
        model: "User"
      },
      {
        path: "skills",
        model: "Skill"
      }
    ]);
    //if search string inside req.body
    if (req.body.searchString) {
      //transform string in array bases on spaced 
      const termsArray = req.body.searchString.toLowerCase().split(' ');
      //apply filter
      const filteredFreelance = freelances.filter((freelance) => {
        return termsArray.some(
          el => {
            return freelance.user.firstName.includes(el) ||
              freelance.user.lastName.includes(el) ||
              freelance.user.address.city.includes(el) ||
              freelance.skills.some(skill => skill.name.includes(el))
          }
        )
      })
      // return filtered freelance
      return res.send({
        success: true,
        freelances: filteredFreelance
      })
    }
    //return non filtered freelance
    return res.send({
      success: true,
      freelances: freelances
    })
  }
  catch (err) {
    next(err);
  }
}
const User = require("../models/user.model");
const Company = require("../models/company.model");

async function verifyMissionBelongsToCompany(req, res, next) {
  try {
    const me = await User.findById(req.userToken.body.id);
      const myCompany = await Company.findById(me.company).populate('missions');
      if (!myCompany.missions.some((el) =>el._id.equals(req.params.id))) {
        return res.status(404).send({
          success:false,
          message: "this mission isn't belong to the company"
        })
      }
      next();
  }
  catch (err) {
    const error = new Error(err)
    error.status = 400
    throw error;
  }
}

module.exports = verifyMissionBelongsToCompany;
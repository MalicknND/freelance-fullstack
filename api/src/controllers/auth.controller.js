const User = require("../models/user.model");
const Company = require("../models/company.model");
const Freelance = require("../models/freelance.model");
const bcrypt = require("bcrypt");
const sendMail = require('../utils/sendMail');
const signJwt = require('../utils/signJwt');

//register a user
exports.register = async (req, res, next) => {

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    userType: req.body.userType,
    address: {
      city: req.body.address.city,
      zipCode: req.body.address.zipCode,
      street: req.body.address.street
    }
  });

  try {
    // save email in DB
    const newUserToSave = await newUser.save();
    //create new Token
    let userToken = signJwt({
      id: newUserToSave._id,
      isAdmin: newUserToSave.isAdmin,
      userType: newUserToSave.userType,
    })
    if (userToken) {
      //send email to new user
      await sendMail(
        newUser.email,
        "Confirmation d'inscription",
        `Hello ${newUser.firstName}`,
        "Votre inscription est confirmée."
      );
      //send email to Admin 
      await sendMail(
        process.env.ADMIN_EMAIL,
        "[Admin] - Confirmation d'inscription",
        `Hello Admin`,
        `Nouvelle inscription : ${newUser.email}`
      );
      //return User
      return res.send({
        success: true,
        message: "User logged",
        auth: true,
        token: userToken
      })
    }
  }
  catch (err) {
    next(err);
  }

}

//login user
exports.login = async (req, res, next) => {
  try {
    //find a user
    const userLogged = await User.findOne({ email: req.body.email });
    //throw error if no user
    if (!userLogged) {
      const error = new Error("user not found")
      error.status = 404
      throw error;
    }
    //compare password
    let passwordValid = bcrypt.compareSync(req.body.password, userLogged.password);
    //if no password throw error
    if (!passwordValid) {
      const error = new Error("password not valid")
      error.status = 401
      throw error;
    }
    //sign jwt
    let userToken = signJwt({
      id: userLogged._id,
      isAdmin: userLogged.isAdmin,
      userType: userLogged.userType,
    })
    // return token
    return res.send({
      success: true,
      message: "User logged",
      auth: true,
      token: userToken
    })
  }
  catch (err) {
    next(err);
  }
}

//register a user with user type freelance
exports.registerFreelance = async (req, res, next) => {
  try {
    //get the user who want to register as a freelance
    const me = await User.findById(req.userToken.body.id);
    // create a new Freelance instance
    const newFreelance = new Freelance({
      rate: req.body.rate,
      yearOfExperience: req.body.yearOfExperience,
      user: req.userToken.body.id
    });
    //if user already have a freelance acccount
    if (me.freelance) {
      const error = new Error("User already have a freelance account")
      error.status = 400
      throw error;
    }
    // save the freelance in db
    const newFreelanceToSave = await newFreelance.save();
    //Add freelance ref to User model and save to DB
    me.freelance = newFreelanceToSave._id;
    await me.save();
    //return new freelance
    res.send({
      success: true,
      message: "freelance successfully create",
      freelance: newFreelanceToSave
    })
  }
  catch (err) {
    next(err);
  }
}

//register a company with user type company
exports.registerCompany = async (req, res, next) => {

  //get the user who want to register Company
  const me = await User.findById(req.userToken.body.id);
  
  // create a new Company instance
  const newCompany = new Company({
    name: req.body.name,
    status: req.body.status,
    siret: req.body.siret,
    address: {
      city: req.body.address.city,
      zipCode: req.body.address.zipCode,
      street: req.body.address.street
    },
    user: me._id
  })

  try {
    //if user already have a company account
    if (me.company) {
      const error = new Error("User already have a company account")
      error.status = 400
      throw error;
    }
    // save company in DB
    const newCompanyToSave = await newCompany.save();
    //Add freelance ref to User and save to DB
    me.company = newCompanyToSave._id;
    await me.save();
    // return company
    res.send({
      success: true,
      message: "company successfully create",
      company: newCompanyToSave
    })
  }
  catch (err) {
    next(err);
  }
}
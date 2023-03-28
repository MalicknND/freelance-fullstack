const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
    maxLength: 50,
    minLength: 2
  },
  lastName: {
    type: String,
    lowercase: true,
    maxLength: 50,
    minLength: 2,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    length: 50,
    required: true
  },
  phone: {
    type: String,
    maxLength: 15,
    minLength: 9,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  address: {
    street: {
      type: String,
      maxLength: 50,
      minLength: 2,
      lowercase: true,
      required: true
    },
    zipCode: {
      type: Number,
      maxLength: 5,
      minLength: 5,
      required: true
    },
    city: {
      type: String,
      maxLength: 50,
      minLength: 2,
      lowercase: true,
      required: true
    }
  },
  password: {
    type: String,
    required: true
  },
  freelance: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Freelance',
  },
  company: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Company',
  },
  userType: {
    type: String,
    enum: ['FREELANCE', 'COMPANY'],
    required: true
  }
},
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {
  
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    this.password = hashedPassword
    next();
  });

})

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
    minLength: 2,
    lowercase: true,
    required: true
  },
  status: {
    type: String,
    enum: ['SAS','SASU', 'SARL', 'EURL', 'SA'],
    required: true
  },
  siret: {
    type: Number,
    min: 9,
    required: true
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
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  missions: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'Mission',
      required: true
    }
  ]
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Company', companySchema);

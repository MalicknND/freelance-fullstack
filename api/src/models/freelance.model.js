const mongoose = require('mongoose');

const freelanceSchema = mongoose.Schema({
  rate: {
    type: Number,
    min:1,
    required: true,
  },
  yearOfExperience: {
    type: Number,
    required: true,
    min: 1
  },
  propositions: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Proposition',
    required: true
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'Skill',
      required: true
    }
  ]
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Freelance', freelanceSchema);

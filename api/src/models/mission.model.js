const mongoose = require('mongoose');

const missionSchema = mongoose.Schema({
  dateStart: {
    type: String, 
    required: true
  },
  dateEnd: {
    type: String, 
    required: true
  },
  amount: {
    type: Number,
    required:true
  },
  title: {
    type: String,
    maxLength: 50,
    minLength: 2,
    lowercase: true,
    required: true
  },
  description: {
    type: String,
    maxLength: 250,
    minLength: 2,
    required: true
  },
  status: {
    type: String,
    enum: ['IN_PROGRESS', 'CLOSED'],
    default: 'IN_PROGRESS',
    required: true
  },
  skills: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Skill',
  }],
  company: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Company',
  },
  propositions: [{    
    type: mongoose.Schema.Types.ObjectId, ref: 'Proposition',
  }]
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Mission', missionSchema);

function arrayLimit(val) {
  return val.length <= 3;
}
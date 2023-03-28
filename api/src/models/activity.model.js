const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 50,
    lowercase: true,
    required: true,
  },
  skills: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Skill',
    required: true
  }],
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Activity', activitySchema);
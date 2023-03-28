const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 50,
    lowercase: true,
    required: true,
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Activity'
  },
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Skill', skillSchema);
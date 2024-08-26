const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false, // Not all activities may have an image
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

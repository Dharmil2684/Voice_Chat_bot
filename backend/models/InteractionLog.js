const mongoose = require('mongoose');

const InteractionLogSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Links to the User model
    required: true 
  },
  userQuery: { type: String, required: true },
  botResponse: { type: String, required: true },
  latencyMs: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('InteractionLog', InteractionLogSchema);
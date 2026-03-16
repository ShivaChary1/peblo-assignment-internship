const mongoose = require("mongoose");

const sourceSchema = new mongoose.Schema({
  file_name: {
    type: String,
    required: true
  },
  original_name: {
    type: String,
    required: true
  },
  grade: Number,
  subject: String,
  topic: String,
  uploaded_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Source", sourceSchema);
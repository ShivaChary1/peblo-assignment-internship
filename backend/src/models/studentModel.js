const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

  student_id: {
    type: String,
    unique: true,
    required: true
  },

  current_difficulty: {
    type: String,
    enum: ["easy","medium","hard"],
    default: "easy"
  },

  created_at: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Student", studentSchema);
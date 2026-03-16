const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({

  student_id: {
    type: String,
    required: true
  },

  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true
  },

  selected_answer: String,

  correct: Boolean,

  answered_at: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Answer", answerSchema);
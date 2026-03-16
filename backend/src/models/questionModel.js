const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

  source_chunk_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chunk",
    required: true
  },
  subject: String,
  topic: String,
  question: {
    type: String,
    required: true,
    unique: true
  },

  type: {
    type: String,
    enum: ["MCQ", "TRUE_FALSE", "FILL_BLANK"],
    required: true
  },

  options: {
    type: [String],
    default: []
  },

  answer: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy"
  },

  created_at: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Question", questionSchema);
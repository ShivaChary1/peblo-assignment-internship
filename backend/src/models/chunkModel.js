const mongoose = require("mongoose");

const chunkSchema = new mongoose.Schema({
  source_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Source",
    required: true
  },
  chunk_index: Number,
  text: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Chunk", chunkSchema);
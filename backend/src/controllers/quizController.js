const Chunk = require("../models/chunkModel");
const Question = require("../models/questionModel");
const generateQuizFromChunk = require("../services/quizGeneratorService");
const Source = require("../models/sourceModel");




const generateQuiz = async (req, res) => {
  try {
    const { source_id } = req.body;
    
    const source = await Source.findById(source_id);

    const chunks = await Chunk.find({ source_id });

    let totalQuestions = 0;

    for (const chunk of chunks) {

      const questions = await generateQuizFromChunk(chunk.text);

      let savedQuestions = [];
      for (const q of questions) {
        let options = q.options || [];
        if (q.type === "TRUE_FALSE") {
          options = ["True", "False"];
        }
        if (q.type === "FILL_BLANK") {
          options = [];
        }
        try {
          const savedQuestion = await Question.create({
            source_chunk_id: chunk._id,
            subject: source.subject,
            topic: source.topic,
            question: q.question,
            type: q.type,
            options: options,
            answer: q.answer,
            difficulty: q.difficulty
          });
          savedQuestions.push(savedQuestion);
        } catch (err) {
          if (err.code === 11000) {
            console.log("Duplicate question skipped");
          } else {
            throw err;
          }
        }
      }

      totalQuestions += savedQuestions.length;
    }

    res.json({
      message: "Quiz generated successfully",
      questions_created: totalQuestions
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Quiz generation failed"
    });

  }
};

module.exports = { generateQuiz };
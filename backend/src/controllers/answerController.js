const Question = require("../models/questionModel");
const Answer = require("../models/answerModel");
const Student = require("../models/studentModel");
const {
  increaseDifficulty,
  decreaseDifficulty
} = require("../utils/difficultyEngine");

const submitAnswer = async (req, res) => {

  try {

    const { student_id, question_id, selected_answer } = req.body;

    const question = await Question.findById(question_id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found"
      });
    }

    const isCorrect =
      selected_answer.trim().toLowerCase() ===
      question.answer.trim().toLowerCase();

    await Answer.create({
      student_id,
      question_id,
      selected_answer,
      correct: isCorrect
    });

    let student = await Student.findOne({ student_id });

    if (!student) {
      student = await Student.create({
        student_id
      });
    }

    let newDifficulty = student.current_difficulty;

    if (isCorrect) {
      newDifficulty = increaseDifficulty(student.current_difficulty);
    } else {
      newDifficulty = decreaseDifficulty(student.current_difficulty);
    }

    student.current_difficulty = newDifficulty;

    await student.save();

    res.json({
      correct: isCorrect,
      next_difficulty: newDifficulty
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Answer evaluation failed"
    });

  }

};

module.exports = { submitAnswer };
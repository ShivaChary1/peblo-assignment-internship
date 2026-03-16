const Question = require("../models/questionModel");
const Student = require("../models/studentModel");

const getQuiz = async (req, res) => {

  try {

    const { student_id, subject, limit = 5 } = req.query;

    const student = await Student.findOne({ student_id });

    const difficulty = student
      ? student.current_difficulty
      : "easy";

    const filter = {
      difficulty
    };

    if (subject) filter.subject = subject;

    const questions = await Question.find(filter)
      .limit(Number(limit))
      .select("-answer");

    res.json({
      difficulty,
      questions
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch quiz"
    });

  }

};

module.exports = { getQuiz };
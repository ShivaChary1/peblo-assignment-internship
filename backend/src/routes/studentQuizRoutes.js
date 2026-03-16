const express = require("express");
const router = express.Router();

const { getQuiz } = require("../controllers/studentQuizController");

router.get("/quiz", getQuiz);

module.exports = router;
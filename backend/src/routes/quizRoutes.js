const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");

const { generateQuiz } = require("../controllers/quizController");

router.post("/generate-quiz", upload.none(), generateQuiz);
module.exports = router;
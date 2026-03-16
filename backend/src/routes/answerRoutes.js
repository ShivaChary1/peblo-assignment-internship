const express = require("express");
const router = express.Router();

const { submitAnswer } = require("../controllers/answerController");

router.post("/submit-answer", submitAnswer);

module.exports = router;
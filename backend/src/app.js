const express = require("express");
const cors = require("cors");
const ingestRoutes = require("./routes/ingestRoutes");
const quizRoutes = require("./routes/quizRoutes");
const studentQuizRoutes = require("./routes/studentQuizRoutes");
const answerRoutes = require("./routes/answerRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", ingestRoutes);
app.use("/api", quizRoutes);
app.use("/api", studentQuizRoutes);
app.use("/api", answerRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "Server is running"
  });
});



module.exports = app;
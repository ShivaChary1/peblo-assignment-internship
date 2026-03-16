const increaseDifficulty = (level) => {

  if (level === "easy") return "medium";
  if (level === "medium") return "hard";
  return "hard";

};

const decreaseDifficulty = (level) => {

  if (level === "hard") return "medium";
  if (level === "medium") return "easy";
  return "easy";

};

module.exports = {
  increaseDifficulty,
  decreaseDifficulty
};
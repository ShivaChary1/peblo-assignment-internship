const cleanText = (text) => {
  let cleaned = text;

  cleaned = cleaned.replace(/\n+/g, " ");
  cleaned = cleaned.replace(/\s+/g, " ");
  cleaned = cleaned.trim();

  return cleaned;
};

module.exports = cleanText;
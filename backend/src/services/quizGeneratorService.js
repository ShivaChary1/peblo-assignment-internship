// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash"
// });

// const generateQuizFromChunk = async (text) => {

// const prompt = `
// Generate 5 quiz questions from the text.

// The questions must include a mix of:

// - MCQ
// - TRUE_FALSE
// - FILL_BLANK

// Return ONLY a JSON array.

// Each object must follow this structure:

// {
//  "question": "",
//  "type": "MCQ | TRUE_FALSE | FILL_BLANK",
//  "options": ["","","",""],
//  "answer": "",
//  "difficulty": "easy | medium | hard"
// }

// Rules:

// MCQ:
// - must include 4 options

// TRUE_FALSE:
// - options must be ["True","False"]

// FILL_BLANK:
// - options should be []

// TEXT:
// ${text}
// `;

//     const result = await model.generateContent(prompt);

//     const response = result.response.text();

//     const clean = response.replace(/```json|```/g, "");

//     return JSON.parse(clean);
// };

// module.exports = generateQuizFromChunk;

// const { GoogleGenAI } = require("@google/genai");
// require("dotenv").config();

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY
// });

// async function test() {
//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents: "Explain photosynthesis simply"
//   });

//   console.log(response.text);
// }

// test();


const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const generateQuizFromChunk = async (text) => {

const prompt = `
Generate 5 quiz questions from the text.

The questions must include a mix of:

- MCQ
- TRUE_FALSE
- FILL_BLANK

Return ONLY a JSON array.

Each object must follow this structure:

{
 "question": "",
 "type": "MCQ | TRUE_FALSE | FILL_BLANK",
 "options": ["","","",""],
 "answer": "",
 "difficulty": "easy | medium | hard"
}

Rules:

MCQ:
- must include 4 options

TRUE_FALSE:
- options must be ["True","False"]

FILL_BLANK:
- options should be a variable with answer

TEXT:
${text}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt
  });

  const raw = response.text;

  const clean = raw.replace(/```json|```/g, "").trim();

  return JSON.parse(clean);
};

module.exports = generateQuizFromChunk;
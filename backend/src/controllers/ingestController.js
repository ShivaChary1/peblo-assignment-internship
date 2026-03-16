const Source = require("../models/sourceModel");
const path = require("path");
const { extractTextFromPDF } = require("../services/pdfParserService");
const cleanText = require("../utils/textCleaner");
const createChunks = require("../services/chunkService");
const Chunk = require("../models/chunkModel");

const ingestPDF = async (req, res) => {
  try {
    const { grade, subject, topic } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "PDF file is required"
      });
    }

    console.log(`PDF uploaded: ${req.file.originalname}`);

    const newSource = await Source.create({
      file_name: req.file.filename,
      original_name: req.file.originalname,
      grade,
      subject,
      topic
    });

    const filePath = path.join("uploads", req.file.filename);
    console.log(filePath);

    const rawText = await extractTextFromPDF(filePath);
    console.log(rawText);

    const cleanedText = cleanText(rawText);

    console.log("Extracted text preview:");
    console.log(cleanedText.substring(0, 500));

    // Create chunks
    const chunks = createChunks(cleanedText);

    // Store chunks in DB
    const storedChunks = await Promise.all(
      chunks.map((chunkText, index) =>
        Chunk.create({
          source_id: newSource._id,
          chunk_index: index,
          text: chunkText
        })
      )
    );

    console.log(`Created ${storedChunks.length} chunks`);

    res.status(201).json({
      message: "PDF processed successfully",
      source: newSource,
      chunks_created: storedChunks.length
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};


module.exports = {
  ingestPDF
};
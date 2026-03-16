const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf");
const { createCanvas } = require("canvas");
const tesseract = require("node-tesseract-ocr");

const OCR_CONFIG = {
  lang: "eng",
  oem: 1,
  psm: 3
};

const runOCR = async (filePath) => {

  console.log("Running OCR fallback...");

  const data = new Uint8Array(await fs.promises.readFile(filePath));

  const pdf = await pdfjsLib.getDocument({ data }).promise;

  const imagePaths = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {

    const page = await pdf.getPage(pageNum);

    const viewport = page.getViewport({ scale: 2 });

    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext("2d");

    await page.render({
      canvasContext: context,
      viewport
    }).promise;

    const imgPath = path.join(__dirname, `page-${pageNum}.png`);

    fs.writeFileSync(imgPath, canvas.toBuffer());

    imagePaths.push(imgPath);
  }

  const text = await tesseract.recognize(imagePaths, OCR_CONFIG);

  return text;
};


const extractTextFromPDF = async (filePath) => {

  const dataBuffer = await fs.promises.readFile(filePath);

  try {

    const pdfData = await pdfParse(dataBuffer);

    if (pdfData.text && pdfData.text.trim().length > 30) {

      console.log("Parsed using pdf-parse");

      return pdfData.text;
    }

    return await runOCR(filePath);

  } catch (error) {

    console.log("pdf-parse failed → using OCR");

    return await runOCR(filePath);
  }
};

module.exports = { extractTextFromPDF };
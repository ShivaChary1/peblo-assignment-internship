const express = require("express");
const router = express.Router();

const upload = require("../utils/upload");
const { ingestPDF } = require("../controllers/ingestController");

router.post("/ingest", upload.single("file"), ingestPDF);

module.exports = router;

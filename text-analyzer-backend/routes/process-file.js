const express = require("express");
const multer = require("multer");
let cors = require('cors');
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const { analyzeText } = require("./analyze-text"); // You need to implement this function

const app = express();
const port = 3333;

// Configure multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Endpoint for file upload
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const fileContent = req.file.buffer.toString("utf-8");
    
    // Call the text analyzer function to process the uploaded text
    const analysisResult = analyzeText(fileContent);

    res.json(analysisResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

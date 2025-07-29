const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const { verifyUser } = require('../middleware/auth');
const Upload = require('../models/Upload');
const router = express.Router();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/excel', verifyUser, upload.single('file'), async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const savedUpload = await Upload.create({
      user: req.user.id,
      fileName: req.file.originalname,
      data: sheetData,
    });

    res.json({ message: "File uploaded successfully", data: savedUpload.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;

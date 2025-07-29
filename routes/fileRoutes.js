const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadExcel } = require("../controllers/fileController");

const upload = multer({ dest: "uploads/" });
router.post("/upload", upload.single("file"), uploadExcel);

module.exports = router;
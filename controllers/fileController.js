const XLSX = require("xlsx");
const fs = require("fs");

exports.uploadExcel = (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    fs.unlinkSync(req.file.path); // Delete the file after reading

    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: "Error reading file", error: err });
  }
};
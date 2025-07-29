const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  xAxis: String,
  yAxis: String,
  chartType: String,
  data: Array,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Analysis", analysisSchema);

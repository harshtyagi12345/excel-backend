const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middleware/auth");
const Analysis = require("../models/analysis");

router.post("/save", verifyUser, async (req, res) => {
  const { xAxis, yAxis, chartType, data } = req.body;

  try {
    const saved = await Analysis.create({
      user: req.user.id,
      xAxis,
      yAxis,
      chartType,
      data,
    });

    res.json({ message: "Chart saved", saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save chart" });
  }
});

router.get("/user", verifyUser, async (req, res) => {
  try {
    const history = await Analysis.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch user analysis" });
  }
});

router.delete("/delete/:id", verifyUser, async (req, res) => {
  try {
    console.log('huighh');
    const result = await Analysis.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    res.json({ message: "Chart deleted", result });
  } catch (err) {
    console.error("Delete error", err);
    res.status(500).json({ error: "Failed to delete chart" });
  }
});


module.exports = router;


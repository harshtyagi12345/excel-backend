const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Analysis = require("../models/analysis");
const { verifyUser } = require("../middleware/auth");
const { verifyAdmin } = require("../middleware/admin");

// 🔐 Protect all routes with both verifyUser + verifyAdmin
router.use(verifyUser, verifyAdmin);

// Get all users
router.get("/users", async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

// Get all analyses
router.get("/analyses", async (req, res) => {
  const analyses = await Analysis.find().populate("user", "name email");
  res.json(analyses);
});

// Delete a user
router.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  await Analysis.deleteMany({ user: req.params.id });
  res.json({ message: "User and related data deleted" });
});

// Delete an analysis
router.delete("/analyses/:id", async (req, res) => {
  await Analysis.findByIdAndDelete(req.params.id);
  res.json({ message: "Analysis deleted" });
});

module.exports = router;

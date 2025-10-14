import User from "../models/User.js";
import Scheme from "../models/Scheme.js";
import Application from "../models/Application.js";

// Simulated AI Verification
export const submitDetails = async (req, res) => {
  const { aadhaar, pan, address } = req.body;
  const user = await User.findById(req.user._id);
  user.personalDetails = { aadhaar, pan, address };
  const incoming = req.files?.map(f => f.path) || [];
  // append new docs, avoid duplicates
  const existing = user.documents || [];
  const merged = [...existing];
  incoming.forEach(p => { if (!merged.includes(p)) merged.push(p); });
  user.documents = merged;
  // Simulate AI scoring (e.g., based on doc count + randomness)
  const base = 300;
  const docsFactor = Math.min(user.documents.length * 60, 300); // up to +300
  const randomFactor = Math.floor(Math.random() * 150); // 0-149
  const rawScore = base + docsFactor + randomFactor;
  const capped = Math.min(rawScore, 900);
  const aiResponse = { verified: capped >= 600, score: capped }; // simple threshold
  user.verified = aiResponse.verified;
  user.aiScore = aiResponse.score;
  await user.save();
  res.json({ message: "Submitted and scored by AI", user });
};

export const getSchemes = async (req, res) => {
  const schemes = await Scheme.find();
  res.json(schemes);
};

export const applyScheme = async (req, res) => {
  const { schemeId } = req.body;
  const hash = "HASH_" + req.user._id + Date.now();
  const app = await Application.create({
    userId: req.user._id,
    schemeId,
    blockchainHash: hash
  });
  res.json({ message: "Applied successfully", application: app });
};

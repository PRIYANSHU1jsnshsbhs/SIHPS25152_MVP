import User from "../models/User.js";
import Scheme from "../models/Scheme.js";
import Application from "../models/Application.js";

// Simulated AI Verification
export const submitDetails = async (req, res) => {
  const { aadhaar, pan, address } = req.body;
  const user = await User.findById(req.user._id);
  user.personalDetails = { aadhaar, pan, address };
  user.documents = req.files?.map(f => f.path) || [];
  const aiResponse = { verified: true }; // simulated
  user.verified = aiResponse.verified;
  await user.save();
  res.json({ message: "Submitted and verified by AI", user });
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

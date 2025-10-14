import User from "../models/User.js";
import Scheme from "../models/Scheme.js";

export const getPendingUsers = async (req, res) => {
  const users = await User.find({ verified: true, blockchainHash: { $exists: false } }, "name email role verified aiScore blockchainHash documents");
  res.json(users);
};

// New: list all users for admin, limited fields
export const listAllUsers = async (req, res) => {
  const users = await User.find({}, "name email role verified aiScore blockchainHash documents").sort({ createdAt: -1 });
  res.json(users);
};

export const approveUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.blockchainHash = "HASH_" + user._id + Date.now();
  await user.save();
  res.json({ message: "User approved", user });
};

export const rejectUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.verified = false;
  await user.save();
  res.json({ message: "User rejected" });
};

// Add some dummy schemes
export const addDummySchemes = async (req, res) => {
  const data = [
    { name: "Education Aid", description: "Scholarship for students", eligibility: "Students", organization: "EduHelp" },
    { name: "Health Support", description: "Medical assistance", eligibility: "Low income", organization: "HealthCare NGO" }
  ];
  await Scheme.insertMany(data);
  res.json({ message: "Schemes added" });
};

import Application from "../models/Application.js";
import User from "../models/User.js";

export const getApplications = async (req, res) => {
  const apps = await Application.find().populate("userId").populate("schemeId");
  res.json(apps);
};

export const verifyApplication = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const app = await Application.findById(id);
  app.status = status;
  await app.save();
  res.json({ message: `Application ${status}`, app });
};

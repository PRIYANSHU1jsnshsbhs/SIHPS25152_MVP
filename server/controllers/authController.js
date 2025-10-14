import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });
  res.json({ token: generateToken(user._id), user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: "Invalid credentials" });

  res.json({ token: generateToken(user._id), user });
};

export const me = async (req, res) => {
  // req.user is set by protect middleware
  const u = await User.findById(req.user.id).select('name email role verified aiScore blockchainHash documents');
  if (!u) return res.status(404).json({ message: 'User not found' });
  res.json(u);
};

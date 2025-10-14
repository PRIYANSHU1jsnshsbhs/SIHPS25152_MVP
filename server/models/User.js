import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "admin", "organization"], default: "user" },
  personalDetails: {
    aadhaar: String,
    pan: String,
    address: String,
  },
  documents: [String],
  verified: { type: Boolean, default: false },
  aiScore: { type: Number, min: 300, max: 900 },
  blockchainHash: String
}, { timestamps: true });

export default mongoose.model("User", userSchema);

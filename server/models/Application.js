import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  schemeId: { type: mongoose.Schema.Types.ObjectId, ref: "Scheme" },
  status: { type: String, enum: ["pending", "approved", "rejected", "funded"], default: "pending" },
  blockchainHash: String
});

export default mongoose.model("Application", applicationSchema);

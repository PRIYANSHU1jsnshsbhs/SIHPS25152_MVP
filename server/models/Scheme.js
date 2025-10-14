import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema({
  name: String,
  description: String,
  eligibility: String,
  organization: String
});

export default mongoose.model("Scheme", schemeSchema);

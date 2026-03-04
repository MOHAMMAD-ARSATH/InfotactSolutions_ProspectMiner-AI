import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: String,
  address: String,
  website: String,
  phone: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("leads", leadSchema);
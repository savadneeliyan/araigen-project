import mongoose from "mongoose";
const { Schema } = mongoose;

const VendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Vendors", VendorSchema);

import mongoose from "mongoose";
const { Schema } = mongoose;

const DriverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  license: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Drivers", DriverSchema);

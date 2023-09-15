import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  inventory: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Products", ProductSchema);
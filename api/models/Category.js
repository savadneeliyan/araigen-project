import mongoose from "mongoose";
const { Schema } = mongoose;

const CategorySchema = new mongoose.Schema({
  name: [{
    type: String,
    required: true,
  }]
});

export default mongoose.model("Category", CategorySchema);

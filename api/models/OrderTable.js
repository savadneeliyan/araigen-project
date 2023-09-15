import mongoose from "mongoose";

const OrderTableSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
  quantities: [
    {
      type: String,
    },
  ],
  price: [
    {
      type: String,
    },
  ],
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drivers",
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendors",
  },
  total: {
    type: Number,
  },
  collected: {
    type: Number,
  },
  status: {
    type: String,
  },
});

export default mongoose.model("OrderTable", OrderTableSchema);

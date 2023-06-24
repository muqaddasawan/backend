import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    products: {},
    payment: {},
    shipping: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "clients",
    },

    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processsing", "Shipped", "Deliverd", "Cancel"],
    },
  },
  { timestamps: true }
);

const ordersModel = mongoose.model("orders", ordersSchema);

export default ordersModel;

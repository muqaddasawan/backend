import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.ObjectId,
    ref: "clients",
  },
  comment: {
    type: String,
  },
  rating: {
    type: String,
  },
  order: {
    type: mongoose.ObjectId,
    ref: "orders",
  },
});

const feedbackModel = mongoose.model("feedback", feedbackSchema);

export default feedbackModel;

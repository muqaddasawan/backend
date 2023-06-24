import mongoose from "mongoose";

const subscribersSchema = new mongoose.Schema({
  email: {
    type: String,
  },
});

const subscribebrsModel = mongoose.model("subscribers", subscribersSchema);

export default subscribebrsModel;

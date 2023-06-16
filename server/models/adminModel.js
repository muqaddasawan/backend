import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  adminname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const adminsModel = mongoose.model("admins", adminSchema);

export default adminsModel;

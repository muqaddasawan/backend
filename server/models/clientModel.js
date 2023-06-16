import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  clientname: {
    type: String,
  },
  email: {
    type: String,
  },
  city: {
    type: String,
  },
  password: {
    type: String,
  },
});

const clientsModel = mongoose.model("clients", clientSchema);

export default clientsModel;

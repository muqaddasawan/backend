import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  message: {
    type: String,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const contactsModel = mongoose.model("contacts", contactSchema);

export default contactsModel;

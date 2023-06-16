import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  city: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
});

const productsModel = mongoose.model("products", productSchema);

export default productsModel;

import productsModel from "../models/productModel.js";

class productController {
  static getAllProducts = async (req, res) => {
    const fetchAllProducts = await productsModel.find();
    return res.status(200).json(fetchAllProducts);
    // return res.status(200).json({ message: "Connected" });
  };

  static getcityProducts = async (req, res) => {
    const city = req.params.city;
    try {
      const fetchAllProducts = await productsModel.find({
        city: { $in: [city] },
      });
      return res.status(200).json(fetchAllProducts);
      // return res.status(200).json({ message: "Connected" });
    } catch (err) {
      return res.status(400).json({ message: "City No Found" });
    }
  };

  static getSingleProducts = async (req, res) => {
    const id = req.params.id;
    try {
      // const fetchSingleProducts = await productsModel.findOne({ id: id });
      const fetchSingleProducts = await productsModel.findById(id);
      return res.status(200).json(fetchSingleProducts);
    } catch (err) {
      return res.status(400).json({ message: "Id No Found" });
    }
  };

  static createNewProduct = async (req, res) => {
    const { name, price, city } = req.body;
    console.log(name, price, city);

    try {
      if (name && price && city) {
        const isName = await productsModel.findOne({ name: name, city: city });
        if (!isName) {
          if (!req.file) {
            return res
              .status(400)
              .json({ message: "Thumbnail not found, Please upload" });
          } else {
            const newProduct = productsModel({
              name,
              price,
              city,
              thumbnail: req.file.path,
            });
            const response = await newProduct.save();
            if (response) {
              return res
                .status(200)
                .json({ message: "Product Created Successfully" });
            } else {
              return res
                .status(400)
                .json({ message: "Error while saving Product..!" });
            }
          }
        } else {
          return res
            .status(400)
            .json({ message: "This Product Already Exist" });
        }
      } else {
        return res.status(400).json({ message: "All Fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static updateProduct = async (req, res) => {
    const { name, price, city } = req.body;
    console.log("name=", name, "price=", price, "city=", city);
    try {
      if (name && price && city) {
        if (!req.file) {
          const newProduct = await productsModel.findByIdAndUpdate(
            req.params.id,
            { name, price, city },
            { new: true }
          );
          const response = await newProduct.save();
          if (response) {
            return res
              .status(200)
              .json({ message: "Product Updated Successfully" });
          }
        } else {
          const newProduct = await productsModel.findByIdAndUpdate(
            req.params.id,
            { name, price, city, thumbnail: req.file.path },
            { new: true }
          );
          const response = await newProduct.save();
          if (response) {
            return res
              .status(200)
              .json({ message: "Product Updated Successfully" });
          }
        }
      } else {
        return res.status(400).json({ message: "All Fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static deleteProduct = async (req, res) => {
    try {
      await productsModel.findByIdAndDelete(req.params.id);
      return res.status(200).send({
        successs: true,
        message: "Product Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        successs: false,
        message: "Error while deleting product",
        error,
      });
    }
  };
}

export default productController;

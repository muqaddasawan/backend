import express from "express";
import productController from "../controllers/productController.js";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/products`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/all-products", productController.getAllProducts);
router.get("/city-products/:city", productController.getcityProducts);
router.get("/single-product/:id", productController.getSingleProducts);
router.put(
  "/update-product/:id",
  upload.single("thumbnail"),
  productController.updateProduct
);
router.delete("/delete-product/:id", productController.deleteProduct);
router.post(
  "/add-product",
  upload.single("thumbnail"),
  productController.createNewProduct
);

export default router;

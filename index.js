import express from "express";
import connectDB from "./config/db.js";
import clientRoutes from "./routes/clientRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import productRoutes from "./routes/productRoute.js";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 9000;
connectDB();

app.use(cors());

app.use(express.json());

app.use("/public/products", express.static("public/products"));

app.get("/", (req, res) => {
  res.send("Backend is working...!");
});

//Routes
app.use("/api/auth", clientRoutes);
app.use("/api/auth", adminRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`API Running on : http://localhost:${PORT} `);
});

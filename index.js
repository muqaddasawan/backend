import express from "express";
import connectDB from "./config/db.js";
import clientRoutes from "./routes/clientRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import productRoutes from "./routes/productRoute.js";
import paymentOrderRoutes from "./routes/paymentOrderRoute.js";
import subscribebrsRoutes from "./routes/subscribersRoute.js";
import feedbackRoutes from "./routes/feedbackRoute.js";
import contactRoutes from "./routes/contactRoutes.js";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 8000;
connectDB();

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/public/products", express.static("public/products"));

app.get("/", (req, res) => {
  res.send("API working...!");
});

//Routes
app.use("/api/auth", clientRoutes);
app.use("/api/auth", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/braintree", paymentOrderRoutes);

app.use("/api/subscriber", subscribebrsRoutes);

app.use("/api/contact", contactRoutes);
app.use("/api/feedback", feedbackRoutes);

app.listen(PORT, () => {
  console.log(`API Running on : http://localhost:${PORT} `);
});

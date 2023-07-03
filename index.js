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

// app.use(
//   cors({
//     Origin: origin,
//     preflightContinue: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//     optionsSuccessStatus: 200,
//     header: "Content-Type, X-Auth-TokenExpiredError, Origin, Authorization",
//   })
// );

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", origin);
//   res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, X-Auth-TokenExpiredError, Origin, Authorization"
//   );
//   res.header("Access-Control-Allow-Credentials", true);

//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/public/products", express.static("public/products"));

app.get("/", (req, res) => {
  res.send("Api working...!");
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

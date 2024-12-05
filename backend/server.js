import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import productRoutes from "./routers/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 5000;

const app = express();
connectDB(); // connect to MongoDB

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use(errorHandler)
app.use(notFound)
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

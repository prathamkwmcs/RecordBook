import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "../db/server.js";
import auth from "../routes/auth.route.js";
import productRoute from "../routes/product.route.js";
import expenseRoute from "../routes/expense.route.js";
import { ensureAuth } from "../middlewares/auth.middleware.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

const PORT = process.env.PORT || 8082;

// app.get("/test", (req, res) => {
//   res.send("API is running....");
// });

app.use("/auth", auth);
app.use("/product", productRoute);
app.use("/expenses", ensureAuth, expenseRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Serverless deployment
export const handler = serverless(app);

import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import productRouter from "./routes/product.routes";
import purchaseRouter from "./routes/purchase.routes";
import saleRouter from "./routes/sale.route";
import cors from "cors";

const app = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use("/products", productRouter);
app.use("/purchase", purchaseRouter);
app.use('/sale',saleRouter)
app.use(errorHandler);

export default app;

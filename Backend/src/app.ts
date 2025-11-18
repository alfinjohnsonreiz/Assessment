import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import productRouter from "./routes/product.routes";
import purchaseRouter from "./routes/purchase.routes";
import saleRouter from "./routes/sale.route";
import cors from "cors";
import stockRouter from "./routes/stock.routes";
import billRouter from "./routes/bill.routes";

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
app.use('/stock',stockRouter)
app.use('/bill',billRouter)
app.use(errorHandler);

export default app;

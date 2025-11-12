import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import productRouter from "./routes/product.routes";
import purchaseRouter from "./routes/purchase.routes";

const app = express();
app.use(express.json());


app.use("/products", productRouter);
app.use("/purchase", purchaseRouter);

app.use(errorHandler);

export default app;

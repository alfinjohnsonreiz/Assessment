import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import productRouter from "./routes/product.routes";

const app = express();
app.use(express.json());


app.use("/products", productRouter);

app.use(errorHandler);

export default app;

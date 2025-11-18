import express from "express";
import { displayStocksHandler } from "../controller/stock.controller";

const stockRouter = express.Router();

stockRouter.get("/", displayStocksHandler);

export default stockRouter;

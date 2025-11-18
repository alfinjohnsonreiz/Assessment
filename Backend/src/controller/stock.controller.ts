import { NextFunction, Request, Response } from "express";
import { getAllStocks } from "../services/stock.service";

export const displayStocksHandler=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const stocks= await getAllStocks();
        res.status(201).json({
            message:"All stocks",
            data:stocks
        })
    } catch (error) {
        next(error)
    }
}
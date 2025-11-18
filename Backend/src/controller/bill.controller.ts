import { NextFunction, Request, Response } from "express";
import { displayBillService } from "../services/bill.service";

export const displayBillHandler=async(req: Request,res: Response,next: NextFunction)=>{
    try {
        const bills=await displayBillService()

        res.status(200).json({
            success:true,
            message:"Bills Listed",
            data:bills
        })
    } catch (error) {
        next(error)
    }
}
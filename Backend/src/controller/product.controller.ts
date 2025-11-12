import { NextFunction, Request, Response } from "express";

export const createProductHandler=async(req: Request,res: Response,next: NextFunction)=>{
    try {
        const{name,description,price,number,taxPercentage}=req.body;

        


    } catch (error) {
        next(error)
    }
}
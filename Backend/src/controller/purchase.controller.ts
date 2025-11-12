import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { getProductById } from "../services/product.service";
import { Purchase } from "../entities/Purchase";
import { AppDataSource } from "../config/data-source";
import { addPurchaseService, getAllPurchase } from "../services/purchase.service";
import { addPurchaseItemService } from "../services/purchaseItem.service";
import {  updateStockService } from "../services/stock.service";

const purchaseRepo = AppDataSource.getRepository(Purchase);

// req.body = {
//   totalAmount: number,
//   items: [
//     {
//       product_id: string,
//       quantity: number,
//     }
//   ]
// }

export const createPurchaseHandler=async(req: Request,res: Response,next: NextFunction)=>{
    try {
        const { items, totalAmount } = req.body;

        if(!items  ||items.length===0){
            return res.status(400).json({message:"No Purchase items provided"})
        }

        // create the purchase (parent)
        const purchase = await addPurchaseService(Number(totalAmount))
        if(!purchase){
            throw new ApiError("Error in creating Purchase",409)
        }

        for(const item of items){

            const product= await getProductById(item.product_id )
             if (!product) {
                throw new ApiError(`Product not found`,404);
            }
            await  addPurchaseItemService({product,
                purchase,
                quantity: item.quantity,
                purchasePrice: product.price * item.quantity ,
            })

            await updateStockService({product,quantity:item.quantity})

        }

        

        const fullPurchase= await getAllPurchase(purchase.purchase_id)

            return res.status(201).json({
            success:true,
            message:"Purchase Added Success",
            data:fullPurchase
        })

    } catch (error) {
        next(error)
    }
}

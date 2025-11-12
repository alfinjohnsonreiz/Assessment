import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { getProductById } from "../services/product.service";
import { Purchase } from "../entities/Purchase";
import { AppDataSource } from "../config/data-source";
import { addPurchaseService, getAllPurchase } from "../services/purchase.service";
import { addPurchaseItemService } from "../services/purchaseItem.service";

const purchaseRepo = AppDataSource.getRepository(Purchase);

// req.body = {
//   totalAmount: number,
//   items: [
//     {
//       product_id: string,
//       quantity: number,
//       purchasePrice: number
//     }
//   ]
// }

export const createPurchaseHandler=async(req: Request,res: Response,next: NextFunction)=>{
    try {
        const { items, totalAmount } = req.body;

        if(!items || !Array.isArray(items) ||items.length===0){
            return res.status(400).json({message:"No Purchase items provided"})
        }

        // Create the Purchase (parent)
        
        const purchase = await addPurchaseService(Number(totalAmount))
        if(!purchase){
            throw new ApiError("Error in creating Purchase",409)
        }



        // const purchaseItems=[];
        for(const item of items){

            const product= await getProductById(item.product_id )
             if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.product_id}` });
            }
            const purchaseItem=await  addPurchaseItemService({product,
                purchase,
                quantity: item.quantity,
                purchasePrice: product.price * item.quantity ,})

        }

        const fullPurchase= await getAllPurchase(purchase.purchase_id)

            return res.status(200).json({
            success:true,
            message:"Purchase Added Success",
            data:fullPurchase
        })

    } catch (error) {
        next(error)
    }
}

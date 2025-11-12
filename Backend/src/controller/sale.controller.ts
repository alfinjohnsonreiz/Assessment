import { NextFunction, Request, Response } from "express"
import { addSaleServie, getSaleById } from "../services/sale.service";
import { ApiError } from "../utils/ApiError";
import { getProductById } from "../services/product.service";
import { addSaleItemService } from "../services/saleItem.service";
import { updateStockService } from "../services/stock.service";

export const createSaleHandler=async(req: Request,res: Response,next: NextFunction)=>{
    try {
        const { items, totalAmount,discount } = req.body;

        if(!items  ||items.length===0){
            return res.status(400).json({message:"No Sale items provided"})
        }
        const sale= await addSaleServie(totalAmount,discount)

        if(!sale){
            throw new ApiError("Error in creating the sale",409)
        }

        for (const item of items){
            const product= await getProductById(item.product_id)
            if(!product){
                throw new ApiError("Product not found",404)
            }

            await addSaleItemService({
                product,
                sale,
                quantity:item.quantity,
                salePrice:product.price*item.quantity
            })

            await updateStockService({product,quantity:item.quantity})
        }

        const fullSale=await getSaleById(sale.sale_id);

        return res.status(201).json({
            success:true,
            message:"Sale Added Success",
            data:fullSale
        })

    } catch (error) {
        next(error)
    }
}
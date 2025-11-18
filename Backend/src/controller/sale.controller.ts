import e, { NextFunction, Request, Response } from "express"
import { addSaleService, displaySaleSerivce, fetchAllSalesService, getSaleById, updateSaleService } from "../services/sale.service";
import { ApiError } from "../utils/ApiError";
// import { getProductById } from "../services/product.service";
import { addSaleItemService } from "../services/saleItem.service";
import {  getStockByIdService, getStockByProductIdService, removeStockService} from "../services/stock.service";
import { addBillService } from "../services/bill.service";

export const addSaleHandler=async(req:Request,res:Response,next:NextFunction)=>{
    try {
         const{items,totalAmount,discount}=req.body;

        if(items.length===0){
            throw new ApiError("Items not found")
        }
        // checking stock quantity exists
        for(const item of items){
            const stock= await getStockByIdService(item.stock_id)
            if(!stock ){
                throw new ApiError("Error making Sale (stock  not found)",409)
            }
            if(stock.stockValue < item.quantity){
                throw new ApiError(`Out of Stock for Product ${stock.name}`,409)
            }
        }

        const sale= await addSaleService(Number(totalAmount));
        if(!sale){
            throw new ApiError("Error making Purchase",409)
        }
        
        let totalTax=0;

        for (const item of items){
            
            const stock= await getStockByIdService(item.stock_id)
            // const product=await getProductById(item.product_id)
            if(!stock ){
                throw new ApiError("Error making Sale (stock  not found)",409)
            }
            if(stock.stockValue < item.quantity){
                throw new ApiError(`Out of Stock for Product ${stock.name}`,409)
            }
            const salePrice=stock.price * Number(item.quantity);
            
            // tax calculation
            const tax= (salePrice * stock.taxPercentage) /100;
            totalTax+=tax;

            const saleItem=await addSaleItemService({sale,productName:stock.name,basePrice:stock.price,taxPercentage:stock.taxPercentage,taxPrice:tax,quantity:Number(item.quantity),salePrice:Number(salePrice)})
            console.log("The sale item",saleItem)
            if(!saleItem){
                throw new ApiError("Error in creating Purchase Item",409)
            }
            const updated=await removeStockService(stock,Number(item.quantity))
            if(!updated){
                throw new ApiError("Error in creating stock",409)
            }
        }

        

        // console.log("sale total amount",sale.totalAmount)
       
        const discountAmount= (sale.totalAmount * discount) /100
        
        const amountafterDiscount= sale.totalAmount -discountAmount

        const paidAmount= amountafterDiscount + totalTax; // after discount adding the tax of all
        

        const saleupdated=await updateSaleService(sale.sale_id,{paidAmount:paidAmount,tax:totalTax,discount:discountAmount})
        const bill = await addBillService(sale,sale.totalAmount,paidAmount,discountAmount,totalTax)
        // console.log(saleupdated)
        const fullPurchase= await displaySaleSerivce(sale.sale_id);
        res.status(201).json({
            message:"Sale created",
            success:true,
            data:bill
        })
    } catch (error) {
        next(error)
    }
}

export const displaySalesHandler=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const sales=await fetchAllSalesService()
        res.status(201).json({
            message:"Sales Fetched",
            success:true,
            data:sales
        })
    } catch (error) {
        next(error)
    }
}
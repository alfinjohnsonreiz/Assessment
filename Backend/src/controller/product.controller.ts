import { NextFunction, Request, Response } from "express";
import { addProductService, deleteProductService, getAllProductsService, getProductById, getProductByName, updateProductService } from "../services/product.service";
import { ApiError } from "../utils/ApiError";

export const createProductHandler=async(req: Request,res: Response,next: NextFunction)=>{
    try {
        const{name,description,price,taxPercentage}=req.body;

        const updatedName= (name) as string
        const exists=await getProductByName(updatedName.trim().toLowerCase())

        if(exists){
            throw new ApiError("Product name must be unique",409)
        }

        const product=await addProductService(updatedName.toUpperCase(),description,price,taxPercentage);

        return res.status(200).json({
            success:true,
            message:"Product Added Success",
            data:product
        })

    } catch (error) {
        next(error)
    }
}

export const deleteProductHandler=async(req: Request,res: Response,next: NextFunction)=>{
    try {
        console.log("hiiteed")
        const product_id = req.params.product_id;

        const product=await getProductById(product_id);
        if(!product){
            throw new ApiError("Product not existing",409)
        }
        
        const deleted=await deleteProductService(product.product_id);

        return res.status(200).json({
            success:true,
            message:"Product Deleted success",
            data:deleted
        })
    } catch (error) {
        next(error)
    }
}

export const updateProductHanlder=async(req: Request,res: Response,next: NextFunction)=>{
    try {
        const product_id = req.params.product_id;
        const {name,description,price,taxPercentage} = req.body;

        const existingProduct= await getProductById(product_id);
        if(!existingProduct){
            return res.status(404).json({
            success: false,
            message: "Product not found",
         });
        }
        const updatedName=(name) as string
        const productData={
            name:updatedName.toUpperCase(),
            description,
            price,
            taxPercentage
        }
        const update= await updateProductService(existingProduct.product_id,productData); 

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: update,
            });
    } catch (error) {
        next(error)
    }
}

export const getAllProductsHandler=async(req: Request,res: Response,next: NextFunction)=>{
    try {
        const products=await getAllProductsService();
        res.status(200).json({
            success: true,
            message: "Fetched All Products successfully",
            data:products,
            });
    } catch (error) {
        next(error)
    }
}

export const getProductHandler=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const product_id = req.params.product_id;

        const product= await getProductById(product_id);
        if(!product){
            throw new ApiError("Product Not Found",404)
        }
        res.status(200).json({
            success:true,
            message:"Product Fetched Success",
            data:product
        })
        
    } catch (error) {
        next(error)
    }
}
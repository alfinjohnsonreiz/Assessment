import express from 'express';
import { createProductHandler, deleteProductHandler, getAllProductsHandler, getProductHandler, updateProductHanlder } from '../controller/product.controller';

const productRouter=express.Router()

productRouter.post('/',createProductHandler)

productRouter.get('/',getAllProductsHandler)

productRouter.get('/:product_id',getProductHandler)

productRouter.put('/:product_id',updateProductHanlder)

productRouter.delete('/:product_id', deleteProductHandler)

export default productRouter;
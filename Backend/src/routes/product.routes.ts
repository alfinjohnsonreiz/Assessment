import express from 'express';
import { createProductHandler } from '../controller/product.controller';

const productRouter=express.Router()

productRouter.post('/',createProductHandler)

export default productRouter;
import express from 'express';
import { createPurchaseHandler } from '../controller/purchase.controller';
import { createSaleHandler } from '../controller/sale.controller';

const saleRouter=express.Router()


saleRouter.post('/',createSaleHandler)

export default saleRouter;
import express from 'express';
import { createPurchaseHandler, getAllPurchasesHandler } from '../controller/purchase.controller';

const purchaseRouter=express.Router()


purchaseRouter.post('/',createPurchaseHandler)
purchaseRouter.get('/',getAllPurchasesHandler)

export default purchaseRouter;
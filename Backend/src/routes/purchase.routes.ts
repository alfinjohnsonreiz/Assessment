import express from 'express';
import { createPurchaseHandler } from '../controller/purchase.controller';

const purchaseRouter=express.Router()


purchaseRouter.post('/',createPurchaseHandler)

export default purchaseRouter;
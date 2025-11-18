import express from 'express';
import { addSaleHandler, displaySalesHandler } from '../controller/sale.controller';

const saleRouter=express.Router()


saleRouter.post('/',addSaleHandler)

saleRouter.get('/',displaySalesHandler)
export default saleRouter;
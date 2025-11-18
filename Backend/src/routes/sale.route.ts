import express from 'express';
import { addSaleHandler } from '../controller/sale.controller';

const saleRouter=express.Router()


saleRouter.post('/',addSaleHandler)

export default saleRouter;
import express from 'express';
import { displayBillHandler } from '../controller/bill.controller';

const billRouter=express.Router()


billRouter.get('/',displayBillHandler)

export default billRouter;
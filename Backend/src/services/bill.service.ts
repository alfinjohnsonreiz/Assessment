import { AppDataSource } from "../config/data-source";
import { Bill } from "../entities/Bill";
import { Sale } from "../entities/Sale";


const billRepo = AppDataSource.getRepository(Bill);

export const addBillService = async (sale:Sale,actualAmount:number,
    paidAmount:number,discount:number,tax:number) => {
    const bill=billRepo.create({
        sale,
        actualAmount,
        paidAmount,
        discount,
        tax
    })
    const updateBill=await billRepo.save(bill);
    return await billRepo.find({where:{bill_id:updateBill.bill_id},
    relations:['sale','sale.saleItems']})
};

export const displayBillService=async()=>{
   return await billRepo.find({relations:['sale','sale.saleItems']})
}
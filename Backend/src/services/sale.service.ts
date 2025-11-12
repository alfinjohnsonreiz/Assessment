import { AppDataSource } from "../config/data-source";
import { Sale } from "../entities/Sale";

const saleRepo = AppDataSource.getRepository(Sale);

export const addSaleServie = async (totalAmount: number,discount:number) => {
  const sale =  saleRepo.create({
    totalAmount,discount
  });
  return  await saleRepo.save(sale);
};




export const getSaleById = async (sale_id: string) => {
  return await saleRepo.findOne({where:{sale_id},
relations:['saleItems','saleItems.product']});
};

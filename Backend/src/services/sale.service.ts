import { AppDataSource } from "../config/data-source";
import { Sale } from "../entities/Sale";

const saleRepo = AppDataSource.getRepository(Sale);

export const addSaleService = async (totalAmount: number) => {
  const sale =  saleRepo.create({
    totalAmount
  });
  return  await saleRepo.save(sale);
};

export const updateSaleService=async(sale_id:string,saleData:Partial<Sale>)=>{
 await saleRepo.update({sale_id},saleData)
 return await saleRepo.findOne({where:{sale_id},relations:['saleItems']})
}


export const getSaleById = async (sale_id: string) => {
  return await saleRepo.findOne({where:{sale_id},
relations:['saleItems','saleItems']});
};

export const displaySaleSerivce = async (sale_id: string) => {
  const sale = await saleRepo.find({ where: { sale_id } ,relations:['saleItems']});
  return sale;
};

export const fetchAllSalesService=async()=>{
  return await saleRepo.find({relations:['saleItems']})
}
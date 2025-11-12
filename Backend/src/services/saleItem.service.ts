import { AppDataSource } from "../config/data-source";
import { SaleItem } from "../entities/SaleItem";

const saleItemRepo=AppDataSource.getRepository(SaleItem);

export const addSaleItemService=async(saleItem:Partial<SaleItem>)=>{
    const item=saleItemRepo.create(saleItem);
    return saleItemRepo.save(item);
}
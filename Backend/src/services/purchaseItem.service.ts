import { AppDataSource } from "../config/data-source";
import { PurchaseItem } from "../entities/PurchaseItem";


const purchaseItemRepo= AppDataSource.getRepository(PurchaseItem)

export const addPurchaseItemService=async(purchaseItem:Partial<PurchaseItem>)=>{
    const item=purchaseItemRepo.create(purchaseItem);
    return purchaseItemRepo.save(item);
}
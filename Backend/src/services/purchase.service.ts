import { AppDataSource } from "../config/data-source";
import { Purchase } from "../entities/Purchase";

const purchaseRepo = AppDataSource.getRepository(Purchase);

export const addPurchaseService = async (totalAmount: number) => {
  const purchase = purchaseRepo.create({
    totalAmount,
  });
  return await purchaseRepo.save(purchase);
};


export const getAllPurchase=async(purchase_id:string)=>{
 return await purchaseRepo.findOne({where: { purchase_id },
      relations: ["purchaseItems", "purchaseItems.product"],
    });
}


export const getPurchaseById = async (purchase_id: string) => {
  return await purchaseRepo.findOneBy({ purchase_id });
};

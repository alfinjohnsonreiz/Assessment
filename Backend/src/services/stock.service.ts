import { AppDataSource } from "../config/data-source"
import { Stock } from "../entities/Stock"

const stockRepo= AppDataSource.getRepository(Stock);

export const updateStockService=async(stcokData:Partial<Stock>)=>{

    const stockExists= await getStockById(stcokData.product.product_id)
    if(stockExists){
        await stockRepo.update({stock_id:stockExists.stock_id},stcokData)
        return await stockRepo.findOneBy({stock_id:stockExists.stock_id})
    }
    const stock= stockRepo.create(stcokData)
    return await stockRepo.save(stock);
    
}


export const getStockById=async(stock_id:string)=>{
    return await stockRepo.findOneBy({stock_id})
}
import { exist } from "joi";
import { AppDataSource } from "../config/data-source";
import { Stock } from "../entities/Stock";
import { Product } from "../entities/Product";
import { ApiError } from "../utils/ApiError";

const stockRepo = AppDataSource.getRepository(Stock);

export const updateAddStockService = async (product: Product, qty: number) => {
  const stockExists = await getStockByProductIdService(product.product_id);
  if (stockExists) {
    const newValue = stockExists.stockValue + qty;
    await stockRepo.update(
      { stock_id: stockExists.stock_id },
      {
        product: product,
        stockValue: newValue,
        name: product.name,
        price: product.price,
        taxPercentage:product.taxPercentage
      }
    );
    return await stockRepo.findOneBy({ stock_id: stockExists.stock_id });
  }
  const stock = stockRepo.create({
    product: product,
    stockValue: qty,
    name: product.name,
    price: product.price,
    taxPercentage:product.taxPercentage
  });
  return await stockRepo.save(stock);
};

export const removeStockService = async (stock: Stock, qty: number) => {
  const exists = await getStockByIdService(stock.stock_id);
  if (!exists) {
    throw new ApiError("Stock not found");
  }
  const newValue = exists.stockValue - qty;
  await stockRepo.update(exists.stock_id, {
    stockValue: newValue,
  });
  return true;
};

export const getStockByProductIdService=async(product_id:string)=>{
  return await stockRepo.findOne({
    where:{product:{product_id}},relations:['product']
  })
}
export const getStockByIdService = async (stock_id: string) => {
  return await stockRepo.findOne({
    where: { stock_id },
    relations: ["product"],
  });
};
export const getAllStocks = async () => {
  return await stockRepo.find({ relations: ["product"],order:{name:'ASC'} });
};

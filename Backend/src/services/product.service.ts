import { AppDataSource } from "../config/data-source";
import { Product } from "../entities/Product";

const productRepo = AppDataSource.getRepository(Product);

export const getProductById = async (product_id: string) => {
  return await productRepo.findOne({ where: { product_id } });
};

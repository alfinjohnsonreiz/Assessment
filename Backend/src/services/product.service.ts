import { AppDataSource } from "../config/data-source";
import { Product } from "../entities/Product";

const productRepo = AppDataSource.getRepository(Product);

export const addProductService = async (
  name: string,
  description: string,
  price: number,
  taxPercentage: number
) => {
  const product = productRepo.create({
    name,
    description,
    price,
    taxPercentage,
  });
  return await productRepo.save(product);
};

export const updateProductService=async(product_id:string,data:Partial<Product>)=>{
    await productRepo.update({product_id},data);
    return await productRepo.findOneBy({product_id})
} 

export const deleteProductService=async(product_id:string)=>{
    return await productRepo.delete({product_id})
}


export const getProductById = async (product_id: string) => {
  return await productRepo.findOneBy({ product_id });
};

export const getProductByName = async (name: string) => {
  return await productRepo.findOneBy( { name } );
};

export const getAllProductsService=async()=>{
    return await productRepo.find();
}
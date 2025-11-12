import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { PurchaseItem } from "../entities/PurchaseItem";
import { Purchase } from "../entities/Purchase";
import { SaleItem } from "../entities/SaleItem";
import { Sale } from "../entities/Sale";
import { Stock } from "../entities/Stock";
import { Bill } from "../entities/Bill";
import { BillItem } from "../entities/BillItem";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User,Product,PurchaseItem,Purchase,Stock,SaleItem,Sale,Bill,BillItem],
});

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { Sale } from "./Sale";

@Entity()
export class SaleItem {
  @PrimaryGeneratedColumn("uuid")
  saleItem_id: string;

  @ManyToOne(() => Product, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(()=>Sale,(sale)=>sale.saleItems, { onDelete: "CASCADE" })
  @JoinColumn({ name: "sale_id" })
  sale: Sale;

  @Column({ type: "int", default: 1 })
  quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  salePrice: number;
}

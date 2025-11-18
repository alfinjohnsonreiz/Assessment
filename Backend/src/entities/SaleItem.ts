import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { Sale } from "./Sale";
import { Stock } from "./Stock";

@Entity()
export class SaleItem {
  @PrimaryGeneratedColumn("uuid")
  saleItem_id: string;

  @Column()
  productName: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  basePrice: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  taxPercentage: number;
  
  @Column({ type: "int", default: 1 })
  quantity: number;
  
  @Column({ type: "decimal", precision: 10, scale: 2 ,nullable:true})
  salePrice: number;

  @Column({type:'decimal', precision: 10, scale: 2,nullable:true})
  taxPrice:number

  @ManyToOne(() => Sale, (sale) => sale.saleItems, { onDelete: "CASCADE" })
  @JoinColumn({ name: "sale_id" })
  sale: Sale;
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";
import { Purchase } from "./Purchase";

@Entity()
export class PurchaseItem {
  @PrimaryGeneratedColumn("uuid")
  purchaseItem_id: string;

  @ManyToOne(() => Product, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;

  //each purchase item belong to one purchase
  @ManyToOne(() => Purchase, (purchase) => purchase.purchaseItems, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "purchase_id" })
  purchase: Purchase;

  @Column({ type: "int", default: 1 })
  quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  purchasePrice: number;
}

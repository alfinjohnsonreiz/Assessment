import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PurchaseItem } from "./PurchaseItem";

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn("uuid")
  purchase_id: string;

  @OneToMany(() => PurchaseItem, (item) => item.purchase, { cascade: true })
  purchaseItems: PurchaseItem[];


  @Column()
  totalAmount:number

  @CreateDateColumn()
  createdAt: Date;
}

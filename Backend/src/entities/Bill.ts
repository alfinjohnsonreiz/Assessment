import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sale } from "./Sale";

@Entity()
export class Bill {
  @PrimaryGeneratedColumn("uuid")
  bill_id: string;

  @OneToOne(() => Sale)
  @JoinColumn({ name: "sale_id" })
  sale: Sale;

  @Column("decimal")
  actualAmount: number;

  @Column("decimal",{nullable:true})
  paidAmount: number;

  @Column("decimal", { default: 0 })
  discount: number;


  @Column("decimal", { default: 0 })
  tax: number;
}

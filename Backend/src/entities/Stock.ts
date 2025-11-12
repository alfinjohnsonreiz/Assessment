import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Stock{
    @PrimaryGeneratedColumn('uuid')
    stock_id:string

    @OneToOne(()=>Product,(product)=>product.currentStock,{onDelete:"CASCADE"})
    @JoinColumn({name:'stock_id'})
    product:Product

    @Column({ type: "int", default: 0 })
    quantity:number

}
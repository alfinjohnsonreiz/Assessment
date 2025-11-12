import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SaleItem } from "./SaleItem";

@Entity()
export class Sale{
    @PrimaryGeneratedColumn('uuid')
    sale_id:string

    @OneToMany(()=>SaleItem,(item)=>item.sale ,{onDelete:'CASCADE'})
    saleItems:SaleItem[]

    @Column()
    totalAmount:number

    @Column()
    discount:number

    @CreateDateColumn()
    createdAt:Date;

}
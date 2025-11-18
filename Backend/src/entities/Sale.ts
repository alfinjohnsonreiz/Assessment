import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SaleItem } from "./SaleItem";

@Entity()
export class Sale{
    @PrimaryGeneratedColumn('uuid')
    sale_id:string

    @OneToMany(()=>SaleItem,(item)=>item.sale ,{onDelete:'CASCADE'})
    saleItems:SaleItem[]

    @Column("decimal",{nullable:true})
    totalAmount:number

    @Column("decimal",{nullable:true})
    paidAmount:number;
    
    @Column("decimal",{nullable:true})
    discount:number

    @Column("decimal",{nullable:true})
    tax:number


    @CreateDateColumn()
    createdAt:Date;

}
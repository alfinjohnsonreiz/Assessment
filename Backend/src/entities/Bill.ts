import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sale } from "./Sale";

@Entity()
export class Bill{
    @PrimaryGeneratedColumn('uuid')
    bill_id:string

    @OneToOne(()=>Sale)
    @JoinColumn({name:"sale_id"})
    sale_id:Sale

}
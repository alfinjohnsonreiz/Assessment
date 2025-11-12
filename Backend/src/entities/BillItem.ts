import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BillItem{

    @PrimaryGeneratedColumn('uuid')
    billItem_id:string


}
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Stock{
    @PrimaryGeneratedColumn('uuid')
    stock_id:string

    @OneToOne(()=>Product,(product)=>product.currentStock,{nullable:true,onDelete:"SET NULL"})
    @JoinColumn({name:'product_id'})
    product:Product

    @Column({nullable:true})
    product_id: string;

    @Column({ type: "int", default: 0 })
    stockValue:number

    @Column({nullable:true})
    name:string

    @Column({nullable:true})
    price:number

    @Column({nullable:true})
    taxPercentage:number

}

//  @OneToOne(() => Product, product => product.currentStock, { onDelete: 'CASCADE' })
//   @JoinColumn({ name: 'product_id' })  
//   product: Product;

//   @Column()
//   product_id: string; 
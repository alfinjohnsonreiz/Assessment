import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  product_id: string;

  @Column({})
  name: string;

  @Column("text")
  description: string;

  @Column("decimal")
  price: number;

  @Column("boolean", { default: true })
  currentStock: boolean;

  @Column("decimal")
  taxPercentage: number;

  @CreateDateColumn()
  createdAt: Date;

  //   @ManyToOne(() => Category, { onDelete: "CASCADE" })
  //   @JoinColumn({ name: "category_id" })
  //   category: Category;

  //   @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  //   cartItems: CartItem[];
}

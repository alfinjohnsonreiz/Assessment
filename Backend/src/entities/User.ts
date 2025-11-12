import { Column, CreateDateColumn, Entity,PrimaryGeneratedColumn } from "typeorm";

export enum UserRole{
  ADMIN='admin',
  USER='user'
}
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id!: string;

  @Column({type:"enum",enum:UserRole,default:UserRole.USER})
  role:UserRole

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({nullable:true})
  password:string

  @CreateDateColumn()
  createdAt:Date
  
  @Column()
  image: string;

}

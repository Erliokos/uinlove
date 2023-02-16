import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number

  @CreateDateColumn()
  @Field(() => String)
  created: Date

  @UpdateDateColumn()
  @Field(()=> String)
  updated: Date

  @Column()
  @Field(()=>String)
  login: string

  @Column()
  @Field(()=>String)
  password: string

  @Column()
  @Field(()=>String)
  email: string
}

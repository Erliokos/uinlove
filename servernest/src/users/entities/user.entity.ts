import { Field, ID, IntersectionType, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createAt: Date;

  @Field()
  @UpdateDateColumn()
  updateAt: Date;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  passwordHash: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  token: string;
}

@ObjectType()
export class JWToken {
  @Field()
  access_token: string;

  @Field()
  refresh_token: string;
}

@ObjectType()
export class UserAuth extends IntersectionType(JWToken, UserEntity) {}

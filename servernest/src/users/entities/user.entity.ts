import {
  Field,
  ID,
  IntersectionType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Language {
  English = 'English',
  Russian = 'Russian',
}

export enum ColorScheme {
  Dark = 'dark',
  Light = 'light',
}

registerEnumType(Language, { name: 'Language' });
registerEnumType(ColorScheme, { name: 'ColorScheme' });

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

  @Field(() => ColorScheme, { nullable: true })
  @Column({ nullable: true })
  colorScheme?: string;

  @Field(() => Language, { nullable: true })
  @Column({ nullable: true })
  language: Language;
}

@ObjectType()
export class JWToken {
  @Field()
  access_token: string;

  // @Field()
  // refresh_token: string;
}

@ObjectType()
export class UserAuth extends IntersectionType(JWToken, UserEntity) {}

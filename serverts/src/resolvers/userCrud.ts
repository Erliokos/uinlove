import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql'
import { User } from '../entities/User'

@InputType()
export class CreateUserInput {
  @Field()
  login: string;
  @Field()
  password: string;
  @Field()
  email: string;
}

@Resolver()
export class UserCrud {
  @Query(() => String)
  hello(): string {
    return "Hello world"
  }
  @Mutation(() => User)
  createUser(
    @Arg('input', () => CreateUserInput) input: CreateUserInput
  ): Promise<User> {
    return User.create({ ...input }).save()
  }
}

import { BadRequestException, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  Context,
  GraphQLExecutionContext,
} from '@nestjs/graphql';
import { JWToken, UserEntity } from 'src/users/entities/user.entity';
import { GqlJwtAuthGuard } from 'src/users/guard/jwt.guard';
import { AuthUserInput } from 'src/users/inputs/auth-users.input';
import { CreateUserInput } from 'src/users/inputs/create-users.input';
import { UpdateUserInput } from 'src/users/inputs/update-users.input';
import { UserService } from 'src/users/services/user/user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserEntity> {
    const oldUser = await this.userService.getOneUserByEmail(input.email);
    if (oldUser) {
      throw new BadRequestException('Такой пользователь уже зарегистирован');
    }
    return await this.userService.createUser(input);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => UserEntity)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<UserEntity> {
    return await this.userService.updateUser(input);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Number)
  async removeUser(@Args('id') id: number): Promise<number> {
    return await this.userService.removeUser(id);
  }

  @Query(() => UserEntity)
  async getOneUser(@Args('id') id: number): Promise<UserEntity> {
    return await this.userService.getOneUser(id);
  }

  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }
  @Query(() => JWToken)
  async auth(
    @Context() context: GraphQLExecutionContext,
    @Args('input') { password, email }: AuthUserInput,
  ) {
    const userEmail = await this.userService.validateUser(email, password);
    const token = await this.userService.login(userEmail);
    return token;
  }
}

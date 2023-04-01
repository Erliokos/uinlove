import { BadRequestException, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  Context,
  GraphQLExecutionContext,
} from '@nestjs/graphql';
import { UserAuth, UserEntity } from 'src/users/entities/user.entity';
import { AuthorizationGuard } from 'src/users/guard/jwt.guard';
import { AuthUserInput } from 'src/users/inputs/auth-users.input';
import { CreateUserInput } from 'src/users/inputs/create-users.input';
import { LanguageInput } from 'src/users/inputs/language-user.input';
import { ThemeInput } from 'src/users/inputs/theme-user.input';
import { UpdateUserInput } from 'src/users/inputs/update-users.input';
import { UserService } from 'src/users/services/user/user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserAuth)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserEntity> {
    const oldUser = await this.userService.getOneUserByEmail(input.email);
    if (oldUser) {
      throw new BadRequestException('Такой пользователь уже зарегистирован');
    }
    const user = await this.userService.createUser(input);
    const userEmail = await this.userService.validateUser(
      input.email,
      input.password,
    );
    const token = await this.userService.login(userEmail);

    return { ...user, ...token };
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => UserEntity)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<UserEntity> {
    return await this.userService.updateUser(input);
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Number)
  async removeUser(@Args('id') id: number): Promise<number> {
    return await this.userService.removeUser(id);
  }

  @Query(() => UserEntity)
  async getOneUser(@Args('id') id: number): Promise<UserEntity> {
    return await this.userService.getOneUser(id);
  }

  @UseGuards(AuthorizationGuard)
  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }
  @Query(() => UserAuth)
  async auth(
    @Context() context: GraphQLExecutionContext,
    @Args('input') { password, email }: AuthUserInput,
  ) {
    const user = await this.userService.getOneUserByEmail(email);
    const userEmail = await this.userService.validateUser(email, password);
    const token = await this.userService.login(userEmail);
    return { ...token, ...user };
  }

  @Query(() => Boolean)
  async changeLanguage(@Args('input') input: LanguageInput): Promise<boolean> {
    await this.userService.changeLanguge(input);
    return true;
  }

  @Query(() => Boolean)
  async changeTheme(@Args('input') input: ThemeInput): Promise<boolean> {
    await this.userService.changeTheme(input);
    return true;
  }
}

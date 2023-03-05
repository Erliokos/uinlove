import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUserInput } from 'src/users/inputs/create-users.input';
import { UpdateUserInput } from 'src/users/inputs/update-users.input';
import { Repository } from 'typeorm';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(input: CreateUserInput): Promise<UserEntity> {
    const salt = genSaltSync(10);
    const { password } = input;
    const passwordHash = hashSync(password, salt);
    return await this.userRepository.save({ ...input, passwordHash });
  }

  async getOneUser(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getOneUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async removeUser(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }

  async updateUser(input: UpdateUserInput): Promise<UserEntity> {
    await this.userRepository.update({ id: input.id }, { ...input });
    return this.getOneUser(input.id);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<UserEntity, 'email'>> {
    const user = await this.getOneUserByEmail(email);
    if (!user)
      throw new UnauthorizedException('Пользователь с таким Email не найден');
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) throw new UnauthorizedException('Неверный пароль');
    return { email: user.email };
  }
  async login(email: Pick<UserEntity, 'email'>) {
    const payload = { email };

    return {
      access_token: await this.jwtService.signAsync(payload, {}),
    };
  }
}

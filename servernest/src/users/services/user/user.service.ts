import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JWToken, UserEntity } from 'src/users/entities/user.entity';
import { CreateUserInput } from 'src/users/inputs/create-users.input';
import { UpdateUserInput } from 'src/users/inputs/update-users.input';
import { Repository } from 'typeorm';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

  async saveUserToken(id: number, refresh_token: string) {
    await this.userRepository.update(
      {
        id,
      },
      { token: refresh_token },
    );
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
  async login(email: Pick<UserEntity, 'email'>): Promise<JWToken> {
    const payload = { email };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '1h',
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '30d',
    });
    const user = await this.getOneUserByEmail(email.email);
    await this.saveUserToken(user.id, refresh_token);
    return {
      access_token,
      refresh_token,
    };
  }
}

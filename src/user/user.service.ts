import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';
import { UpdateUserPasswordDto } from './dtos/updateUserPassword.dto';
import { createHashedPassword, validatePassword } from '../utils/password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(
    createUser: CreateUserDto,
    userType?: number,
  ): Promise<UserEntity> {
    const user = await this.findUserByEmail(createUser.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadRequestException('Email already registered.');
    }

    const passwordHashed = await createHashedPassword(createUser.password);

    return this.userRepository.save({
      ...createUser,
      typeUser: userType ? userType : UserType.User,
      password: passwordHashed,
    });
  }

  async findAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`UserId: ${userId} not found.`);
    }

    return user;
  }

  async findUserByIdWithRelations(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`Email: ${email} not found.`);
    }

    return user;
  }

  async updateUserPassword(
    userId: number,
    updateUserPassword: UpdateUserPasswordDto,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);

    const isMath = await validatePassword(
      updateUserPassword.lastPassword,
      user.password,
    );

    if (!isMath) {
      throw new BadRequestException('Last password invalid');
    }

    const passwordHashed = await createHashedPassword(
      updateUserPassword.newPassword,
    );

    return this.userRepository.save({
      ...user,
      password: passwordHashed,
    });
  }
}

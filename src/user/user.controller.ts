import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdateUserPasswordDto } from './dtos/updateUserPassword.dto';
import { UserId } from '../decorators/userId.decorator';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/admin')
  @Roles(UserType.Root)
  async createAdmin(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser, UserType.Admin);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Get('/all')
  @Roles(UserType.Admin, UserType.Root)
  async findAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.findAllUser()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }

  @Get('/:userId')
  @Roles(UserType.Admin, UserType.Root)
  async findUserByIdWithRelations(
    @Param('userId') userId: number,
  ): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.findUserByIdWithRelations(userId),
    );
  }

  @Patch()
  @UsePipes(ValidationPipe)
  @Roles(UserType.Admin, UserType.Root, UserType.User)
  async updateUserPassword(
    @UserId() userId: number,
    @Body() updateUserPassword: UpdateUserPasswordDto,
  ): Promise<UserEntity> {
    return this.userService.updateUserPassword(userId, updateUserPassword);
  }

  @Get()
  @Roles(UserType.Admin, UserType.Root, UserType.User)
  async getInforUser(@UserId() userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.findUserByIdWithRelations(userId),
    );
  }
}

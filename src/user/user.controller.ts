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
import { UserId } from 'src/decorators/userId.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async findAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.findAllUser()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }

  @Get('/:userId')
  async findUserByIdWithRelations(
    @Param('userId') userId: number,
  ): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.findUserByIdWithRelations(userId),
    );
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updateUserPassword(
    @UserId() userId: number,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<UserEntity> {
    return this.userService.updateUserPassword(userId, updateUserPasswordDto);
  }
}

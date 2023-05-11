import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CartEntity } from './entities/cart.entity';
import { InsertCartDto } from './dtos/insertCart.dto';
import { CartService } from './cart.service';
import { UserId } from '../decorators/userId.decorator';
import { ReturnCartDto } from './dtos/returnCart.dto';
import { DeleteResult } from 'typeorm';

@Roles(UserType.User, UserType.Admin)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCart(
    @UserId() userId: number,
    @Body() insertCart: InsertCartDto,
  ): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.insertProductInCart(userId, insertCart),
    );
  }

  @Get()
  async findCartByUserId(@UserId() userId: number): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.findCartByUserId(userId, true),
    );
  }

  @Delete()
  async clearCart(@UserId() UserId: number): Promise<DeleteResult> {
    return this.cartService.clearCart(UserId);
  }
}

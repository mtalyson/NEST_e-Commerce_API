import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { InsertCartDto } from './dtos/insertCart.dto';
import { CartService } from './cart.service';
import { UserId } from '../decorators/userId.decorator';
import { ReturnCartDto } from './dtos/returnCart.dto';
import { DeleteResult } from 'typeorm';
import { UpdateCartDto } from './dtos/updateCart.dto';

@Roles(UserType.User, UserType.Admin, UserType.Root)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCart(
    @UserId() userId: number,
    @Body() insertCartDto: InsertCartDto,
  ): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.insertProductInCart(userId, insertCartDto),
    );
  }

  @Get()
  async findCartByUserId(@UserId() userId: number): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.findCartByUserId(userId, true),
    );
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updateProductInCart(
    @UserId() userId: number,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.updateProductInCart(userId, updateCartDto),
    );
  }

  @Delete('/product/:productId')
  async deleteProductInCart(
    @Param('productId') productId: number,
    @UserId() userId: number,
  ): Promise<DeleteResult> {
    return this.cartService.deleteProductInCart(productId, userId);
  }

  @Delete()
  async clearCart(@UserId() UserId: number): Promise<DeleteResult> {
    return this.cartService.clearCart(UserId);
  }
}

import { CreateOrderDTO } from './dtos/createOrder.dto';
import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/cart/:cartId')
  @UsePipes(ValidationPipe)
  async createOrder(
    @Body() createOrderDto: CreateOrderDTO,
    @Param('cartId') cartId: number,
  ) {
    return this.orderService.createOrder(createOrderDto, cartId);
  }
}

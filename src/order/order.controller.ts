import { CreateOrderDTO } from './dtos/createOrder.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UserId } from '../decorators/userId.decorator';
import { OrderEntity } from './entities/order.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnOrderDTO } from './dtos/returnOrder.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @Roles(UserType.Admin, UserType.User)
  async createOrder(
    @Body() createOrderDto: CreateOrderDTO,
    @UserId() userId: number,
  ): Promise<OrderEntity> {
    return this.orderService.createOrder(createOrderDto, userId);
  }

  @Get()
  @Roles(UserType.Admin, UserType.User)
  async findOrdersByUserId(@UserId() userId: number): Promise<OrderEntity[]> {
    return this.orderService.findOrdersByUserId(userId);
  }

  @Get('/all')
  @Roles(UserType.Admin)
  async findAllOrders(): Promise<ReturnOrderDTO[]> {
    return (await this.orderService.findAllOrders()).map(
      (order) => new ReturnOrderDTO(order),
    );
  }
}

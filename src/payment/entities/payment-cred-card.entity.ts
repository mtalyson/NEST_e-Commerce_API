import { CreateOrderDTO } from 'src/order/dtos/createOrder.dto';
import { PaymentEntity } from './payment.entity';

import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class PaymentCreditCardEntity extends PaymentEntity {
  @Column({ name: 'amount_payments', nullable: false })
  amountPayments: number;

  constructor(
    statusId: number,
    price: number,
    discount: number,
    finalPrice: number,
    createOrderDto: CreateOrderDTO,
  ) {
    super(statusId, price, discount, finalPrice);
    this.amountPayments = createOrderDto?.amountPayments || 0;
  }
}

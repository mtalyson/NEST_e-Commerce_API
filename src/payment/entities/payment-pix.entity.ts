import { CreateOrderDTO } from 'src/order/dtos/createOrder.dto';
import { PaymentEntity } from './payment.entity';

import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class PaymentPixEntity extends PaymentEntity {
  @Column({ name: 'code', nullable: false })
  code: string;

  @Column({ name: 'date_payment' })
  datePayment: Date;

  constructor(
    statusId: number,
    price: number,
    discount: number,
    finalPrice: number,
    createOrderDto: CreateOrderDTO,
  ) {
    super(statusId, price, discount, finalPrice);
    this.code = createOrderDto?.codePix || '';
    this.datePayment = new Date(createOrderDto?.datePayment || '');
  }
}

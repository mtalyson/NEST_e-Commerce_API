import { PaymentEntity } from './payment.entity';

import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class PaymentPixEntity extends PaymentEntity {
  @Column({ name: 'code', nullable: false })
  code: number;

  @Column({ name: 'date_payment' })
  datePayment: Date;
}

import { PaymentEntity } from './payment.entity';

import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class PaymentCreditCardEntity extends PaymentEntity {
  @Column({ name: 'amount_payments', nullable: false })
  amountPayments: number;
}

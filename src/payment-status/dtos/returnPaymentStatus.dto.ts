import { PaymentStatusEntity } from '../entitites/payment-status.entity';

export class ReturnPaymentStatusDTO {
  id: number;
  name: string;

  constructor(paymentStatus: PaymentStatusEntity) {
    this.id = paymentStatus.id;
    this.name = paymentStatus.name;
  }
}

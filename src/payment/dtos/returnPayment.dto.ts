import { ReturnPaymentStatusDTO } from '../../payment-status/dtos/returnPaymentStatus.dto';
import { PaymentEntity } from '../entities/payment.entity';

export class ReturnPaymentDTO {
  id: number;
  statusId: number;
  price: number;
  discount: number;
  finalPrice: number;
  type: string;
  paymentStatus?: ReturnPaymentStatusDTO;

  constructor(payment: PaymentEntity) {
    this.id = payment.id;
    this.statusId = payment.statusId;
    this.price = payment.price;
    this.discount = payment.discount;
    this.finalPrice = payment.finalPrice;
    this.type = payment.type;
    this.paymentStatus = payment.paymentStatus
      ? new ReturnPaymentStatusDTO(payment.paymentStatus)
      : undefined;
  }
}

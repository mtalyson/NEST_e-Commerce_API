import { PaymentType } from '../../payment-status/enums/payment-type.enum';
import { PaymentEntity } from '../entities/payment.entity';

export const paymentMock: PaymentEntity = {
  createdAt: new Date(),
  discount: 123,
  finalPrice: 123,
  id: 123,
  price: 123,
  statusId: PaymentType.Done,
  updatedAt: new Date(),
  type: '',
};

import { PaymentCreditCardEntity } from '../entities/payment-cred-card.entity';
import { paymentMock } from './payment.mock';

export const paymentCreditCardMock: PaymentCreditCardEntity = {
  ...paymentMock,
  amountPayments: 123,
};

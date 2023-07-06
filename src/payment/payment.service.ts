import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from 'src/order/dtos/createOrder.dto';
import { PaymentCreditCardEntity } from './entities/payment-cred-card.entity';
import { PaymentType } from 'src/payment-status/enums/payment-type.enum';
import { PaymentPixEntity } from './entities/payment-pix.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async createPayment(createOrderDto: CreateOrderDTO): Promise<PaymentEntity> {
    if (createOrderDto.amountPayments) {
      const paymentCreditCard = new PaymentCreditCardEntity(
        PaymentType.Done,
        0,
        0,
        0,
        createOrderDto,
      );

      return this.paymentRepository.save(paymentCreditCard);
    } else if (createOrderDto.codePix && createOrderDto.datePayment) {
      const paymentPix = new PaymentPixEntity(
        PaymentType.Done,
        0,
        0,
        0,
        createOrderDto,
      );

      return this.paymentRepository.save(paymentPix);
    }

    throw new BadRequestException(
      'Amount payments or code pix and date payment is required',
    );
  }
}

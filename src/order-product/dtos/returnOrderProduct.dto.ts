import { ReturnProductDTO } from '../../product/dtos/returnProduct.dto';
import { ReturnOrderDTO } from '../../order/dtos/returnOrder.dto';
import { OrderProductEntity } from '../entities/order-product.entity';

export class ReturnOrderProductDTO {
  id: number;
  orderId: number;
  productId: number;
  amount: number;
  price: number;
  order?: ReturnOrderDTO;
  product?: ReturnProductDTO;

  constructor(orderProduct: OrderProductEntity) {
    this.id = orderProduct.id;
    this.orderId = orderProduct.orderId;
    this.productId = orderProduct.productId;
    this.amount = orderProduct.amount;
    this.price = orderProduct.price;
    this.order = orderProduct.order
      ? new ReturnOrderDTO(orderProduct.order)
      : undefined;
    this.product = orderProduct.product
      ? new ReturnProductDTO(orderProduct.product)
      : undefined;
  }
}

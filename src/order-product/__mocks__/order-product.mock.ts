import { productMock } from '../../product/__mocks__/product.mock';
import { orderMock } from '../../order/__mocks__/order.mock';
import { OrderProductEntity } from '../entities/order-product.entity';

export const orderProductMock: OrderProductEntity = {
  id: 123,
  orderId: orderMock.id,
  productId: productMock.id,
  amount: 123,
  price: 123,
  createdAt: new Date(),
  updatedAt: new Date(),
};

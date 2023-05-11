import { cartMock } from '../../cart/__mocks__/cart.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { CartProductEntity } from '../entities/cart-product.entity';

export const cartProductMock: CartProductEntity = {
  id: 11,
  cartId: cartMock.id,
  productId: productMock.id,
  amount: 11,
  createdAt: new Date(),
  updatedAt: new Date(),
};

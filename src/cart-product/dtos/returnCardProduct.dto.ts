import { ReturnCartDto } from '../../cart/dtos/returnCart.dto';
import { ReturnProductDTO } from '../../product/dtos/returnProduct.dto';
import { CartProductEntity } from '../entities/cart-product.entity';

export class ReturnCartProductDto {
  id: number;
  cartId: number;
  productId: number;
  amount: number;
  product?: ReturnProductDTO;
  cart?: ReturnCartDto;

  constructor(cartProduct: CartProductEntity) {
    this.id = cartProduct.id;
    this.cartId = cartProduct.cartId;
    this.productId = cartProduct.productId;
    this.amount = cartProduct.amount;
    this.product = cartProduct.product
      ? new ReturnProductDTO(cartProduct.product)
      : undefined;
    this.cart = cartProduct.cart
      ? new ReturnCartDto(cartProduct.cart)
      : undefined;
  }
}

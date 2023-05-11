import { Test, TestingModule } from '@nestjs/testing';
import { CartProductService } from '../cart-product.service';
import { ProductService } from '../../product/product.service';
import { Repository } from 'typeorm';
import { CartProductEntity } from '../entities/cart-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../../product/__mocks__/product.mock';
import { returnDeleteMock } from '../../__mocks__/returnDelete.mock';
import { cartMock } from '../../cart/__mocks__/cart.mock';
import { insertCartMock } from '../../cart/__mocks__/insertCart.mock';
import { cartProductMock } from '../__mocks__/cartProduct.mock';
import { NotFoundException } from '@nestjs/common';
import { updateCartMock } from '../../cart/__mocks__/updateCart.mock';

describe('CartProductService', () => {
  let service: CartProductService;
  let productService: ProductService;
  let cartProductRepository: Repository<CartProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartProductService,
        {
          provide: ProductService,
          useValue: {
            findProductById: jest.fn().mockResolvedValue(productMock),
          },
        },
        {
          provide: getRepositoryToken(CartProductEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cartProductMock),
            save: jest.fn().mockResolvedValue(cartProductMock),
            delete: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
    }).compile();

    service = module.get<CartProductService>(CartProductService);
    productService = module.get<ProductService>(ProductService);
    cartProductRepository = module.get<Repository<CartProductEntity>>(
      getRepositoryToken(CartProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productService).toBeDefined();
    expect(cartProductRepository).toBeDefined();
  });

  it('should return cartProduct after verify if product exist', async () => {
    expect(
      await service.verifyProductInCart(productMock.id, cartMock.id),
    ).toEqual(cartProductMock);
  });

  it('should return error in verifyProductInCart if product not found', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return error in verifyProductInCart if exception', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockRejectedValue(new Error());

    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(Error);
  });

  it('should return cartProduct after create product', async () => {
    expect(
      await service.createProductInCart(insertCartMock, cartMock.id),
    ).toEqual(cartProductMock);
  });

  it('should return error in createProductInCart if exception', async () => {
    jest.spyOn(cartProductRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.createProductInCart(insertCartMock, cartMock.id),
    ).rejects.toThrowError(Error);
  });

  it('should return error in insertProductInCart if exception in findProductById', async () => {
    jest
      .spyOn(productService, 'findProductById')
      .mockRejectedValue(new NotFoundException());

    expect(
      service.insertProductInCart(insertCartMock, cartMock),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return a new cartProduct in insertProductInCart if cart not exist', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    expect(await service.insertProductInCart(insertCartMock, cartMock)).toEqual(
      cartProductMock,
    );
    expect(spy.mock.calls[0][0].amount).toEqual(insertCartMock.amount);
  });

  it('should return cartProduct after insert product in cart', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');

    expect(await service.insertProductInCart(insertCartMock, cartMock)).toEqual(
      cartProductMock,
    );
    expect(spy.mock.calls[0][0]).toEqual({
      ...cartProductMock,
      amount: cartProductMock.amount + insertCartMock.amount,
    });
  });

  it('should return error in updateProductInCart if exception in findProductById', async () => {
    jest
      .spyOn(productService, 'findProductById')
      .mockRejectedValue(new NotFoundException());

    expect(
      service.updateProductInCart(updateCartMock, cartMock),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return a new cartProduct in updateProductInCart if cart not exist', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.updateProductInCart(updateCartMock, cartMock),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return cartProduct after update product in cart', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');

    expect(await service.updateProductInCart(updateCartMock, cartMock)).toEqual(
      cartProductMock,
    );
    expect(spy.mock.calls[0][0].amount).toEqual(updateCartMock.amount);
  });

  it('should return result after delete product', async () => {
    expect(
      await service.deleteProductInCart(productMock.id, cartMock.id),
    ).toEqual(returnDeleteMock);
  });

  it('should return error in deleteProductInCart if exception', async () => {
    jest.spyOn(cartProductRepository, 'delete').mockRejectedValue(new Error());

    expect(
      service.deleteProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(Error);
  });
});

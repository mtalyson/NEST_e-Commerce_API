import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart.service';
import { Repository } from 'typeorm';
import { CartEntity } from '../entities/cart.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartProductService } from '../../cart-product/cart-product.service';
import { returnDeleteMock } from '../../__mocks__/returnDelete.mock';
import { cartMock } from '../__mocks__/cart.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { NotFoundException } from '@nestjs/common';
import { insertCartMock } from '../__mocks__/insertCart.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { updateCartMock } from '../__mocks__/updateCart.mock';

describe('CartService', () => {
  let service: CartService;
  let cartRepository: Repository<CartEntity>;
  let cartProductService: CartProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: CartProductService,
          useValue: {
            insertProductInCart: jest.fn().mockResolvedValue(undefined),
            deleteProductInCart: jest.fn().mockResolvedValue(returnDeleteMock),
            updateProductInCart: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: getRepositoryToken(CartEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(cartMock),
            findOne: jest.fn().mockResolvedValue(cartMock),
          },
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    cartProductService = module.get<CartProductService>(CartProductService);
    cartRepository = module.get<Repository<CartEntity>>(
      getRepositoryToken(CartEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cartProductService).toBeDefined();
    expect(cartRepository).toBeDefined();
  });

  it('should return delete result if delete cart', async () => {
    const spy = jest.spyOn(cartRepository, 'save');

    expect(await service.clearCart(userEntityMock.id)).toEqual(
      returnDeleteMock,
    );

    expect(spy.mock.calls[0][0]).toEqual({
      ...cartMock,
      active: false,
    });
  });

  it('should return error in findOne undefined', () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.clearCart(userEntityMock.id)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should return cart in success (not send relations)', async () => {
    const spy = jest.spyOn(cartRepository, 'findOne');

    expect(await service.findCartByUserId(userEntityMock.id)).toEqual(cartMock);
    expect(spy.mock.calls[0][0].relations).toEqual(undefined);
  });

  it('should return cart in success (send relations)', async () => {
    const spy = jest.spyOn(cartRepository, 'findOne');

    expect(await service.findCartByUserId(userEntityMock.id, true)).toEqual(
      cartMock,
    );

    expect(spy.mock.calls[0][0].relations).toEqual({
      cartProduct: {
        product: true,
      },
    });
  });

  it('should return error in not found cart', () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findCartByUserId(userEntityMock.id)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should return send info in save cart (createCart)', async () => {
    const spy = jest.spyOn(cartRepository, 'save');

    expect(await service.createCart(userEntityMock.id)).toEqual(cartMock);
    expect(spy.mock.calls[0][0]).toEqual({
      active: true,
      userId: userEntityMock.id,
    });
  });

  it('should return cart in insertProductInCart', async () => {
    const spy = jest.spyOn(cartRepository, 'save');
    const spyCartProductService = jest.spyOn(
      cartProductService,
      'insertProductInCart',
    );

    expect(
      await service.insertProductInCart(userEntityMock.id, insertCartMock),
    ).toEqual(cartMock);

    expect(spy.mock.calls.length).toEqual(0);
    expect(spyCartProductService.mock.calls.length).toEqual(1);
  });

  it('should return error when cart not found in insertProductInCart', async () => {
    const spy = jest.spyOn(cartRepository, 'save');
    const spyCartProductService = jest.spyOn(
      cartProductService,
      'insertProductInCart',
    );

    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      await service.insertProductInCart(userEntityMock.id, insertCartMock),
    ).toEqual(cartMock);

    expect(spy.mock.calls.length).toEqual(1);
    expect(spyCartProductService.mock.calls.length).toEqual(1);
  });

  it('should return delete result in deleteProductInCart', async () => {
    const spy = jest.spyOn(cartProductService, 'deleteProductInCart');

    expect(
      await service.deleteProductInCart(productMock.id, userEntityMock.id),
    ).toEqual(returnDeleteMock);

    expect(spy.mock.calls.length).toEqual(1);
  });

  it('should return error when cart not exist in deleteProductInCart', () => {
    const spy = jest.spyOn(cartProductService, 'deleteProductInCart');

    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.deleteProductInCart(productMock.id, userEntityMock.id),
    ).rejects.toThrowError(NotFoundException);

    expect(spy.mock.calls.length).toEqual(0);
  });

  it('should return cart in updateProductInCart', async () => {
    const spySave = jest.spyOn(cartRepository, 'save');
    const spyCartProductService = jest.spyOn(
      cartProductService,
      'updateProductInCart',
    );

    expect(
      await service.updateProductInCart(productMock.id, updateCartMock),
    ).toEqual(cartMock);

    expect(spySave.mock.calls.length).toEqual(0);
    expect(spyCartProductService.mock.calls.length).toEqual(1);
  });

  it('should return create cart in updateProductInCart', async () => {
    const spySave = jest.spyOn(cartRepository, 'save');

    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      await service.updateProductInCart(productMock.id, updateCartMock),
    ).toEqual(cartMock);

    expect(spySave.mock.calls.length).toEqual(1);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { In, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../__mocks__/product.mock';
import { createProductMock } from '../__mocks__/createProduct.mock';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/__mocks__/category.mock';
import { returnDeleteMock } from '../../__mocks__/returnDelete.mock';
import { updateProductMock } from '../__mocks__/updateProduct.mock';

describe('ProductService', () => {
  let service: ProductService;
  let categoryService: CategoryService;
  let productRepository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            findCategoryById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            findOne: jest.fn().mockResolvedValue(productMock),
            save: jest.fn().mockResolvedValue(productMock),
            delete: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should return all products in findAllProducts', async () => {
    expect(await service.findAllProducts()).toEqual([productMock]);
  });

  it('should return relations in find all products', async () => {
    const spy = jest.spyOn(productRepository, 'find');
    const products = await service.findAllProducts([], true);

    expect(products).toEqual([productMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      relations: {
        category: true,
      },
    });
  });

  it('should return relatiosn and array in find all products', async () => {
    const spy = jest.spyOn(productRepository, 'find');
    const products = await service.findAllProducts([1], true);

    expect(products).toEqual([productMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      where: {
        id: In([1]),
      },
      relations: {
        category: true,
      },
    });
  });

  it('should return error in findAllProducts if products empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);

    expect(service.findAllProducts()).rejects.toThrowError();
  });

  it('should return error in findAllProducts if exception', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());

    expect(service.findAllProducts()).rejects.toThrowError();
  });

  it('should return product in createProduct after save', async () => {
    expect(await service.createProduct(createProductMock)).toEqual(productMock);
  });

  it('should return error in createProduct if exception', async () => {
    jest
      .spyOn(categoryService, 'findCategoryById')
      .mockRejectedValue(new Error());

    expect(service.createProduct(createProductMock)).rejects.toThrowError();
  });

  it('should return product in find by id', async () => {
    const spy = jest.spyOn(productRepository, 'findOne');
    const product = await service.findProductById(productMock.id);

    expect(product).toEqual(productMock);
    expect(spy.mock.calls[0][0]).toEqual({
      where: {
        id: productMock.id,
      },
    });
  });

  it('should return error in findProductById if product not found', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findProductById(productMock.id)).rejects.toThrowError();
  });

  it('should return error in findProductById if exception', async () => {
    jest.spyOn(productRepository, 'findOne').mockRejectedValue(new Error());

    expect(service.findProductById(productMock.id)).rejects.toThrowError();
  });

  it('should delete a product in deleteProductById', async () => {
    expect(await service.deleteProductById(productMock.id)).toEqual(
      returnDeleteMock,
    );
  });

  it('should update a product in updateProduct', async () => {
    expect(
      await service.updateProduct(updateProductMock, productMock.id),
    ).toEqual(productMock);
  });

  it('should return error in updateProduct if exception', async () => {
    jest.spyOn(productRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.updateProduct(updateProductMock, productMock.id),
    ).rejects.toThrowError();
  });
});

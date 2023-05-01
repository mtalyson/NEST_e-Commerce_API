import { categoryMock } from '../../category/__mocks__/category.mock';
import { CreateProductDTO } from '../dtos/createProduct.dto';

export const createProductMock: CreateProductDTO = {
  categoryId: categoryMock.id,
  name: 'product-name',
  price: 11.11,
  image: 'product-image',
};

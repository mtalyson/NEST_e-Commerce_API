import { categoryMock } from '../../category/__mocks__/category.mock';
import { CreateProductDTO } from '../dtos/createProduct.dto';

export const updateProductMock: CreateProductDTO = {
  categoryId: categoryMock.id,
  name: 'product-name-update',
  price: 99.99,
  image: 'product-image-update',
};

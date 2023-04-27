import { cityMock } from '../../city/__mocks__/city.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { AddressEntity } from '../entities/address.entity';

export const addressMock: AddressEntity = {
  id: 1234,
  userId: userEntityMock.id,
  complement: 'complement-mock',
  numberAddress: 1234,
  cep: 'cep-mock',
  cityId: cityMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

import { stateMock } from '../../state/__mocks__/state.mock';
import { CityEntity } from '../entities/city.entity';

export const cityMock: CityEntity = {
  id: 1234,
  stateId: stateMock.id,
  name: 'city-mock',
  createdAt: new Date(),
  updatedAt: new Date(),
};

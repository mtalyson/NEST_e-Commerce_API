import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  id: 1233,
  name: 'name-mock',
  email: 'email.mock@email.com',
  password: 'password-mock',
  cpf: '312313',
  phone: '312312313',
  typeUser: UserType.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};

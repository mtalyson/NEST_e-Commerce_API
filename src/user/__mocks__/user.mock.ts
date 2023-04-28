import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  id: 1233,
  name: 'name-mock',
  email: 'emailmock@emali.com',
  password: '$2b$10$tZ4BK.hYBHwdIOv8cXT0du5b7VkkexBwh407gnLiLFARosa0GYUwe',
  cpf: '312313',
  phone: '312312313',
  typeUser: UserType.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};

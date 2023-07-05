import { Test, TestingModule } from '@nestjs/testing';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { createUserMock } from '../__mocks__/createUser.mock';
import { updateUserPasswordMock } from '../__mocks__/updateUserPassword.mock';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(userEntityMock),
            updateUserPassword: jest.fn().mockResolvedValue(userEntityMock),
            findAllUser: jest.fn().mockResolvedValue([userEntityMock]),
            findUserByIdWithRelations: jest
              .fn()
              .mockResolvedValue(userEntityMock),
          },
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user Entity in createUser', async () => {
    const user = await controller.createUser(createUserMock);

    expect(user).toEqual(userEntityMock);
  });

  it('should return ReturnUser in getAllUser', async () => {
    const users = await controller.findAllUser();

    expect(users).toEqual([
      {
        id: userEntityMock.id,
        name: userEntityMock.name,
        email: userEntityMock.email,
        phone: userEntityMock.phone,
        cpf: userEntityMock.cpf,
      },
    ]);
  });

  it('should return ReturnUser in findUserByIdWithRelations', async () => {
    const users = await controller.findUserByIdWithRelations(userEntityMock.id);

    expect(users).toEqual({
      id: userEntityMock.id,
      name: userEntityMock.name,
      email: userEntityMock.email,
      phone: userEntityMock.phone,
      cpf: userEntityMock.cpf,
    });
  });

  it('should return UserEntity in updatePasswordUser', async () => {
    const user = await controller.updateUserPassword(
      userEntityMock.id,
      updateUserPasswordMock,
    );

    expect(user).toEqual(userEntityMock);
  });
});

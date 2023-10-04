import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { userEntityMock } from '../__mocks__/user.mock';
import { Repository } from 'typeorm';
import { createUserMock } from '../__mocks__/createUser.mock';
import {
  updateUserPasswordInvalidMock,
  updateUserPasswordMock,
} from '../__mocks__/updateUserPassword.mock';
import { UserType } from '../enum/user-type.enum';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in findUserById', async () => {
    expect(await service.findUserById(userEntityMock.id)).toEqual(
      userEntityMock,
    );
  });

  it('should return error in findUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findUserById(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return error in findUserById (DB Error)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(service.findUserById(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return user in findUserByIdWithRelations', async () => {
    expect(await service.findUserByIdWithRelations(userEntityMock.id)).toEqual(
      userEntityMock,
    );
  });

  it('should return user in findUserByEmail', async () => {
    expect(await service.findUserByEmail(userEntityMock.email)).toEqual(
      userEntityMock,
    );
  });

  it('should return error in findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.findUserByEmail(userEntityMock.email),
    ).rejects.toThrowError();
  });

  it('should return error in findUserByEmail (DB Error)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(
      service.findUserByEmail(userEntityMock.email),
    ).rejects.toThrowError();
  });

  it('should return user if user not exist', async () => {
    const spy = jest.spyOn(userRepository, 'save');
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(await service.createUser(createUserMock)).toEqual(userEntityMock);
    expect(spy.mock.calls[0][0].typeUser).toEqual(UserType.User);
  });

  it('should return user if user not exist and user Admin', async () => {
    const spy = jest.spyOn(userRepository, 'save');
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    await service.createUser(createUserMock, UserType.Admin);

    expect(spy.mock.calls[0][0].typeUser).toEqual(UserType.Admin);
  });

  it('should return error if user already exist', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrowError();
  });

  it('should return user in updateUserPassword', async () => {
    expect(
      await service.updateUserPassword(
        userEntityMock.id,
        updateUserPasswordMock,
      ),
    ).toEqual(userEntityMock);
  });

  it('should return error in updateUserPassword if invalid password', async () => {
    expect(
      service.updateUserPassword(
        userEntityMock.id,
        updateUserPasswordInvalidMock,
      ),
    ).rejects.toThrowError();
  });

  it('should return error in updateUserPassword if user not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.updateUserPassword(userEntityMock.id, updateUserPasswordMock),
    ).rejects.toThrowError();
  });
});

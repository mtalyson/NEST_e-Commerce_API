import { UpdateUserPasswordDto } from '../dtos/updateUserPassword.dto';

export const updateUserPasswordMock: UpdateUserPasswordDto = {
  lastPassword: 'abc',
  newPassword: 'password-mock',
};

export const updateUserPasswordInvalidMock: UpdateUserPasswordDto = {
  lastPassword: 'invalid-password',
  newPassword: 'password-mock',
};

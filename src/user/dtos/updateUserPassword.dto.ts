import { IsString } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsString()
  lastPassword: string;

  @IsString()
  newPassword: string;
}

import { IsNumber } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';

export class LoginPayloadDto {
  @IsNumber()
  id: number;

  @IsNumber()
  typeUser: number;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.typeUser = user.typeUser;
  }
}

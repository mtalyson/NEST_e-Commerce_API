import { AddressEntity } from '../entities/adress.entity';

export class ReturnAdressDto {
  complement: string;
  numberAdress: number;
  cep: string;

  constructor(adress: AddressEntity) {
    this.complement = adress.complement;
    this.numberAdress = adress.numberAdress;
    this.cep = adress.cep;
  }
}

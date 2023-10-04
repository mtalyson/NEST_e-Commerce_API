import { ReturnExternalCepDTO } from './returnExternalCep.dto';

export class ReturnCepDTO {
  cep: string;
  publicPlace: string;
  complement: string;
  neighborhood: string;
  city: string;
  uf: string;
  ddd: string;
  cityId?: number;
  stateId?: number;

  constructor(
    returnCep: ReturnExternalCepDTO,
    cityId?: number,
    stateId?: number,
  ) {
    this.cep = returnCep.cep;
    this.publicPlace = returnCep.logradouro;
    this.complement = returnCep.complemento;
    this.neighborhood = returnCep.bairro;
    this.city = returnCep.localidade;
    this.uf = returnCep.uf;
    this.ddd = returnCep.ddd;
    this.cityId = cityId;
    this.stateId = stateId;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/adress.entity';
import { Repository } from 'typeorm';
import { CreateAdressDto } from './dtos/createAdress.dto';

@Injectable()
export class AdressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly adressRepository: Repository<AddressEntity>,
  ) {}

  async createAdress(
    createAdressDto: CreateAdressDto,
    userId: number,
  ): Promise<AddressEntity> {
    return this.adressRepository.save({
      ...createAdressDto,
      userId,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/adress.entity';
import { Repository } from 'typeorm';
import { CreateAdressDto } from './dtos/createAdress.dto';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AdressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly adressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAdress(
    createAdressDto: CreateAdressDto,
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.findUserById(userId);
    await this.cityService.findCityById(createAdressDto.cityId);

    return this.adressRepository.save({
      ...createAdressDto,
      userId,
    });
  }
}

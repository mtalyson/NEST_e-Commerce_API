import {
  Controller,
  Body,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAdressDto } from './dtos/createAdress.dto';
import { AdressService } from './adress.service';
import { AddressEntity } from './entities/adress.entity';

@Controller('adress')
export class AdressController {
  constructor(private readonly adressService: AdressService) {}

  @Post('/:userId')
  @UsePipes(ValidationPipe)
  async createAdress(
    @Body() createAdressDto: CreateAdressDto,
    @Param('userId') userId: number,
  ): Promise<AddressEntity> {
    return this.adressService.createAdress(createAdressDto, userId);
  }
}

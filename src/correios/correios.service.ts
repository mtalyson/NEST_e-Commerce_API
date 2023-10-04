import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { ReturnExternalCepDTO } from './dto/returnExternalCep.dto';
import { CityService } from 'src/city/city.service';

@Injectable()
export class CorreiosService {
  constructor(
    private readonly httpService: HttpService,
    private readonly cityService: CityService,
  ) {}

  async findAdressByCep(cep: string): Promise<ReturnExternalCepDTO> {
    const result = await this.httpService.axiosRef
      .get<ReturnExternalCepDTO>(
        process.env.URL_CEP_CORREIOS.replace('{CEP}', cep),
      )
      .catch((error: AxiosError) => {
        throw new BadRequestException(`${error.message}`);
      });

    if (result.data.erro) {
      throw new NotFoundException('CEP not found');
    }

    const city = await this.cityService.findCityByName(
      result.data.localidade,
      result.data.uf,
    );

    console.log(
      '🚀 ~ file: correios.service.ts:33 ~ CorreiosService ~ findAdressByCep ~ city:',
      city,
    );

    return result.data;
  }
}

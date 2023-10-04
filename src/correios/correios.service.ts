import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { ReturnExternalCepDTO } from './dto/returnExternalCep.dto';
import { CityService } from 'src/city/city.service';
import { ReturnCepDTO } from './dto/returnCep.dto';
import { CityEntity } from 'src/city/entities/city.entity';

@Injectable()
export class CorreiosService {
  constructor(
    private readonly httpService: HttpService,
    private readonly cityService: CityService,
  ) {}

  async findAdressByCep(cep: string): Promise<ReturnCepDTO> {
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

    const city: CityEntity | undefined = await this.cityService
      .findCityByName(result.data.localidade, result.data.uf)
      .catch(() => undefined);

    return new ReturnCepDTO(result.data, city?.id, city?.state?.id);
  }
}

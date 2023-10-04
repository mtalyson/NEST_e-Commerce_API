import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class CorreiosService {
  constructor(private readonly httpService: HttpService) {}

  async findAdressByCep(cep: string): Promise<AxiosResponse<any>> {
    const result = await this.httpService.axiosRef
      .get(process.env.URL_CEP_CORREIOS.replace('{CEP}', cep))
      .catch((error: AxiosError) => {
        throw new BadRequestException(`${error.message}`);
      });

    if (result.data.erro) {
      throw new NotFoundException('CEP não encontrado');
    }

    return result.data;
  }
}

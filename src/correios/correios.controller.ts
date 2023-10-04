import { Controller, Get, Param } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { ReturnExternalCepDTO } from './dto/returnExternalCep.dto';

@Controller('correios')
export class CorreiosController {
  constructor(private readonly correiosService: CorreiosService) {}

  @Get('/:cep')
  async findAll(@Param('cep') cep: string): Promise<ReturnExternalCepDTO> {
    return this.correiosService.findAdressByCep(cep);
  }
}

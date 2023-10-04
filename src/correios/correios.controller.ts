import { Controller, Get, Param } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { ReturnCepDTO } from './dto/returnCep.dto';

@Controller('correios')
export class CorreiosController {
  constructor(private readonly correiosService: CorreiosService) {}

  @Get('/:cep')
  async findAll(@Param('cep') cep: string): Promise<ReturnCepDTO> {
    return this.correiosService.findAdressByCep(cep);
  }
}

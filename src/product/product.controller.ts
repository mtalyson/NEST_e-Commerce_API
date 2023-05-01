import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProductDTO } from './dtos/returnProduct.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDTO } from './dtos/createProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Roles(UserType.Admin, UserType.User)
  async findAllProducts(): Promise<ReturnProductDTO[]> {
    return (await this.productService.findAllProducts()).map(
      (product) => new ReturnProductDTO(product),
    );
  }

  @Post()
  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  async createProduct(
    @Body() createProduct: CreateProductDTO,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProduct);
  }
}

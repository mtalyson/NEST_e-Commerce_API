import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProductDTO } from './dtos/returnProduct.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDTO } from './dtos/createProduct.dto';
import { DeleteResult } from 'typeorm';
import { UpdateProductDTO } from './dtos/updateProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(UserType.Admin, UserType.Root)
  @UsePipes(ValidationPipe)
  async createProduct(
    @Body() createProduct: CreateProductDTO,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProduct);
  }

  @Get()
  @Roles(UserType.Admin, UserType.Root, UserType.User)
  async findAllProducts(): Promise<ReturnProductDTO[]> {
    return (await this.productService.findAllProducts([], true)).map(
      (product) => new ReturnProductDTO(product),
    );
  }

  @Get('/:productId')
  @Roles(UserType.Admin, UserType.Root, UserType.User)
  async findProductById(
    @Param('productId') productId: number,
  ): Promise<ReturnProductDTO> {
    return new ReturnProductDTO(
      await this.productService.findProductById(productId, true),
    );
  }

  @Delete('/:productId')
  @Roles(UserType.Admin, UserType.Root)
  async deleteProductById(
    @Param('productId') productId: number,
  ): Promise<DeleteResult> {
    return this.productService.deleteProductById(productId);
  }

  @Put('/:productId')
  @Roles(UserType.Admin, UserType.Root)
  @UsePipes(ValidationPipe)
  async updateProduct(
    @Body() updateProduct: UpdateProductDTO,
    @Param('productId') productId: number,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(updateProduct, productId);
  }
}

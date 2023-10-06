import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReturnCategoryDTO } from './dtos/returnCategory.dto';
import { CategoryService } from './category.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategory } from './dtos/createCategory.dto';
import { DeleteResult } from 'typeorm';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Roles(UserType.Admin, UserType.Root, UserType.User)
  async findAllCategories(): Promise<ReturnCategoryDTO[]> {
    return this.categoryService.findAllCategories();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @Roles(UserType.Admin, UserType.Root)
  async createCategory(
    @Body() createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory);
  }

  @Delete('/:categoryId')
  @Roles(UserType.Admin, UserType.Root)
  async deleteCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<DeleteResult> {
    return this.categoryService.deleteCategory(categoryId);
  }
}

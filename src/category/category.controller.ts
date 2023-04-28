import { Controller, Get } from '@nestjs/common';
import { ReturnCategoryDTO } from './dtos/returnCategory.dto';
import { CategoryService } from './category.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<ReturnCategoryDTO[]> {
    return (await this.categoryService.findAllCategories()).map(
      (category) => new ReturnCategoryDTO(category),
    );
  }
}

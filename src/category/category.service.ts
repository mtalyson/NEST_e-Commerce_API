import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCategory } from './dtos/createCategory.dto';
import { ProductService } from '../product/product.service';
import { ReturnCategoryDTO } from './dtos/returnCategory.dto';
import { CountProduct } from '../product/dtos/countProduct.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,

    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  findAmoundCategoryInProducts(
    category: CategoryEntity,
    countList: CountProduct[],
  ): number {
    const count = countList.find(
      (itemCount) => itemCount.category_id === category.id,
    );

    if (count) {
      return count.total;
    }

    return 0;
  }

  async findAllCategories(): Promise<ReturnCategoryDTO[]> {
    const categories = await this.categoryRepository.find();
    const count = await this.productService.countProductsByCategoryId();

    if (!categories || categories.length === 0) {
      throw new NotFoundException('Categories empty');
    }

    return categories.map(
      (category) =>
        new ReturnCategoryDTO(
          category,
          this.findAmoundCategoryInProducts(category, count),
        ),
    );
  }

  async findCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        name,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category name ${name} not found.`);
    }

    return category;
  }

  async findCategoryById(
    id: number,
    isRelations?: boolean,
  ): Promise<CategoryEntity> {
    const relations = isRelations ? { products: true } : undefined;

    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
      relations,
    });

    if (!category) {
      throw new NotFoundException(`Category id: ${id} not found.`);
    }

    return category;
  }

  async createCategory(
    createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    const category = await this.findCategoryByName(createCategory.name).catch(
      () => undefined,
    );

    if (category) {
      throw new BadRequestException(
        `Category name '${createCategory.name}' already exists.`,
      );
    }

    return this.categoryRepository.save(createCategory);
  }

  async deleteCategory(categoryId: number): Promise<DeleteResult> {
    const category = await this.findCategoryById(categoryId, true);

    // if (category.products?.length > 0) {
    //   throw new BadRequestException('Category with relations.');
    // }

    return this.categoryRepository.delete({ id: categoryId });
  }
}

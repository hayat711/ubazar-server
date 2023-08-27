import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { categoryData } from "./dataCategories";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import { ProductService } from "../product/product.service";
import { v4 as uuidv4 } from 'uuid';
import { productData } from "../product/myNewData";
import { Product } from "../product/entities/product.entity";


@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    private readonly productService: ProductService,
  ) {
  }
  async create(createCategoryDto: CreateCategoryDto) {

  }

  public async findAll() {
    return await this.categoryRepository.find();

  }

  async seedCategories(): Promise<void> {
    await Promise.all(
      categoryData.map(async (category) => {
        const newCategory = this.categoryRepository.create({
          categoryId: category.id,
          name: category.name,
          createdAt: category.createdAt,
        });
        await this.categoryRepository.save(newCategory)
      })
    )
  }



  public async categoryProducts(cat_id: string) {
    const products = await this.productService.getProductByCategory(cat_id)
    return products;
  }

  public async getProductsByCategoryName(cat_name: string): Promise<Product[]> {
    const products = await this.productService.getProductsByCategoryName(cat_name);
    return products;
  }




  // async findOne(categoryId: string) {
  //   return await this.categoryRepository.findOne(categoryId, { relations: ['products'] });
  // }


  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  async insertCategory() {
    const data = categoryData.map(category => {
      const { id, name, createdAt } = category;
      return { id, name, createdAt };
    });

    await this.categoryRepository.insert(data);
    console.log('data inserted ')
  }
}

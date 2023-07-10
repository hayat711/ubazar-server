import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from "@nestjs/common";
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('/:name')
  async getProducts(@Req() req: Request, @Param('name') name: string) {
    return this.categoryService.getProductsByCategoryName(name);
  }


  @Post('insert')
  insertData () {
    return this.categoryService.insertCategory();

  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.categoryProducts(id);
  }

  @Post('seed')
  async seedCategory():Promise<string> {
    await this.categoryService.seedCategories();
    return 'Catagories seeded successfully';
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}

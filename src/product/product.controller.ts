import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from "@nestjs/common";
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { isUUID } from "class-validator";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }




  @Get(':id')
  findOne(@Param('id')  id: string) {
    return this.productService.findOne(id);
  }


  @Post('seed')
  async seedProducts(): Promise<string> {
     await this.productService.seedProducts();
    return 'Products seeded successfully';


  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  // @Post('insert')
  // insetProduct(){
  //   return this.productService.insertProduct();
  // }

  // @Get('populate')
  // populateCategory() {
  //   return this.productService.populateCategoryName()
  // }

//   get 12 prod from diff category
//   @Get('top')
  // getTopProducts() {
  //   console.log('12 is called');
  //   return this.productService.get12ProductsFromDifferentCategories();
  // }

}

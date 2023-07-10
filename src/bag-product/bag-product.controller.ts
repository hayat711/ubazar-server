import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BagProductService } from './bag-product.service';
import { CreateBagProductDto } from './dto/create-bag-product.dto';
import { UpdateBagProductDto } from './dto/update-bag-product.dto';

@Controller('bag-product')
export class BagProductController {
  constructor(private readonly bagProductService: BagProductService) {}

  // @Post()
  // create(@Body() createBagProductDto: CreateBagProductDto) {
  //   return this.bagProductService.create(createBagProductDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.bagProductService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bagProductService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBagProductDto: UpdateBagProductDto) {
  //   return this.bagProductService.update(+id, updateBagProductDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bagProductService.remove(+id);
  // }
}

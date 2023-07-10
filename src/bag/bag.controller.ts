import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common";
import { BagService } from './bag.service';
import { CreateBagDto } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { CurrentUser } from "../common/decorators";
import { User } from "../user/entities/user.entity";

@Controller('bag')
export class BagController {
  constructor(private readonly bagService: BagService) {}


  @Post()
  create(@Body() createBagDto: CreateBagDto,
         @CurrentUser('id') userId: string) {
    console.log('the /bag router called');
    console.log('cur user', userId);
    return this.bagService.create(userId, createBagDto);
  }

  // @Get()
  // findAll() {
  //   return this.bagService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bagService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBagDto: UpdateBagDto) {
  //   return this.bagService.update(+id, updateBagDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bagService.remove(+id);
  // }
}

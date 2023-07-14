import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common";
import { BagService } from './bag.service';
import { CreateBagDto } from './dto/create-bag.dto';
import { CurrentUser } from "../common/decorators";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";

@Controller('bag')
export class BagController {
  constructor(private readonly bagService: BagService) {}


@UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBagDto: CreateBagDto,
         @CurrentUser('id') userId: string) {

    return this.bagService.create(userId, createBagDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getBagItems(@CurrentUser('id') userId: string) {
    return this.bagService.getBagItems(userId);
  }


  @UseGuards(JwtAuthGuard)
  @Delete()
  resetBag(@CurrentUser('id') userId: string) : Promise<void>{
    return this.bagService.resetBagItems(userId);
  }
}

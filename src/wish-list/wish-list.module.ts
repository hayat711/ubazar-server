import { Module } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { WishListController } from './wish-list.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { WishList } from "./entities/wish-list.entity";

@Module({
  controllers: [WishListController],
  providers: [WishListService],
  imports: [TypeOrmModule.forFeature([WishList])],

})
export class WishListModule {}

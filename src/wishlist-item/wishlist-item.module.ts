import { Module } from '@nestjs/common';
import { WishlistItemService } from './wishlist-item.service';
import { WishlistItemController } from './wishlist-item.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { WishlistItem } from "./entities/wishlist-item.entity";

@Module({
  controllers: [WishlistItemController],
  providers: [WishlistItemService],
  imports: [TypeOrmModule.forFeature([WishlistItem])],

})
export class WishlistItemModule {}

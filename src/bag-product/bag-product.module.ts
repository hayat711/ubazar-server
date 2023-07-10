import { Module } from '@nestjs/common';
import { BagProductService } from './bag-product.service';
import { BagProductController } from './bag-product.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BagProduct } from "./entities/bag-product.entity";

@Module({
  controllers: [BagProductController],
  providers: [BagProductService],
  imports: [TypeOrmModule.forFeature([BagProduct])],

})
export class BagProductModule {}

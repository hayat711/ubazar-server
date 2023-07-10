import { forwardRef, Module } from "@nestjs/common";
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { ProductModule } from "../product/product.module";

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [TypeOrmModule.forFeature([Category]), forwardRef(() => ProductModule)],
  exports: [CategoryService]
})
export class CategoryModule {}
2
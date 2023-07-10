import { forwardRef, Module } from "@nestjs/common";
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { CategoryModule } from "../category/category.module";
import { Category } from "../category/entities/category.entity";

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [TypeOrmModule.forFeature([Product, Category]), forwardRef(() => CategoryModule)],
  exports: [ProductService]
})
export class ProductModule {}

import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { AuthModule } from "../auth/auth.module";
import { OrderItemModule } from "../order-item/order-item.module";
import { ProductModule } from "../product/product.module";

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([Order]), AuthModule, OrderItemModule, ProductModule],

})
export class OrderModule {}

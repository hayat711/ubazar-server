import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItem } from "./entities/order-item.entity";
import { Repository } from "typeorm";
import { Order } from "../order/entities/order.entity";

@Injectable()
export class OrderItemService {
  constructor( @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>,) {
  }

  // public async createOrderItem(createOrderItemDto: CreateOrderItemDto) : Promise<OrderItem> {
  //   try {
  //     const orderItem = this.orderItemRepository.create(createOrderItemDto);
  //     return await this.orderItemRepository.save(orderItem);
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   }
  // }

}

import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,

  ) {
  }
  public async createOrder(userId: string,createOrderDto: CreateOrderDto) {
      try {
        const order = await this.orderRepository.create({
          ...createOrderDto,
          user: { id: userId}
        });

        const newOrder = await this.orderRepository.save(order);
        return newOrder;
      } catch (e) {
        console.log(e.message);
      }
  }

  public async getOrders() {
    try{
      return await this.orderRepository.find();
    } catch (e) {
      console.log(e.message);
    }
  }

  public async getOrder(orderId: string) {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: orderId}
      });
      return order;
    } catch (e) {
      console.log(e.message);
    }
  }

  public async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.orderRepository.findOne({ where: { id}});
      if (!order) {
        console.log('there is no order by that id');
      }
      const updatedOrder = await this.orderRepository.update(id, updateOrderDto);
      if (updatedOrder.affected === 0) {
        console.log('failed to update1');
      }
      return updatedOrder;
    } catch (e) {
      console.log(e.message);
    }
  }

  public async cancelOrder(id: string) {
    try {
      const canceledOrder = await this.orderRepository.delete(id);
      return canceledOrder;
    } catch (e) {
      console.log('error cancelling order , ', e.message);
    }
  }
}

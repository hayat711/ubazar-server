import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { OrderItemService } from "../order-item/order-item.service";
import { OrderItem } from "../order-item/entities/order-item.entity";
import { ProductService } from "../product/product.service";
import { OrderStatus } from "../common/enums/orderStatus.enum";
import { PaymentStatus } from "../common/enums/payment.enum";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    private readonly orderItemService: OrderItemService,
    private readonly productService: ProductService,
  ) {
  }


  public async createOrder(userId: string,createOrderDto: CreateOrderDto) {
      try {
        const {products, paymentStatus, status, totalPrice, totalItems} = createOrderDto;
        const order = await this.orderRepository.create({
          user: { id: userId},
          orderItems: [],
          payments: [],
          totalItems,
          totalPrice,
          paymentStatus
        });

        const newOrder = await this.orderRepository.save(order);

       const orderItems: OrderItem[] = [];
       for (const productId of products) {
         const product = await this.productService.findOne(productId);
         console.log('----------------***--------------')

         if (product) {
           // @ts-ignore
           const orderItem = new OrderItem();
           orderItem.product = product;
           orderItem.quantity = 1;
           orderItem.status = OrderStatus.notProcessed;
           orderItem.payment = 'Credit card';
           orderItems.push(orderItem);
         }
       }

       // set the orderItems property of the order entity
        newOrder.orderItems = orderItems;
       // save the order to update the orderItems relationship
        const updatedOrder = await this.orderRepository.save(newOrder);
        return updatedOrder;


      } catch (e) {
        console.log(e.message);
        throw e;
      }
  }

  public async getOrders(userId: string) {
    try{

      return  await this.orderRepository.find({
        where: {
          user: {id: userId}
        },
        order: {
          createdAt: 'DESC'
        }
      });


    } catch (e) {
      console.log(e);
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

  public async updateOrder(id: string, updateOrderDto: any) {
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

  public async updatePaymentStatus(orderId: string, paymentStatus: PaymentStatus) {
    const order = await this.orderRepository.findOne({
      where: {
        id : orderId
      }
    });
    order.paymentStatus = paymentStatus;
    console.log('the order paymend updated ')
    await this.orderRepository.save(order);

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

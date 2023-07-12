import { AbstractEntity } from "../../common/entities/abstract.entitiy";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Order } from "../../order/entities/order.entity";
import { Product } from "../../product/entities/product.entity";
import { ShippingAddress } from "../../shipping-address/entities/shipping-address.entity";
import { OrderStatus } from "../../common/enums/orderStatus.enum";

@Entity()
export class OrderItem extends AbstractEntity<OrderItem>{
  constructor(partial: Partial<OrderItem>) {
    super(partial);
    Object.assign(this, partial);
  }
  @ManyToOne(() => Order, order => order.orderItems)
  order: Order;

  @ManyToOne(() => Product, product => product.orderItems, {
    eager: true
  })
  product: Product;

  @Column()
  quantity: number;



  @Column({
    name: 'order_status',
    nullable: false,
    default: OrderStatus.notProcessed,
    type: 'enum',
    enum: OrderStatus
  })
  status: OrderStatus;   //TODO create an enum for status

  @Column()
  payment: string   //TODO create enum for payment method

  @OneToOne(() => ShippingAddress, shippingAddress => shippingAddress.id)
  @JoinColumn({
    name: 'shipment_id'
  })
  shipment: string


}

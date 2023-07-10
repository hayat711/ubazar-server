import { AbstractEntity } from "../../common/entities/abstract.entitiy";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Order } from "../../order/entities/order.entity";
import { Product } from "../../product/entities/product.entity";
import { ShippingAddress } from "../../shipping-address/entities/shipping-address.entity";

@Entity()
export class OrderItem extends AbstractEntity<OrderItem>{

  @ManyToOne(() => Order, order => order.orderItems)
  order: Order;

  @ManyToOne(() => Product, product => product.orderItems)
  product: Product;

  @Column()
  quantity: number;

  @Column()
  totalPrice: number;

  @Column()
  totalItems: number;

  @Column()
  status: string;   //TODO create an enum for status

  @Column()
  payment: string   //TODO create enum for payment method

  @OneToOne(() => ShippingAddress, shippingAddress => shippingAddress.id)
  @JoinColumn({
    name: 'shipment_id'
  })
  shipment: string


}

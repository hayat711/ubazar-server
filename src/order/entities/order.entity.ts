import { AbstractEntity } from "../../common/entities/abstract.entitiy";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { OrderItem } from "../../order-item/entities/order-item.entity";
import { Payment } from "../../payment/entities/payment.entity";


@Entity()

export class Order extends AbstractEntity<Order>{

  @ManyToOne(() => User, user => user.orders, )
  user: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, {
    onDelete: 'CASCADE', cascade: true, eager: true
  })
  orderItems: OrderItem[];

  @OneToMany(() => Payment, payment => payment.order, {
    onDelete: 'CASCADE', cascade: true, eager: true
  })
  payments: Payment[]

}

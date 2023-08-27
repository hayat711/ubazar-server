import { AbstractEntity } from "../../common/entities/abstract.entitiy";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { OrderItem } from "../../order-item/entities/order-item.entity";
import { Payment } from "../../payment/entities/payment.entity";
import { PaymentStatus } from "../../common/enums/payment.enum";
import { OrderStatus } from "../../common/enums/orderStatus.enum";


@Entity()

export class Order extends AbstractEntity<Order>{
  @Column()
  totalPrice: number;

  @Column()
  totalItems: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.notProcessed,
    nullable: false
  })
  paymentStatus: PaymentStatus;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.notProcessed,
    nullable: false
  })
  status: OrderStatus

  @ManyToOne(() => User, user => user.orders, )
  user: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, {
    onDelete: 'CASCADE', cascade: true, eager: true
  })
  orderItems: OrderItem[];

  @OneToMany(() => Payment, payment => payment.order, {
    onDelete: 'CASCADE', cascade: true, eager: true
  })
  payments?: Payment[]

}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "../../common/entities/abstract.entitiy";
import { User } from "../../user/entities/user.entity";
import { Order } from "../../order/entities/order.entity";
import { PaymentStatus } from "../../common/enums/payment.enum";


@Entity()
export class Payment extends AbstractEntity<Payment>{

  @Column()
  paymentMethod: string;  //TODO add enums for it

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.notProcessed,
    nullable: false,
  })
  status: PaymentStatus;

  @ManyToOne(() => User, user => user.payments)
  user: User;

  @ManyToOne(() => Order, order => order.payments)
  order:Order;

  @Column({
    nullable: false
  })
  amount: number;

  @PrimaryGeneratedColumn('uuid')
  transactionId: string;

  @Column({ nullable: true})
  paymentGateWay: string;


}

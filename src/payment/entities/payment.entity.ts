import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "../../common/entities/abstract.entitiy";
import { User } from "../../user/entities/user.entity";
import { Order } from "../../order/entities/order.entity";


@Entity()
export class Payment extends AbstractEntity<Payment>{

  @Column()
  paymentMethod: string;  //TODO add enums for it

  @Column()
  status: string;  //TODO enum

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

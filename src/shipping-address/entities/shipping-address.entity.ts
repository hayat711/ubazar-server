import { AbstractEntity } from "../../common/entities/abstract.entitiy";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { OrderItem } from "../../order-item/entities/order-item.entity";


@Entity()

export class ShippingAddress extends AbstractEntity<ShippingAddress>{

  @Column({
    nullable: false
  })
  address: string;

  @Column({
    nullable: false
  })
  city: string;

  @Column({
    nullable: true
  })
  state: string;

  @Column({
    nullable: true
  })
  country: string;

  @Column({
    nullable: false
  })
  zip: string;

  @OneToOne(() => User, user => user.shippingAddress, {
  })
  user: User;

  @OneToOne(() => OrderItem, orderItem => orderItem.shipment)
  deliveryTo: OrderItem;

}

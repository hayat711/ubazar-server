import { AbstractEntity } from "../../common/entities/abstract.entitiy";
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Exclude } from "class-transformer";
import * as argon2 from 'argon2'
import { Role } from "../../common/enums/roles.enum";
import { Bag } from "../../bag/entities/bag.entity";
import { WishList } from "../../wish-list/entities/wish-list.entity";
import { ShippingAddress } from "../../shipping-address/entities/shipping-address.entity";
import { Order } from "../../order/entities/order.entity";
import { Payment } from "../../payment/entities/payment.entity";
import { Review } from "../../review/entities/review.entity";

@Entity()
export class User extends AbstractEntity<User>{

  @Column()
  public firstName : string;

  @Column()
  public lastName : string;


  @Column({
    nullable: false,
    unique:true,
    length: 200,
    name: 'email'
  })
  public email: string;


  @Exclude()
  @Column({
    length: 200,
    name: 'password',
    nullable: false
  })
  password: string;


  @Column({
    name: 'role',
    nullable: true,
    default: Role.USER,
    type: 'enum',
    enum: Role
  })
  role: Role;

  @Column()
  stripCustomerId: string;

  @Column({ default : false})
  public isEmailConfirmed: boolean;


  @OneToOne(() => Bag, bag => bag.user, {
    eager: true, cascade: true, onDelete: 'CASCADE'
  })
  @JoinColumn()
  bag: Bag


  @OneToOne(()=> WishList,  wishlist => wishlist.user, {
    eager: true, cascade: true, onDelete: 'CASCADE'
  })
  @JoinColumn()
  wishlist:WishList


  @OneToOne(() => ShippingAddress,shippingAddress => shippingAddress.user,
    {
      cascade: true, eager: true, onDelete: 'CASCADE'
    })
  @JoinColumn()
  shippingAddress:ShippingAddress;


  @OneToMany(() => Order, order => order.user, {
    cascade: true, onDelete: "CASCADE"
  })
  orders: Order[];

  @OneToMany(() => Payment, payment => payment.user, {
    cascade: true, onDelete: "CASCADE"
  })
  payments: Payment[];

  @OneToMany(() => Review, review => review.author, {
    cascade: true, onDelete: "CASCADE"
  })
  reviews: Review[];


  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password)
  }
}

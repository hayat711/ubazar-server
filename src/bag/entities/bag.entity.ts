import { AbstractEntity } from "../../common/entities/abstract.entitiy";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { User } from "../../user/entities/user.entity";
import { BagProduct } from "../../bag-product/entities/bag-product.entity";


@Entity()

export class Bag extends AbstractEntity<Bag>{

  @Column({
    default: 0, nullable: false
  })
  totalItems: number;

  @Column({
    default: 0, nullable: false
  })
  totalPrice: number;


  @OneToOne(() => User, user => user.bag)
  @JoinColumn()
  user: User;


  @OneToMany(() => BagProduct, bagProduct => bagProduct.bag, {
    cascade: true, onDelete: 'CASCADE', eager: true
  })
  bagProducts: BagProduct[];



}

import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../common/entities/abstract.entitiy";
import { Bag } from '../../bag/entities/bag.entity';
import { Product } from "../../product/entities/product.entity";


@Entity()

export class BagProduct extends AbstractEntity<BagProduct>{

  @ManyToOne(() => Bag, bag => bag.bagProducts)
  bag: Bag;

  @ManyToOne(() => Product, product => product.bagProducts)
  product: Product;

  @Column({
    default: 1
  })
  quantity: number;

  @Column({
    type: 'float', default: 0
  })
  discount: number;

  @Column({
    type: 'float', default: 0
  })
  coupon: number;


}

import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "../../common/entities/abstract.entitiy";
import { FitEnum } from "../../common/enums/fit.enum";
import { User } from "../../user/entities/user.entity";
import { Product } from "../../product/entities/product.entity";


@Entity()
export class Review extends AbstractEntity<Review>{

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  rate: number;

  @Column({ nullable: false})
  quality: number;

  @Column({
    type: "enum", default: FitEnum.FIT, enum: FitEnum, nullable: false
  })
  fit: FitEnum;

  @Column({
    nullable: true
  })
  imageUrl: string;


  @Column()
  author: string;



  @ManyToOne(()=> User, user => user.reviews)
  user: User;



  @ManyToOne(() => Product, product => product.reviews)
  product: Product;

}

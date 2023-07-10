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

  @Column({ nullable: true})
  quality?: number;

  @Column({
    type: "enum", default: FitEnum.FIT, enum: FitEnum, nullable: true
  })
  fit: FitEnum;

  @Column({
    nullable: true
  })
  selectedFile: string;


  @ManyToOne(()=> User, user => user.reviews)
  author: User;

  @ManyToOne(() => Product, product => product.reviews)
  product: Product;

}

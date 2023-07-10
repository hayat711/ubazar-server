
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Category } from "../../category/entities/category.entity";
import { BagProduct } from "../../bag-product/entities/bag-product.entity";
import { WishlistItem } from "../../wishlist-item/entities/wishlist-item.entity";
import { OrderItem } from "../../order-item/entities/order-item.entity";
import { flatten } from "@nestjs/common";
import { Review } from "../../review/entities/review.entity";


@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  categoryId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('float')
  price: number;

  @Column()
  link: string;

  @Column({ nullable: true })
  color: string;

  @Column({ default: 7 })
  quantity: number;

  @Column({
    nullable: true
  })
  rating: number;



  @Column()
  categoryName: string;

  @OneToMany(() => BagProduct, bagProduct => bagProduct.product)

  bagProducts: BagProduct[];

  @OneToMany(() => WishlistItem, wishlistItem => wishlistItem.product)

  wishlistItems: WishlistItem[];

  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItems: OrderItem[];

  @OneToMany(() => Review, review => review.product, {
    onDelete: 'CASCADE', cascade: true, eager: true
  })
  reviews: Review[]


  @ManyToOne(() => Category, category => category.products)
  category: Category;


}

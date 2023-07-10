import { AbstractEntity } from "../../common/entities/abstract.entitiy";
import { Column, Entity, ManyToOne } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { WishList } from "../../wish-list/entities/wish-list.entity";

@Entity()
export class WishlistItem extends AbstractEntity<any>{

  @Column()
  quantity: number;

  @ManyToOne(() => Product, product => product.wishlistItems)
  product: Product;

  @ManyToOne(() => WishList, wishlist => wishlist.wishlistItems)
  wishlist: WishList;

}

import { AbstractEntity } from "../../common/entities/abstract.entitiy";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { WishlistItem } from "../../wishlist-item/entities/wishlist-item.entity";

@Entity()
export class WishList extends AbstractEntity<WishList>{

  // @Column({ type: 'string'})
  // userId: string;

  @OneToOne(() => User, user => user.wishlist)
  user: User;


  @OneToMany(() => WishlistItem, wishlistItem => wishlistItem.wishlist)
  wishlistItems: WishlistItem[];


}

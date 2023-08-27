import { IsNumber, IsString } from "class-validator";
import { Product } from "../../product/entities/product.entity";
import { BagProduct } from "../../bag-product/entities/bag-product.entity";

export class CreateBagDto {

  @IsNumber()
  totalItems: number;


  @IsNumber()
  totalPrice: number;

  items: BagProduct[];

}

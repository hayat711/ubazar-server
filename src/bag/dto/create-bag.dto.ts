import { IsNumber, IsString } from "class-validator";
import { Product } from "../../product/entities/product.entity";

export class CreateBagDto {
  id: string;


  quantity: number;
  product: any;

}

import { OrderItem } from "../../order-item/entities/order-item.entity";
import { BagProduct } from "../../bag-product/entities/bag-product.entity";
import { IsNotEmpty, IsNumber } from "class-validator";
import { OrderStatus } from "../../common/enums/orderStatus.enum";
import { PaymentStatus } from "../../common/enums/payment.enum";


export class CreateOrderDto {
  products: string[];

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  @IsNumber()
  totalItems: number;


  status: OrderStatus;

  paymentStatus: PaymentStatus;



}

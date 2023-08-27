import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { OrderStatus } from "../../common/enums/orderStatus.enum";

export class CreateOrderItemDto {
  productId: string; // ID of the product associated with the order item
  quantity: number;
  totalPrice: number;
  totalItems: number;
  status: OrderStatus; // Assuming you have defined the OrderStatus enum
  payment: string; // Assuming you have defined the PaymentMethod enum
  shipment: string; // Assuming you have defined the Shipment entity and use its ID

}

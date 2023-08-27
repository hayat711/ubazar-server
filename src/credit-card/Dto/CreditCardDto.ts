import { IsNotEmpty, IsString } from "class-validator";

export default class AddCreditCardDto {
  @IsString()
  @IsNotEmpty()
  paymentMethodId : string;
}

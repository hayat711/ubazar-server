import { IsNotEmpty, IsString } from "class-validator";

export class CreateShippingAddressDto {
  @IsString()
  @IsNotEmpty()

  country: string;

  @IsString()
  @IsNotEmpty()
  address: string;


  @IsNotEmpty()
  @IsString()
  city: string;

  @IsString()
  state: string;



  @IsNotEmpty()
  zip: string;


}

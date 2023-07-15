import { FitEnum } from "../../common/enums/fit.enum";
import { IsNumber, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class CreateReviewDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  rate: number;


  quality: number;

  fit: FitEnum;

  selectedFile?:string;

  productId: string;

  @IsString()
  author: string

}


import { FitEnum } from "../../common/enums/fit.enum";
import { IsString } from "class-validator";

export class CreateReviewDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  rate: number;
  quality?: number;
  fit?: FitEnum;
  selectedFile?:string;
  productId: string;
  userId: string;
}


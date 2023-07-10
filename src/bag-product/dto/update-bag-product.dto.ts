import { PartialType } from '@nestjs/mapped-types';
import { CreateBagProductDto } from './create-bag-product.dto';

export class UpdateBagProductDto extends PartialType(CreateBagProductDto) {}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BagProductService } from './bag-product.service';

@Controller('bag-product')
export class BagProductController {
  constructor(private readonly bagProductService: BagProductService) {}

}

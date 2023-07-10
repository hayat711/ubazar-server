import { Injectable } from '@nestjs/common';
import { CreateBagProductDto } from './dto/create-bag-product.dto';
import { UpdateBagProductDto } from './dto/update-bag-product.dto';

@Injectable()
export class BagProductService {
  create(createBagProductDto: CreateBagProductDto) {
    return 'This action adds a new bagProduct';
  }

  findAll() {
    return `This action returns all bagProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bagProduct`;
  }

  update(id: number, updateBagProductDto: UpdateBagProductDto) {
    return `This action updates a #${id} bagProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} bagProduct`;
  }
}

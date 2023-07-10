import { Injectable } from '@nestjs/common';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { ShippingAddress } from "./entities/shipping-address.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";

@Injectable()
export class ShippingAddressService {
  constructor(
    @InjectRepository(ShippingAddress) private readonly shippingAddressRepository : Repository<ShippingAddress>,
    ) {
  }
  async create(createShippingAddressDto: CreateShippingAddressDto): Promise<ShippingAddress> {
    const shippingAddress = await this.shippingAddressRepository.create(createShippingAddressDto);
    await this.shippingAddressRepository.save(shippingAddress);
    console.log('here is shipping address which saved to db, ', shippingAddress);
    return shippingAddress;
  }

  findAll() {
    return `This action returns all shippingAddress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shippingAddress`;
  }

  update(id: number, updateShippingAddressDto: UpdateShippingAddressDto) {
    return `This action updates a #${id} shippingAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} shippingAddress`;
  }
}

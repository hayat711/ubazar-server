import { Injectable, UseGuards } from "@nestjs/common";
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
  async create(createShippingAddressDto: CreateShippingAddressDto, userId: string): Promise<ShippingAddress> {
    const shippingAddress = await this.shippingAddressRepository.create({
      user: { id: userId},
      ...createShippingAddressDto
    });

    await this.shippingAddressRepository.save(shippingAddress);
    console.log('here is shipping address which saved to db, ', shippingAddress);
    return shippingAddress;
  }

  public async findAll(userId: string) {
    return await this.shippingAddressRepository.findOne({
      where: {
        user: { id: userId}
      }
    });
  }


}

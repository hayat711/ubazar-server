import { Injectable, UseGuards } from "@nestjs/common";
import { CreateBagDto } from './dto/create-bag.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Bag } from "./entities/bag.entity";
import { Repository } from "typeorm";

@Injectable()
export class BagService {
  constructor(@InjectRepository(Bag) private readonly bagRepository: Repository<Bag>,
             ) {
  }


  public async create(userId: string, createBagDto: CreateBagDto) {

    const {items, totalItems, totalPrice} = createBagDto;
    const existingBag = await this.bagRepository.findOne({
      where: {
        user: {id: userId}
      }
    });
    if (existingBag) {
      existingBag.bagProducts = createBagDto.items;
      existingBag.totalPrice = totalPrice;
      existingBag.totalItems = totalItems;

      await this.bagRepository.save(existingBag);

    } else {
      const bag = await this.bagRepository.create({
        user: {id: userId},
        bagProducts: items,
        totalItems,
        totalPrice,
      });

      console.log('items successfully added to bag');
      await this.bagRepository.save(bag);
    }

  }


  public async getBagItems(userId: string) {
    return  await this.bagRepository.find({
      where: {
        user: { id : userId}
    },
      order: {
        createdAt: 'DESC'
      }
    });
  };

  public async resetBagItems(userId: string): Promise<void> {
    const bag = await this.bagRepository.findOne({
      where:{
        user: {id: userId}
      },
      relations: ['bagProducts'],
    });
    bag.bagProducts = [];
    bag.totalPrice = 0;
    bag.totalItems = 0;

    await this.bagRepository.save(bag);
  }

}

import { Injectable, UseGuards } from "@nestjs/common";
import { CreateBagDto } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Bag } from "./entities/bag.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { BagProduct } from "../bag-product/entities/bag-product.entity";

@Injectable()
export class BagService {
  constructor(@InjectRepository(Bag) private readonly bagRepository: Repository<Bag>,
              private readonly userService: UserService)
  {
  }


  public async create(userId: string, createBagDto: CreateBagDto) {
    console.log('item to add in bag', createBagDto, userId);
    const {product, quantity} = createBagDto;
    const user = await this.userService.getUserById(userId);
    console.log('the user to save bag for , ', user);

    //@ts-ignore
    const bag = new Bag();
    bag.user = user;
    bag.totalItems = quantity;
    bag.totalPrice = product.totalPrice;

    // create a new BagProduct entity
    //@ts-ignore
    const bagProduct = new BagProduct();
    bagProduct.bag = bag;
    bagProduct.quantity = quantity;
    bagProduct.product = product;

    bag.bagProducts = [bagProduct];

    await this.bagRepository.save(bag);

  }

  findAll() {
    return `This action returns all bag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bag`;
  }

  update(id: number, updateBagDto: UpdateBagDto) {
    return `This action updates a #${id} bag`;
  }

  remove(id: number) {
    return `This action removes a #${id} bag`;
  }
}

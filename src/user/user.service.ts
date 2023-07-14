import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { ShippingAddressService } from "../shipping-address/shipping-address.service";
import { CreateShippingAddressDto } from "../shipping-address/dto/create-shipping-address.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { StripeService } from "../stripe/stripe.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly shippingAddressService: ShippingAddressService,
    private readonly stripeService: StripeService,
  ) {
  }

  public async getUserByField(field:string, value: string | number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        [field] : value
      }
    });
    return user;
  }

  public async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id : userId
      }
    });

    return user;
  }

  public async getUserByEmail(email: string) : Promise<User>{
    return await this.userRepository.findOne({
      where: {
        email
      }
    });
  }


  public  async create(data: CreateUserDto) {
      const stripeCustomer = await this.stripeService.createCustomer(data.firstName, data.email);

      const user = await this.userRepository.create({
        ...data,
        stripCustomerId: stripeCustomer.id,
      });
      await this.userRepository.save(user);
      return user;

  }

  public async findAll() {
    const users=  await this.userRepository.find({
      take: 20
    });

    return users;
  }

  async markEmailAsConfirmed(email: string) {
    return this.userRepository.update({email}, {
      isEmailConfirmed: true
    });
  }
}

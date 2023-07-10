import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { ShippingAddressService } from "../shipping-address/shipping-address.service";
import { ShippingAddressModule } from "../shipping-address/shipping-address.module";
import { StripeModule } from "../stripe/stripe.module";
import { EmailModule } from "../email/email.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), ShippingAddressModule, StripeModule, EmailModule],
  exports: [UserService],

})
export class UserModule {}
